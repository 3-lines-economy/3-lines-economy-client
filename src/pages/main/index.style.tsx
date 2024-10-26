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
  width: 220px;
  /* padding: 20px; */
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
  width: 761px;
  display: flex;
  flex-direction: column;

  justify-content: center;
`;

export const PostList = styled.div`
  min-height: 514px;
`;

export const PostItem = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #ccc;
  padding: 1rem 0;
  margin: 10px 0;
  cursor: pointer;
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

export const CardNewsContainer = styled.div`
  margin-top: 3rem;
  padding: 1rem;
  background-color: #f9fafc;
  border-radius: 8px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  padding-top: 30px;
  padding: 0 120px;
  display: flex;
`;

export const CardNewsHeaderA = styled.a`
  text-decoration: none;
`;

export const CardNewsHeader = styled.div`
  display: flex;
  width: 300px;
  margin-right: 100px;
  flex-direction: column;
  padding-left: 50px;
  justify-content: center;
  margin-bottom: 1rem;

  h2 {
    font-size: 1.25rem;
    font-weight: bold;
  }

  a {
    font-size: 0.875rem;
    color: #007bff;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`;

export const CardNewsList = styled.div`
  display: flex;
  overflow-x: auto;
  gap: 1rem;
  padding: 1rem 0;
`;

export const Card = styled.div`
  min-width: 200px;
  max-width: 200px;
  flex: 0 0 auto;
  background-color: #fff;
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.05);
  }

  h3 {
    font-size: 1rem;
    font-weight: bold;
    margin-bottom: 0.5rem;
  }

  ul {
    font-size: 0.875rem;
    color: #555;
    list-style: none;
    padding: 0;
    margin: 0;

    li {
      margin-bottom: 0.5rem;
    }
  }
`;
