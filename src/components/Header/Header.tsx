import React, { useEffect, useState } from "react";
import LogoSvg from "@public/logo.svg";
import * as S from "./Header.style";
import Modal from "../Modal/Modal";
import KaKaoLoginSvg from "@public/kakao-login.svg";
import SearchBar from "@/components/SearchBar/SearchBar";
import PersonSvg from "@public/person.svg";
import KakaoLogin from "../KakaoLogin/KakaoLogin";
import { useRecoilState, useRecoilValue } from "recoil";
import { authState } from "@/atoms/authState";
import { useRouter } from "next/router";

const Header: React.FC = () => {
  const router = useRouter();

  const [modalOpen, setModalOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [authStateValue, setAuthStateValue] = useRecoilState(authState);

  const handleModalOpen = () => {
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  const handleLogout = () => {
    setAuthStateValue({
      accessToken: "",
      refreshToken: "",
    });

    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");

    router.push("/");
  };

  const handleFeedback = () => {
    router.push("/feedback");
  };

  const handleScrap = () => {
    router.push("/scrap");
  };

  const handleMynews = () => {
    router.push("/mynews");
  };

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
        <SearchBar />
      </S.LeftContainer>
      {authStateValue.accessToken !== "" ? (
        <S.ProfileContainer>
          <S.ProfileIcon onClick={toggleDropdown}>
            <PersonSvg />
          </S.ProfileIcon>
          {dropdownOpen && (
            <S.DropdownMenu>
              <S.DropdownItem>
                <strong>홍길동</strong>
              </S.DropdownItem>
              <S.DropdownItem>
                <span>honggildong12@naver.com</span>
              </S.DropdownItem>
              <S.DropdownItem onClick={handleScrap}>스크랩함</S.DropdownItem>
              <S.DropdownItem onClick={handleMynews}>
                경제 신문 정리함
              </S.DropdownItem>
              <S.DropdownItem onClick={handleFeedback}>
                고객 센터
              </S.DropdownItem>
              <S.DropdownItem onClick={handleLogout}>로그아웃</S.DropdownItem>
            </S.DropdownMenu>
          )}
        </S.ProfileContainer>
      ) : (
        <S.HeaderText onClick={handleModalOpen}>로그인</S.HeaderText>
      )}
      <Modal isOpen={modalOpen} onClose={handleModalClose}>
        <S.LoginContainer>
          <S.LoginText>간편하게 로그인하고</S.LoginText>
          <S.LoginText>세줄경제의 다양한 서비스를 이용해보세요.</S.LoginText>
          <div style={{ height: "20px" }}></div>
          <KakaoLogin />
        </S.LoginContainer>
      </Modal>
    </S.Container>
  );
};

export default Header;
