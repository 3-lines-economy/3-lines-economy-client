import React, { useEffect, useState } from "react";
import * as S from "./index.style";
import { useRecoilState } from "recoil";
import { calendarValueState } from "../../atoms/calendarAtom";
import CustomCalendar from "@/components/CustomCalendar/CustomCalendar";
import { Post } from "@/types/post";
import CustomCalendarDropdown from "@/components/CustomCalendarDropdown/CustomCalendarDropdown";
import Menubar from "@/components/Menubar/Menubar";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";

const PostsPerPage = 10;
const PageGroupSize = 5;

const Scrap: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [posts, setPosts] = useState<Post[]>([]);
  const [selectedDate] = useRecoilState(calendarValueState);
  const [selectedCategory, setSelectedCategory] = useState("전체");
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const router = useRouter();

  // 필터링된 게시물
  const filteredPosts =
    isMounted && posts.length > 0 ? (selectedCategory === "전체" ? posts : posts.filter((post) => post.category === selectedCategory)) : [];

  // 페이지네이션 계산
  const totalPages = Math.ceil(filteredPosts.length / PostsPerPage);
  const indexOfLastPost = currentPage * PostsPerPage;
  const indexOfFirstPost = indexOfLastPost - PostsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);

  const currentGroup = Math.ceil(currentPage / PageGroupSize);
  const startPage = Math.max((currentGroup - 1) * PageGroupSize + 1, 1);
  const endPage = Math.min(currentGroup * PageGroupSize, totalPages);

  const handleArticleClick = (post: Post) => {
    // URL을 통해 필요한 데이터를 전달합니다
    router.push(`/article/${post.link.split("/").pop()}`);
  };

  const fetchData = async () => {
    if (!selectedDate) return;

    setIsLoading(true);
    const formattedDate = selectedDate.toISOString().split("T")[0].replace(/-/g, "");
    const baseUrl = `${process.env.NEXT_PUBLIC_API}scrap`;
    const url = `${baseUrl}?page=${currentPage}`;

    try {
      const response = await fetch(url, { method: "GET" });
      if (!response.ok) throw new Error(`Error: ${response.status}`);
      const data = await response.json();
      if (data.statusCode === 500) return;

      const articles = data.body.map((article: any) => ({
        link: article.link,
        category: article.category,
        title: article.title,
        datetime: article.datetime,
        content: article.content,
        what: article.what,
        why: article.why,
        how: article.how,
      }));
      setPosts(articles);
      console.log("스크랩된 기사:", articles); // 데이터 확인을 위한 로깅 추가
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted && selectedDate) {
      fetchData();
    }
  }, [selectedDate, isMounted]);

  // 선택된 카테고리에 따라 게시물 필터링
  useEffect(() => {
    if (!isMounted) return;

    setCurrentPage(1); // 필터링 시 첫 페이지로 이동
  }, [selectedCategory, isMounted]);

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  // PostItem 날짜 포맷팅 함수
  const formatDate = (datetime: string) => {
    if (!datetime) return "";
    return datetime.split(" ")[0].replace(/-/g, ".");
  };

  return (
    <S.Container>
      <S.Title>스크랩함</S.Title>
      <S.SubTitle>스크랩한 기사들만 모아놨어요.</S.SubTitle>
      <S.FilterContainer>
        <Menubar />
        <S.DateFilter>
          <CustomCalendarDropdown />
        </S.DateFilter>
      </S.FilterContainer>

      {isCalendarOpen && (
        <S.DateDropdown>
          <CustomCalendar />
        </S.DateDropdown>
      )}

      {isLoading ? (
        <S.LoadingMessage>Loading...</S.LoadingMessage>
      ) : (
        <>
          {currentPosts.length === 0 ? (
            <S.LoadingMessage>스크랩된 기사가 없습니다.</S.LoadingMessage>
          ) : (
            <S.PostList>
              {currentPosts.map((post, index) => (
                <S.PostItem key={index} onClick={() => handleArticleClick(post)}>
                  <S.PostItemLeft>{post.category}</S.PostItemLeft>
                  <S.PostItemCenter>{post.title}</S.PostItemCenter>
                  <S.PostItemRight>{post.datetime ? formatDate(post.datetime) : ""}</S.PostItemRight>
                </S.PostItem>
              ))}
            </S.PostList>
          )}

          {totalPages > 0 && (
            <S.Pagination>
              <S.PageButton onClick={() => paginate(1)} disabled={currentPage === 1} isCurrentPage={false}>
                {"<<"}
              </S.PageButton>
              <S.PageButton onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1} isCurrentPage={false}>
                {"<"}
              </S.PageButton>
              {Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i).map((pageNumber) => (
                <S.PageButton key={pageNumber} onClick={() => paginate(pageNumber)} isCurrentPage={currentPage === pageNumber}>
                  {pageNumber}
                </S.PageButton>
              ))}
              <S.PageButton onClick={() => paginate(currentPage + 1)} disabled={currentPage === totalPages} isCurrentPage={false}>
                {">"}
              </S.PageButton>
              <S.PageButton onClick={() => paginate(totalPages)} disabled={currentPage === totalPages} isCurrentPage={false}>
                {">>"}
              </S.PageButton>
            </S.Pagination>
          )}
        </>
      )}
    </S.Container>
  );
};

// SSR 비활성화
export default dynamic(() => Promise.resolve(Scrap), {
  ssr: false,
});
