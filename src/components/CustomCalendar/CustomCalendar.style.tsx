import styled from "@emotion/styled";

export const CalendarContainer = styled.div``;

interface CategoryButtonItem {
  isClick: boolean;
}

export const CategoryButton = styled.div<CategoryButtonItem>`
  padding: 15px 10px;
  font-size: 16px;
  font-weight: 600;
  display: flex;
  justify-content: space-between;
  cursor: pointer;
  color: ${(props) => (props.isClick ? "white" : "black")};
  background-color: ${(props) => (props.isClick ? "black" : "white")};
  border-radius: 99px;

  &:hover {
    background: #c0c0c0;
  }
`;
