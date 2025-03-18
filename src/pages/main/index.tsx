"use client";

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
import { CategoryMap, CategoryType } from "../../types/category";

const Main: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [posts, setPosts] = useState<Post[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [totalElements, setTotalElements] = useState(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedDate] = useRecoilState(calendarValueState);
  const setSelectedArticle = useSetRecoilState(selectedArticleState);
  const [mounted, setMounted] = useState(false);

  // 클라이언트 사이드 렌더링 체크
  useEffect(() => {
    setMounted(true);
  }, []);

  const PageGroupSize = 5;
  const currentGroup = Math.ceil(currentPage / PageGroupSize);
  const startPage = (currentGroup - 1) * PageGroupSize + 1;
  const endPage = Math.min(currentGroup * PageGroupSize, totalPages);

  const router = useRouter();

  const handleArticleClick = (post: Post) => {
    setSelectedArticle(post);
    router.push(`/article/${post.link.split("/").pop()}`);
  };

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const fetchData = async () => {
    if (!selectedDate) return;

    setIsLoading(true);
    const formattedDate = selectedDate.toISOString().split("T")[0].replace(/-/g, "");
    const baseUrl = `${process.env.NEXT_PUBLIC_API}news`;
    const url = `${baseUrl}?path=news&date=${formattedDate}&page=${currentPage}`;

    try {
      const response = await fetch(url, { method: "GET" });
      if (!response.ok) throw new Error(`Error: ${response.status}`);
      const data = await response.json();
      if (data.status !== 200) return;

      const articles = data.body.newsList.map((article: any) => ({
        id: article.id,
        link: article.link,
        category: article.category,
        title: article.title,
        publishedAt: article.publishedAt,
        what: article.what,
        why: article.why,
        how: article.how,
      }));

      setPosts(articles);
      setTotalPages(data.body.totalPages);
      setTotalElements(data.body.totalElements);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (mounted && selectedDate) {
      fetchData();
    }
  }, [selectedDate, mounted, currentPage]);

  // 하이드레이션 전에는 아무것도 렌더링하지 않음
  if (!mounted) {
    return null;
  }

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
                {posts.map((post, index) => (
                  <S.PostItem key={post.id || index} onClick={() => handleArticleClick(post)}>
                    <S.PostItemLeft>{CategoryMap[post.category as CategoryType] || post.category}</S.PostItemLeft>
                    <S.PostItemCenter>{post.title}</S.PostItemCenter>
                    <S.PostItemRight>{post.publishedAt.split(" ")[0].replace(/-/g, ".")}</S.PostItemRight>
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
            <S.Card key={post.id || index}>
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
