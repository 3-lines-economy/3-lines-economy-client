import styled from "@emotion/styled";

export const MainContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 20px;
`;

export const SideBarContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
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
  flex-direction: column;
  width: 100%;
  justify-content: center;
`;

export const PostList = styled.div`
  width: 80%;
  margin: auto;
  min-height: 514px;
`;

export const PostItem = styled.div<{ isVisited: boolean }>`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #ccc;
  padding: 1rem 0;
  margin: 10px 0;
  cursor: pointer;
  color: ${(props) => (props.isVisited ? "#888888" : "inherit")};
`;

export const PostItemLeft = styled.div`
  padding-left: 1rem;
  padding-right: 4rem;
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
  background: none;
  border: none;
  cursor: pointer;
  width: 40px;
  text-align: center;

  &:hover {
    text-decoration: underline;
  }

  ${(props) =>
    props.isCurrentPage &&
    `
      background: #007bff;
      color: white;
      border-radius: 5px;
  `}
`;
