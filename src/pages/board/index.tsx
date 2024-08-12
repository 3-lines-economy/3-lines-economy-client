// index.tsx
import React, { useState, useEffect } from "react";
import * as S from "./index.style";
import { useRouter } from "next/router";
// import SideBar from "../../components/sidabar/sidebar";
// import CustomCalendar from "../../components/calendar/calendar";
import { useRecoilValue } from "recoil";
import { calendarValueState } from "../../atoms/calendarAtom";
// import { activeCategoryState } from "../../atoms/activeCategoryState";
// import { ReactComponent as RightButton } from "../../assets/pagenation/right.svg";
// import { ReactComponent as RightEndButton } from "../../assets/pagenation/right-end.svg";
// import { ReactComponent as LeftButton } from "../../assets/pagenation/left.svg";
// import { ReactComponent as LeftEndButton } from "../../assets/pagenation/left-end.svg";
// import { ReactComponent as RightBlackButton } from "../../assets/pagenation/right-black.svg";
// import { ReactComponent as RightEndBlackButton } from "../../assets/pagenation/right-end-black.svg";
// import { ReactComponent as LeftBlackButton } from "../../assets/pagenation/left-black.svg";
// import { ReactComponent as LeftEndBlackButton } from "../../assets/pagenation/left-end-black.svg";
// import SearchBar from "../../components/searchBar/searchBar";

interface Post {
  link: string;
  category: string;
  title: string;
  datetime: string;
}

const PostsPerPage = 8;
const PageGroupSize = 5;

function Board() {
  const [keyword, setKeyword] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const [isNullData, setIsNullData] = useState(false);
  const router = useRouter();
  const selectedDate = useRecoilValue(calendarValueState);
  //   const selectedCategory = useRecoilValue(activeCategoryState);

  const fetchData = async () => {
    const baseUrl = `${process.env.NEXT_PUBLIC_API}news`;
    const params: Record<string, string> = {
      path: "news",
      date: formatDate(selectedDate),
    };

    const url = new URL(baseUrl);
    Object.keys(params).forEach((key) =>
      url.searchParams.append(key, params[key])
    );

    try {
      const response = await fetch(url.toString(), {
        method: "GET",
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json();
      if (data.statusCode === 500) {
        setIsNullData(true);
        setPosts([]);
        return;
      }
      setPosts(data.body);
    } catch (error) {
      console.error("Error fetching data:", error);
      setIsNullData(true);
      setPosts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    setIsNullData(false);
    setCurrentPage(1);
    fetchData();
  }, [selectedDate]);

  //   useEffect(() => {
  //     setCurrentPage(1);
  //   }, [selectedCategory]);

  function formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}${month}${day}`;
  }

  const indexOfLastPost = currentPage * PostsPerPage;
  const indexOfFirstPost = indexOfLastPost - PostsPerPage;

  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);

  //   useEffect(() => {
  //     setFilteredPosts(
  //       posts
  //         .filter(
  //           (post) =>
  //             selectedCategory === "전체" ||
  //             selectedCategory.includes(post.category)
  //         )
  //         .filter((post) => post.title.includes(keyword))
  //     );
  //   }, [posts, selectedCategory, keyword]);

  const currentPosts = Array.isArray(filteredPosts)
    ? filteredPosts.slice(indexOfFirstPost, indexOfLastPost)
    : [];

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const handlePostClick = (post: Post) => {
    const linkParts = post.link.split("/");
    const id = linkParts[linkParts.length - 1];

    const storedPosts = JSON.parse(localStorage.getItem("posts") || "[]");
    storedPosts.push(post.link);
    localStorage.setItem("posts", JSON.stringify(storedPosts));

    // router.push(`/article/${id}?date=${formatDate(selectedDate)}`, {
    //   state: { post },
    // });
  };

  const onChangeField = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
  };

  const visitedPosts = JSON.parse(localStorage.getItem("posts") || "[]");

  const totalPages = Math.ceil(filteredPosts.length / PostsPerPage);
  const currentGroup = Math.ceil(currentPage / PageGroupSize);
  const startPage = (currentGroup - 1) * PageGroupSize + 1;
  const endPage = Math.min(currentGroup * PageGroupSize, totalPages);

  return (
    <S.MainContainer>
      <S.SideBarContainer>
        {/* <SideBar />
        <CustomCalendar isMobile={false} /> */}
      </S.SideBarContainer>
      <S.Content>
        {loading ? (
          <h1>Loading</h1>
        ) : isNullData ? (
          <h1>해당 날짜의 기사가 존재하지 않습니다.</h1>
        ) : (
          <S.MainBody>
            {/* <SearchBar onChangeField={onChangeField} /> */}
            <S.PostList>
              {currentPosts.map((post, index) => (
                <S.PostItem
                  key={index}
                  onClick={() => handlePostClick(post)}
                  isVisited={visitedPosts.includes(post.link)}>
                  <S.PostItemLeft>{post.category}</S.PostItemLeft>
                  <S.PostItemCenter>{post.title}</S.PostItemCenter>
                  <S.PostItemRight>{post.datetime}</S.PostItemRight>
                </S.PostItem>
              ))}
            </S.PostList>
            {/* <S.Pagination>
              <S.PageButton
                onClick={() => {
                  paginate(1);
                }}>
                {currentPage === 1 ? <LeftEndButton /> : <LeftEndBlackButton />}
              </S.PageButton>
              <S.PageButton
                onClick={() => {
                  if (currentPage > 1) paginate(currentPage - 1);
                }}>
                {currentPage === 1 ? <LeftButton /> : <LeftBlackButton />}
              </S.PageButton>
              {Array.from(
                { length: endPage - startPage + 1 },
                (_, i) => startPage + i
              ).map((pageNumber) => (
                <S.PageButton
                  key={pageNumber}
                  onClick={() => paginate(pageNumber)}
                  isCurrentPage={currentPage === pageNumber}>
                  {pageNumber}
                </S.PageButton>
              ))}
              <S.PageButton
                onClick={() => {
                  if (currentPage < totalPages) paginate(currentPage + 1);
                }}>
                {currentPage === totalPages ? (
                  <RightButton />
                ) : (
                  <RightBlackButton />
                )}
              </S.PageButton>
              <S.PageButton
                onClick={() => {
                  paginate(totalPages);
                }}>
                {currentPage === totalPages ? (
                  <RightEndButton />
                ) : (
                  <RightEndBlackButton />
                )}
              </S.PageButton>
            </S.Pagination> */}
          </S.MainBody>
        )}
      </S.Content>
    </S.MainContainer>
  );
}

export default Board;
