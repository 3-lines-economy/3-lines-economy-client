import React, { useState } from "react";
import * as S from "./SearchBar.style";

interface SearchBarProps {
  onSearchResults: (data: any) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearchResults }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;

    setIsLoading(true);
    setError(null);

    try {
      // Fetch API 요청
      const baseUrl = `${process.env.NEXT_PUBLIC_API_NEW}search`;
      const url = `${baseUrl}?keyword=${encodeURIComponent(
        searchQuery
      )}&page=1`;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("검색 요청에 실패했습니다.");
      }
      const data = await response.json();
      onSearchResults(data.results);
    } catch (err) {
      setError("검색 중 문제가 발생했습니다. 다시 시도해주세요.");
      onSearchResults(null);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <S.SearchContainer>
      <S.SearchWrapper>
        <S.SearchInput
          type="text"
          placeholder="관심 있는 기업을 검색해보세요(삼성 전자, LG, ...)"
          value={searchQuery}
          onChange={handleInputChange}
        />
        <S.SearchButton onClick={handleSearch} disabled={isLoading}>
          {isLoading ? "검색 중..." : "검색"}
        </S.SearchButton>
      </S.SearchWrapper>
      {error && <S.ErrorText>{error}</S.ErrorText>}
    </S.SearchContainer>
  );
};

export default SearchBar;
