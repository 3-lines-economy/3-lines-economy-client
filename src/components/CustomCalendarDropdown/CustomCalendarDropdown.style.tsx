import styled from "@emotion/styled";
import "./calendar.css";

export const Container = styled.div`
  position: relative;
  display: inline-block;
  font-family: -apple-system, BlinkMacSystemFont, "SF Pro Text", "Helvetica Neue", sans-serif;

  @media (max-width: 768px) {
    display: block;
    width: 100%;
  }
`;

export const ToggleButton = styled.button<{ isOpen: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  padding: 8px 16px;
  border: none;
  border-radius: 20px;
  background-color: ${({ isOpen }) => (isOpen ? "rgba(0, 0, 0, 0.05)" : "#ffffff")};
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
  cursor: pointer;
  font-size: 15px;
  font-weight: 500;
  color: #1c1c1e;
  white-space: nowrap;
  transition: all 0.2s ease;

  &:hover {
    background-color: rgba(0, 0, 0, 0.03);
    transform: translateY(-1px);
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  }

  &:active {
    transform: translateY(0);
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.08);
  }

  @media (max-width: 768px) {
    width: 100%;
    justify-content: space-between;
    border-radius: 14px;
    padding: 12px 16px;
  }
`;

export const CalendarDropdown = styled.div`
  position: absolute;
  top: 48px;
  width: 280px;
  right: 0;
  background-color: #ffffff;
  border-radius: 14px;
  z-index: 10;
  animation: fadeIn 0.2s ease-out;

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @media (max-width: 768px) {
    width: 100%;
    position: fixed;
    top: auto;
    bottom: 0;
    left: 0;
    right: 0;
    border-radius: 20px 20px 0 0;
    animation: slideUp 0.3s ease-out;
  }

  @keyframes slideUp {
    from {
      transform: translateY(100%);
    }
    to {
      transform: translateY(0);
    }
  }
`;

export const NavigationContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 0px;
`;

export const MonthYearText = styled.span`
  font-size: 18px;
  font-weight: 500;
  color: #1c1c1e;
  cursor: pointer;
  padding: 6px 10px;
  border-radius: 8px;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: rgba(0, 0, 0, 0.03);
  }
`;

export const NavButtonContainer = styled.div`
  display: flex;
  gap: 6px;
`;

export const NavButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 16px;
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  color: #1c1c1e;
  transition: all 0.2s ease;

  &:hover {
    background-color: rgba(0, 0, 0, 0.05);
  }

  &:active {
    background-color: rgba(0, 0, 0, 0.08);
  }
`;
