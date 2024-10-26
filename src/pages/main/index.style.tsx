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

export const MainBody = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: center;
`;

export const PostList = styled.div`
  min-height: 514px;
`;

// export const PostItem = styled.div<{ isVisited: boolean }>`
export const PostItem = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #ccc;
  padding: 1rem 0;
  margin: 10px 0;
  cursor: pointer;
  /* color: ${(props) => (props.isVisited ? "#888888" : "inherit")}; */
`;

export const PostItemLeft = styled.div`
  width: 60px;
  padding-left: 1rem;
  padding-right: 2rem;
  font-weight: 500;
  font-size: 16px;
`;

export const PostItemCenter = styled.div`
  flex-grow: 1;
  justify-content: start;
`;

export const PostItemRight = styled.div`
  color: rgba(173, 173, 173, 1);
`;

export const Pagination = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
`;

export const PageButton = styled.button<{ isCurrentPage: boolean }>`
  padding: 5px 10px;
  margin: 0 5px;
  border: none;
  cursor: pointer;
  width: 40px;
  text-align: center;
  color: ${(props) => (props.isCurrentPage ? "white" : "#888888")};
  background-color: ${(props) =>
    props.isCurrentPage ? "black" : "transparent"};
  border-radius: 5px;

  &:hover {
    text-decoration: underline;
  }
`;

export const LoadingMessage = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  color: #666;
  text-align: center;
  margin-top: 2rem;
`;
