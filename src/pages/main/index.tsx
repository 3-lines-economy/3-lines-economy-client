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
import dynamic from "next/dynamic";

const PostsPerPage = 10;
const PageGroupSize = 5;

const Main: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedDate] = useRecoilState(calendarValueState);
  const setSelectedArticle = useSetRecoilState(selectedArticleState);
  const [isMounted, setIsMounted] = useState<boolean>(false);

  const router = useRouter();

  // 클라이언트 사이드에서만 계산되도록 수정
  const totalPages = isMounted ? Math.ceil(posts.length / PostsPerPage) : 0;
  const indexOfLastPost = isMounted ? currentPage * PostsPerPage : 0;
  const indexOfFirstPost = isMounted ? indexOfLastPost - PostsPerPage : 0;
  const currentPosts = isMounted ? posts.slice(indexOfFirstPost, indexOfLastPost) : [];

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const currentGroup = isMounted ? Math.ceil(currentPage / PageGroupSize) : 0;
  const startPage = isMounted ? (currentGroup - 1) * PageGroupSize + 1 : 0;
  const endPage = isMounted ? Math.min(currentGroup * PageGroupSize, totalPages) : 0;

  const handleArticleClick = (post: Post) => {
    setSelectedArticle(post);
    router.push(`/article/${post.link.split("/").pop()}`);
  };

  const fetchData = async () => {
    if (!selectedDate) return;

    setIsLoading(true);
    const formattedDate = selectedDate.toISOString().split("T")[0].replace(/-/g, "");
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
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted && selectedDate) {
      fetchData();
    }
  }, [selectedDate, isMounted]);

  // PostItem 날짜 포맷팅 함수
  const formatDate = (datetime: string) => {
    if (!datetime) return "";
    return datetime.split(" ")[0].replace(/-/g, ".");
  };

  return (
    <>
      <S.MainContainer>
        <S.SideBarContainer>
          <CustomCalendar />
          <SideBar />
        </S.SideBarContainer>
        <S.Content>
          <MainBanner />
          {!isMounted || isLoading ? (
            <S.LoadingMessage>Loading...</S.LoadingMessage>
          ) : (
            <S.MainBody>
              <S.PostList>
                {currentPosts.map((post, index) => (
                  <S.PostItem key={index} onClick={() => handleArticleClick(post)}>
                    <S.PostItemLeft>{post.category}</S.PostItemLeft>
                    <S.PostItemCenter>{post.title}</S.PostItemCenter>
                    <S.PostItemRight>{post.datetime ? formatDate(post.datetime) : ""}</S.PostItemRight>
                  </S.PostItem>
                ))}
              </S.PostList>
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
            </S.MainBody>
          )}
        </S.Content>
      </S.MainContainer>
      {isMounted && (
        <S.CardNewsContainer>
          <S.CardNewsHeader>
            <CardNewsText />
            <div style={{ height: "20px" }}></div>
            <S.CardNewsHeaderA href="https://www.instagram.com/3_lines_economy/" target="_blank">
              더보기 &gt;
            </S.CardNewsHeaderA>
          </S.CardNewsHeader>
          <S.CardNewsList>
            {posts.slice(0, 5).map((post, index) => (
              <S.Card key={index}>
                <h3>{post.title}</h3>
                <ul>
                  <li>What: {post.what || ""}</li>
                  <li>Why: {post.why || ""}</li>
                  <li>How: {post.how || ""}</li>
                </ul>
              </S.Card>
            ))}
          </S.CardNewsList>
        </S.CardNewsContainer>
      )}
    </>
  );
};

// SSR 비활성화
export default dynamic(() => Promise.resolve(Main), {
  ssr: false,
});
