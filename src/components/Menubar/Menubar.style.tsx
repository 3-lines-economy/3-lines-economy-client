import styled from "@emotion/styled";

export const Container = styled.div`
  display: flex;
  gap: 10px;
  padding: 10px 0;
  overflow-x: auto;
  flex: 1;

  @media (max-width: 768px) {
    padding: 5px 0;
    width: auto;
    max-width: 70%;
    -webkit-overflow-scrolling: touch;
    &::-webkit-scrollbar {
      display: none;
    }
    scrollbar-width: none;
    padding-bottom: 8px;
  }
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
  white-space: nowrap;

  &:hover {
    background-color: ${({ active }) => (active ? "#333" : "#e0e0e0")};
  }

  span {
    font-weight: ${({ active }) => (active ? "bold" : "normal")};
  }

  @media (max-width: 768px) {
    padding: 6px 12px;
    font-size: 12px;
    flex-shrink: 0;
  }
`;
