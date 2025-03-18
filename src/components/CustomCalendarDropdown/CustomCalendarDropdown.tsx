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

const CustomCalendarDropdown = () => {
  const [showCalendar, setShowCalendar] = useState(false);
  const [value, setValue] = useRecoilState(calendarValueState);
  const [viewMode, setViewMode] = useState<"month" | "year">("month");
  const [activeDate, setActiveDate] = useState(new Date());

  const handleYearMonthClick = () => {
    setViewMode(viewMode === "month" ? "year" : "month");
  };

  const goToPrevMonth = () => {
    setActiveDate(new Date(activeDate.getFullYear(), activeDate.getMonth() - 1, 1));
  };

  const goToNextMonth = () => {
    setActiveDate(new Date(activeDate.getFullYear(), activeDate.getMonth() + 1, 1));
  };

  return (
    <S.Container>
      <S.ToggleButton onClick={() => setShowCalendar(!showCalendar)} isOpen={showCalendar}>
        <div style={{ display: "flex", alignItems: "center", whiteSpace: "nowrap" }}>
          <Image src={calendarImg} alt="calendar" style={{ marginRight: "4px" }} />
          <span style={{ whiteSpace: "nowrap" }}>날짜</span>
        </div>
        {showCalendar ? <ChevronTop /> : <ChevronBottom />}
      </S.ToggleButton>
      {showCalendar && (
        <S.CalendarDropdown>
          <Calendar
            onChange={(e) => setValue(e as any)}
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
            navigationLabel={({ date, label }) => (
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: "100%",
                }}
              >
                <span onClick={handleYearMonthClick} style={{ cursor: "pointer" }}>
                  {moment(date).format("YYYY년 M월")}
                </span>
                <div style={{ display: "flex", gap: "10px" }}>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      goToPrevMonth();
                    }}
                    style={{
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      fontSize: "18px",
                    }}
                  >
                    ◀
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      goToNextMonth();
                    }}
                    style={{
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      fontSize: "18px",
                    }}
                  >
                    ▶
                  </button>
                </div>
              </div>
            )}
            view={viewMode}
            onViewChange={({ activeStartDate, view }) => {
              setViewMode(view as "month" | "year");
              if (activeStartDate) setActiveDate(activeStartDate);
            }}
          />
        </S.CalendarDropdown>
      )}
    </S.Container>
  );
};

export default CustomCalendarDropdown;
