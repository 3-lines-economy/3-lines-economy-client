import React, { useState } from "react";
import dynamic from "next/dynamic";
import LogoSvg from "@public/logo.svg";
import * as S from "./Header.style";

// const Modal = dynamic(() => import("../modal/modal"), { ssr: false });

const Header: React.FC = () => {
  //   const [modalOpen, setModalOpen] = useState(false);

  //   const handleModalOpen = () => {
  //     setModalOpen(true);
  //   };

  //   const handleModalClose = () => {
  //     setModalOpen(false);
  //   };

  return (
    <S.Container>
      <S.LeftContainer>
        <S.HeaderItem
          onClick={() => {
            window.open(
              "https://spectacled-goat-2e2.notion.site/d3c7e0857dc0453396aafc16f4278056?pvs=4",
              "_blank"
            );
          }}>
          세줄 경제 이야기
        </S.HeaderItem>
      </S.LeftContainer>
      <S.Logo>
        <LogoSvg
          onClick={() => {
            window.location.href = "/";
          }}
          style={{ cursor: "pointer" }}
        />
      </S.Logo>
      <div></div>
      {/* <S.SubscribeButton onClick={handleModalOpen}>
        [세줄 경제] 구독하기
      </S.SubscribeButton> */}
      {/* <div></div> */}
      {/* <Modal isOpen={modalOpen} onClose={handleModalClose} /> */}
    </S.Container>
  );
};

export default Header;
