import styled from "@emotion/styled";

export const Container = styled.div`
  display: flex;
  gap: 10px;
  padding: 10px 0;
  overflow-x: auto;
`;

export const CategoryButton = styled.button<{ active: boolean }>`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 16px;
  border: 1px solid #e5e7eb;
  border-radius: 20px;
  background-color: ${({ active }) => (active ? "#333" : "white")};
  color: ${({ active }) => (active ? "#fff" : "#333")};
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s;

  &:hover {
    background-color: ${({ active }) => (active ? "#333" : "#e0e0e0")};
  }

  span {
    font-weight: ${({ active }) => (active ? "bold" : "normal")};
  }
`;
