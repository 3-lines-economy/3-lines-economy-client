import styled from "@emotion/styled";

export const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px 20px;
  border-radius: 8px;
  width: 360px;
  margin: 0 auto;
`;

export const SearchWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  border-radius: 8px;
  overflow: hidden;
`;

export const SearchInput = styled.input`
  flex: 1;
  padding: 10px 15px;
  border: none;
  font-size: 14px;
  color: #99a3b6;
  background-color: #f9fafc;
  &:focus {
    outline: none;
  }
`;

export const SearchButton = styled.button`
  padding: 10px 15px;
  background-color: #f9fafc;
  border: none;
  font-size: 14px;
  cursor: pointer;
`;

export const ErrorText = styled.div`
  margin-top: 10px;
  font-size: 14px;
  color: red;
  text-align: center;
`;
