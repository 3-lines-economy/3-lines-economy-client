import styled from "@emotion/styled";

interface NavItemProps {
  active: boolean;
}

export const NavItem = styled.div<NavItemProps>`
  display: flex;
  align-items: center;
  padding: 20px 10px;
  /* margin: 5px 0; */
  font-size: 14px;
  width: 220px;
  cursor: pointer;
  color: ${(props) => (props.active ? "white" : "black")};
  background-color: ${(props) => (props.active ? "black" : "none")};
  border-bottom: 1px solid #e5e7eb;
  border-radius: 5px;
  &:hover {
    background: #e0e0e0;
  }
  &:first-child {
    border-top: 1px solid #e5e7eb;
  }
`;
