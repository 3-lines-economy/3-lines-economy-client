import styled from "@emotion/styled";

export const MainContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 20px;
  margin: 0 100px;
`;

export const SideBarContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
`;

export const CustomText = styled.div`
  position: absolute;
  right: 20px;
  top: 15px;
  color: white;
  font-family: "UhBeeSe_hyun", sans-serif;
  font-weight: bold;
  font-size: 20px;
  text-align: right;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-grow: 1;
  padding-left: 20px;
`;

export const MainBody = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
`;

export const ArticleList = styled.div`
  width: 800px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-auto-rows: minmax(150px, auto);
  grid-gap: 20px;
`;

export const ArticleContainer = styled.div`
  position: relative;
  text-align: center;
  cursor: pointer;
  border-radius: 15px;
`;

export const DateText = styled.div`
  position: absolute;
  bottom: 15px;
  left: 20px;
  font-size: 16px;
`;
