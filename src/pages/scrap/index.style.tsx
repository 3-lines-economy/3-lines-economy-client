import styled from "@emotion/styled";

export const Container = styled.div`
  margin: 0 100px;
  padding: 20px;
`;

export const Title = styled.div`
  font-size: 24px;
  margin: 20px 0;
`;

export const SubTitle = styled.div`
  font-size: 16px;
  color: #99a3b6;
  margin-bottom: 30px;
`;

export const FilterContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 20px;
`;

export const FilterButton = styled.button<{ isActive: boolean }>`
  padding: 8px 16px;
  border: none;
  border-radius: 20px;
  font-size: 14px;
  background-color: ${({ isActive }) => (isActive ? "#333" : "#e0e0e0")};
  color: ${({ isActive }) => (isActive ? "#fff" : "#333")};
  cursor: pointer;

  &:hover {
    background-color: #666;
    color: #fff;
  }
`;

export const DateFilter = styled.div`
  margin-left: auto;
  position: relative;
`;

export const PostCategory = styled.div`
  width: 10%;
  font-weight: bold;
`;

export const PostTitle = styled.div`
  width: 70%;
`;

export const PostDate = styled.div`
  width: 20%;
  text-align: right;
  color: #999;
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
export const PageNumber = styled.span`
  font-weight: bold;
`;

export const DateFilterButton = styled.button`
  padding: 8px 16px;
  border: none;
  border-radius: 20px;
  font-size: 14px;
  background-color: #e0e0e0;
  color: #333;
  cursor: pointer;

  &:hover {
    background-color: #666;
    color: #fff;
  }
`;

export const DateDropdown = styled.div`
  position: absolute;
  top: 50px;
  right: 0;
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  z-index: 10;
  width: 300px;
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
