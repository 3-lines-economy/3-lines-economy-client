import styled from "@emotion/styled";
import "./calendar.css";

export const Container = styled.div`
  position: relative;
  display: inline-block;
`;

export const ToggleButton = styled.button<{ isOpen: boolean }>`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  border: 1px solid #e0e0e0;
  border-radius: 20px;
  background-color: ${({ isOpen }) => (isOpen ? "#f0f0f0" : "#ffffff")};
  cursor: pointer;
  font-size: 14px;
  color: #333;

  &:hover {
    background-color: #f5f5f5;
  }
`;

export const CalendarDropdown = styled.div`
  position: absolute;
  top: 40px;
  width: 200px;
  right: 0;
  background-color: #ffffff;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  z-index: 10;
`;
