import React, { useEffect, useState } from "react";
import * as S from "./index.style";
import { useRecoilState } from "recoil";
import { calendarValueState } from "../../atoms/calendarAtom";
import CustomCalendar from "@/components/CustomCalendar/CustomCalendar";
import { Post } from "@/types/post";
import CustomCalendarDropdown from "@/components/CustomCalendarDropdown/CustomCalendarDropdown";
import Menubar from "@/components/Menubar/Menubar";

const PostsPerPage = 10;

const Scrap: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [posts, setPosts] = useState<Post[]>([]);
  const [selectedDate] = useRecoilState(calendarValueState);
  const [selectedCategory, setSelectedCategory] = useState("전체");
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  const startPage = 1;
  const endPage = 5;
  const totalPages = 10;

  const fetchData = async () => {
    // TODO 스크랩 불러오기 api
  };

  useEffect(() => {
    fetchData();
  }, [selectedDate, currentPage, selectedCategory]);

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

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

      <S.PostList>
        {posts.map((post, index) => (
          <S.PostItem key={index}>
            <S.PostItemLeft>{post.category}</S.PostItemLeft>
            <S.PostItemCenter>{post.title}</S.PostItemCenter>
            <S.PostItemRight>{post.datetime}</S.PostItemRight>
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
    </S.Container>
  );
};

export default Scrap;
