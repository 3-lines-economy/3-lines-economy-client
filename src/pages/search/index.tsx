import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useSetRecoilState } from "recoil";
import CustomCalendar from "@/components/CustomCalendar/CustomCalendar";
import SideBar from "@/components/Sidebar/Sidebar";
import * as S from "./index.style";
import { selectedArticleState } from "@/atoms/selectedArticleAtom";
import { Post } from "@/types/post";

// interface SearchResult {
//   id: number;
//   title: string;
//   category: string;
//   link: string;
//   what: string;
//   why: string;
//   how: string;
//   publishedAt: string;
// }

const PostsPerPage = 10;
const PageGroupSize = 5;

const Search: React.FC = () => {
  const router = useRouter();
  const { keyword } = router.query;

  const [searchResults, setSearchResults] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const setSelectedArticle = useSetRecoilState(selectedArticleState);

  const totalPages = Math.ceil(searchResults.length / PostsPerPage);
  const currentGroup = Math.ceil(currentPage / PageGroupSize);
  const startPage = (currentGroup - 1) * PageGroupSize + 1;
  const endPage = Math.min(currentGroup * PageGroupSize, totalPages);

  const indexOfLastPost = currentPage * PostsPerPage;
  const indexOfFirstPost = indexOfLastPost - PostsPerPage;
  const currentPosts = searchResults.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const fetchSearchResults = async () => {
    if (!keyword) return;

    setIsLoading(true);
    setError(null);

    try {
      const baseUrl = `${process.env.NEXT_PUBLIC_API_NEW}search`;
      const url = `${baseUrl}?keyword=${encodeURIComponent(
        keyword as string
      )}&page=1`;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Failed to fetch search results.");
      }

      const data = await response.json();
      setSearchResults(data.body.newsList);
    } catch (err) {
      setError("검색 중 문제가 발생했습니다. 다시 시도해주세요.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleArticleClick = (result: Post) => {
    setSelectedArticle(result);
    router.push(`/article/${result.id}`);
  };

  useEffect(() => {
    if (keyword) {
      fetchSearchResults();
    }
  }, [keyword]);

  return (
    <S.MainContainer>
      <S.SideBarContainer>
        <CustomCalendar />
        <SideBar />
      </S.SideBarContainer>
      <S.Content>
        {isLoading ? (
          <S.LoadingMessage>검색 중...</S.LoadingMessage>
        ) : error ? (
          <S.ErrorText>{error}</S.ErrorText>
        ) : currentPosts.length === 0 ? (
          <S.NoResultsMessage>검색 결과가 없습니다.</S.NoResultsMessage>
        ) : (
          <S.MainBody>
            <S.PostList>
              {currentPosts.map((result) => (
                <S.PostItem
                  key={result.id}
                  onClick={() => handleArticleClick(result)}>
                  <S.PostItemLeft>{result.category}</S.PostItemLeft>
                  <S.PostItemCenter>{result.title}</S.PostItemCenter>
                  <S.PostItemRight>
                    {result.publishedAt.replace(/-/g, ".")}
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
  );
};

export default Search;
