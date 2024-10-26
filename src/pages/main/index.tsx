import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useRecoilState, useSetRecoilState } from "recoil";
import { calendarValueState } from "../../atoms/calendarAtom";
import MainBanner from "@public/main-banner.svg";
import CardNewsText from "@public/card_news_text.svg";
import * as S from "./index.style";
import SideBar from "@/components/Sidebar/Sidebar";
import { selectedArticleState } from "@/atoms/selectedArticleAtom";
import CustomCalendar from "@/components/CustomCalendar/CustomCalendar";
import { Post } from "@/types/post";

const PostsPerPage = 10;
const PageGroupSize = 5;

const Main: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedDate] = useRecoilState(calendarValueState);
  const setSelectedArticle = useSetRecoilState(selectedArticleState);

  const totalPages = Math.ceil(posts.length / PostsPerPage);

  const indexOfLastPost = currentPage * PostsPerPage;
  const indexOfFirstPost = indexOfLastPost - PostsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const currentGroup = Math.ceil(currentPage / PageGroupSize);
  const startPage = (currentGroup - 1) * PageGroupSize + 1;
  const endPage = Math.min(currentGroup * PageGroupSize, totalPages);

  const router = useRouter();

  const handleArticleClick = (post: Post) => {
    setSelectedArticle(post);
    router.push(`/article/${post.link.split("/").pop()}`);
  };

  const fetchData = async () => {
    if (!selectedDate) return;

    setIsLoading(true);
    const formattedDate = selectedDate
      .toISOString()
      .split("T")[0]
      .replace(/-/g, "");
    const baseUrl = `${process.env.NEXT_PUBLIC_API}news`;
    const url = `${baseUrl}?path=news&date=${formattedDate}`;

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
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [selectedDate]);

  return (
    <>
      <S.MainContainer>
        <S.SideBarContainer>
          <CustomCalendar />
          <SideBar />
        </S.SideBarContainer>
        <S.Content>
          <MainBanner />
          {isLoading ? (
            <S.LoadingMessage>Loading...</S.LoadingMessage>
          ) : (
            <S.MainBody>
              <S.PostList>
                {currentPosts.map((post, index) => (
                  <S.PostItem
                    key={index}
                    onClick={() => handleArticleClick(post)}>
                    <S.PostItemLeft>{post.category}</S.PostItemLeft>
                    <S.PostItemCenter>{post.title}</S.PostItemCenter>
                    <S.PostItemRight>
                      {post.datetime.split(" ")[0].replace(/-/g, ".")}
                    </S.PostItemRight>
                  </S.PostItem>
                ))}
              </S.PostList>
              <S.Pagination>
                <S.PageButton
                  onClick={() => paginate(1)}
                  disabled={currentPage === 1}
                  isCurrentPage={false}>
                  {"<<"}
                </S.PageButton>
                <S.PageButton
                  onClick={() => paginate(currentPage - 1)}
                  disabled={currentPage === 1}
                  isCurrentPage={false}>
                  {"<"}
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
                  onClick={() => paginate(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  isCurrentPage={false}>
                  {">"}
                </S.PageButton>
                <S.PageButton
                  onClick={() => paginate(totalPages)}
                  disabled={currentPage === totalPages}
                  isCurrentPage={false}>
                  {">>"}
                </S.PageButton>
              </S.Pagination>
            </S.MainBody>
          )}
        </S.Content>
      </S.MainContainer>
      <S.CardNewsContainer>
        <S.CardNewsHeader>
          <CardNewsText />
          <div style={{ height: "20px" }}></div>
          <S.CardNewsHeaderA
            href="https://www.instagram.com/3_lines_economy/"
            target="_blank">
            더보기 &gt;
          </S.CardNewsHeaderA>
        </S.CardNewsHeader>
        <S.CardNewsList>
          {posts.slice(0, 5).map((post, index) => (
            <S.Card key={index}>
              <h3>{post.title}</h3>
              <ul>
                <li>What: {post.what}</li>
                <li>Why: {post.why}</li>
                <li>How: {post.how}</li>
              </ul>
            </S.Card>
          ))}
        </S.CardNewsList>
      </S.CardNewsContainer>
    </>
  );
};

export default Main;
