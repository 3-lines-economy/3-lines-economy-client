import React, { useEffect, useState } from "react";
import * as S from "./index.style";
import { useRecoilState, useSetRecoilState } from "recoil";
import { calendarValueState } from "../../atoms/calendarAtom";
import { selectedArticleState } from "../../atoms/selectedArticleAtom";
import CustomCalendar from "@/components/CustomCalendar/CustomCalendar";
import { Post } from "@/types/post";
import CustomCalendarDropdown from "@/components/CustomCalendarDropdown/CustomCalendarDropdown";
import Menubar from "@/components/Menubar/Menubar";
import { CategoryMap, CategoryType } from "../../types/category";
import { useRouter } from "next/router";

const PostsPerPage = 10;

const Scrap: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [posts, setPosts] = useState<Post[]>([]);
  const [selectedDate] = useRecoilState(calendarValueState);
  const [selectedCategory, setSelectedCategory] = useState("전체");
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [totalElements, setTotalElements] = useState(0);
  const [totalPages, setTotalPages] = useState(10);
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  const setSelectedArticle = useSetRecoilState(selectedArticleState);

  useEffect(() => {
    setMounted(true);
  }, []);

  const startPage = 1;
  const endPage = 5;

  const fetchData = async () => {
    if (!selectedDate || !mounted) return;

    setIsLoading(true);
    const formattedDate = selectedDate.toISOString().split("T")[0].replace(/-/g, "");
    const baseUrl = `${process.env.NEXT_PUBLIC_API}news`;
    const url = `${baseUrl}?date=${formattedDate}&page=${currentPage}&category=${selectedCategory !== "전체" ? selectedCategory : ""}`;

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
      console.error("스크랩 데이터 불러오기 실패:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (mounted && selectedDate) {
      fetchData();
    }
  }, [selectedDate, currentPage, selectedCategory, mounted]);

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const handleArticleClick = (post: Post) => {
    setSelectedArticle(post);
    router.push(`/detail/${post.id}`);
  };

  if (!mounted) {
    return null;
  }

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
        <S.PostList>
          {posts.map((post, index) => (
            <S.PostItem key={post.id || index} onClick={() => handleArticleClick(post)}>
              <S.PostItemLeft>{CategoryMap[post.category as CategoryType] || post.category}</S.PostItemLeft>
              <S.PostItemCenter>{post.title}</S.PostItemCenter>
              <S.PostItemRight>{post.publishedAt.split(" ")[0].replace(/-/g, ".")}</S.PostItemRight>
            </S.PostItem>
          ))}
        </S.PostList>
      )}

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
    </S.Container>
  );
};

export default Scrap;
