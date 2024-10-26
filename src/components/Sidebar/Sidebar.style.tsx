import styled from "@emotion/styled";

interface NavItemProps {
  active: boolean;
}

export const NavItem = styled.div<NavItemProps>`
  padding: 15px 10px;
  margin: 5px 0;
  font-size: 14px;
  width: 220px;
  cursor: pointer;
  color: ${(props) => (props.active ? "black" : "rgba(173, 173, 173, 1)")};
  border-bottom: 1px solid #e5e7eb;
  &:hover {
    background: #e0e0e0;
  }
  &:first-child {
    border-top: 1px solid #e5e7eb;
  }
`;

export const CategoryButton = styled.div`
  padding: 15px 10px;
  font-size: 16px;
  font-weight: 600;
  display: flex;
  justify-content: space-between;
  cursor: pointer;

  &:hover {
    background: #c0c0c0;
  }
`;
