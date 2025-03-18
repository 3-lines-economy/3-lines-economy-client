import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import moment from "moment";
import { useRecoilState } from "recoil";
import { calendarValueState } from "../../atoms/calendarAtom";
import * as S from "./CustomCalendarDropdown.style";
import ChevronBottom from "@public/chevron-bottom.svg";
import ChevronTop from "@public/chevron-top.svg";
import calendarImg from "@public/calendar.png";
import Image from "next/image";

// react-calendar의 Value 타입 정의
type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

const CustomCalendarDropdown = () => {
  const [showCalendar, setShowCalendar] = useState(false);
  const [value, setValue] = useRecoilState(calendarValueState);
  const [viewMode, setViewMode] = useState<"month" | "year">("month");
  const [activeDate, setActiveDate] = useState(new Date());

  const handleYearMonthClick = () => {
    setViewMode(viewMode === "month" ? "year" : "month");
  };

  const goToPrevMonth = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveDate(new Date(activeDate.getFullYear(), activeDate.getMonth() - 1, 1));
  };

  const goToNextMonth = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveDate(new Date(activeDate.getFullYear(), activeDate.getMonth() + 1, 1));
  };

  // 날짜 선택 핸들러
  const handleDateChange = (newValue: Value) => {
    if (newValue instanceof Date) {
      setValue(newValue);
      // 모바일에서는 날짜 선택 후 캘린더를 자동으로 닫기
      if (window.innerWidth <= 768) {
        setShowCalendar(false);
      }
    }
  };

  return (
    <S.Container>
      <S.ToggleButton onClick={() => setShowCalendar(!showCalendar)} isOpen={showCalendar}>
        <div style={{ display: "flex", alignItems: "center", whiteSpace: "nowrap" }}>
          <Image src={calendarImg} alt="calendar" style={{ marginRight: "6px", width: "16px", height: "16px" }} />
          <span style={{ whiteSpace: "nowrap" }}>날짜</span>
        </div>
        {showCalendar ? <ChevronTop /> : <ChevronBottom />}
      </S.ToggleButton>

      {showCalendar && (
        <S.CalendarDropdown>
          <Calendar
            onChange={handleDateChange}
            value={value}
            formatDay={(locale, date) => moment(date).format("D")}
            formatMonthYear={(locale, date) => moment(date).format("YYYY년 M월")}
            showNeighboringMonth={false}
            next2Label={null}
            prev2Label={null}
            nextLabel={null}
            prevLabel={null}
            minDetail="year"
            activeStartDate={activeDate}
            onActiveStartDateChange={({ activeStartDate }) => activeStartDate && setActiveDate(activeStartDate)}
            navigationLabel={() => (
              <S.NavigationContainer>
                <S.MonthYearText onClick={handleYearMonthClick}>{moment(activeDate).format("YYYY년 M월")}</S.MonthYearText>

                <S.NavButtonContainer>
                  <S.NavButton onClick={goToPrevMonth}>&lsaquo;</S.NavButton>
                  <S.NavButton onClick={goToNextMonth}>&rsaquo;</S.NavButton>
                </S.NavButtonContainer>
              </S.NavigationContainer>
            )}
            view={viewMode}
            onViewChange={({ activeStartDate, view }) => {
              setViewMode(view as "month" | "year");
              if (activeStartDate) setActiveDate(activeStartDate);
            }}
            tileClassName={({ date, view }) => {
              if (view === "month" && value instanceof Date && moment(date).isSame(value, "day")) {
                return "selected-date";
              }
              return null;
            }}
          />
        </S.CalendarDropdown>
      )}
    </S.Container>
  );
};

export default CustomCalendarDropdown;
