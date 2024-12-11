import React, { useState } from "react";
import { useRouter } from "next/router";
import * as S from "./SearchBar.style";

const SearchBar: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleSearch = () => {
    if (!searchQuery.trim()) return;
    router.push({
      pathname: "/search",
      query: { keyword: searchQuery },
    });
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
        <S.SearchButton onClick={handleSearch}>검색</S.SearchButton>
      </S.SearchWrapper>
    </S.SearchContainer>
  );
};

export default SearchBar;
