import React, { useEffect, useState } from "react";
import LogoSvg from "@public/logo.svg";
import * as S from "./Header.style";
import Modal from "../Modal/Modal";
import KaKaoLoginSvg from "@public/kakao-login.svg";
import SearchBar from "@/components/SearchBar/SearchBar";

const Header: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [searchData, onSearchData] = useState([]);

  const handleModalOpen = () => {
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  useEffect(() => {
    console.log(searchData);
  }, [searchData]);

  return (
    <S.Container>
      <S.LeftContainer>
        <S.Logo>
          <LogoSvg
            onClick={() => {
              window.location.href = "/";
            }}
            style={{ cursor: "pointer" }}
          />
        </S.Logo>
        <SearchBar onSearchResults={onSearchData} />
      </S.LeftContainer>
      <S.HeaderText onClick={handleModalOpen}>로그인</S.HeaderText>
      <Modal isOpen={modalOpen} onClose={handleModalClose}>
        <S.LoginContainer>
          <S.LoginText>간편하게 로그인하고</S.LoginText>
          <S.LoginText>세줄경제의 다양한 서비스를 이용해보세요.</S.LoginText>
          <div style={{ height: "20px" }}></div>
          <KaKaoLoginSvg />
        </S.LoginContainer>
      </Modal>
    </S.Container>
  );
};

export default Header;
