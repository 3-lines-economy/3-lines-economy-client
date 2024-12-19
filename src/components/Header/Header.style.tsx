import styled from "@emotion/styled";

export const Container = styled.div`
  padding: 0 20px;
  margin: 0 100px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 0.5px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    justify-content: center;
  }
`;

export const LeftContainer = styled.div`
  display: flex;
  gap: 20px;
  /* margin-left: 100px; */

  @media (max-width: 768px) {
    display: none;
  }
`;

export const HeaderItem = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: black;
  cursor: pointer;
  &:hover {
    color: rgba(25, 25, 27, 0.5);
  }
`;

export const HeaderText = styled.div`
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
`;

export const Logo = styled.div`
  font-size: 24px;
  font-weight: bold;
  margin: auto;

  @media (max-width: 768px) {
    font-size: 20px;
  }
`;

export const SubscribeButton = styled.button`
  border-radius: 8px;
  background-color: black;
  color: white;
  font-size: 12px;
  padding: 10px 20px;
  border: none;
  cursor: pointer;
  &:hover {
    background-color: grey;
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

export const LoginContainer = styled.div`
  padding-top: 20px;
`;

export const LoginText = styled.div`
  font-size: 22px;
  font-weight: 600;
  text-align: center;
`;

export const ProfileContainer = styled.div`
  position: relative;
`;

export const ProfileIcon = styled.div`
  cursor: pointer;
`;

export const DropdownMenu = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  background-color: white;
  border: 1px solid #ddd;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  width: 200px;
  z-index: 10;
  padding: 10px;
`;

export const DropdownItem = styled.div`
  padding: 10px;
  cursor: pointer;
  font-size: 16px;
  &:hover {
    background-color: #f9f9f9;
  }
  :has(> span) {
    color: #ced4da;
    cursor: default;
    :hover {
      background-color: transparent;
    }
  }

  :has(> strong) {
    font-size: 18px;
    cursor: default;
    :hover {
      background-color: transparent;
    }
  }
`;

export const Divider = styled.div`
  height: 1px;
  background-color: #ddd;
  margin: 5px 0;
`;
