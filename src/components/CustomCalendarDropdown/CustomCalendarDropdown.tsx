import React, { useState } from "react";
import Calendar from "react-calendar";
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

  return (
    <S.Container>
      <S.ToggleButton
        onClick={() => setShowCalendar(!showCalendar)}
        isOpen={showCalendar}>
        <Image src={calendarImg} alt="calendar" />
        날짜 {showCalendar ? <ChevronTop /> : <ChevronBottom />}
      </S.ToggleButton>
      {showCalendar && (
        <S.CalendarDropdown>
          <Calendar
            onChange={(e) => setValue(e)}
            value={value}
            formatDay={(locale, date) => moment(date).format("D")}
            formatMonthYear={(locale, date) => moment(date).format("YYYY. MM")}
            showNeighboringMonth={false}
            next2Label={null}
            prev2Label={null}
            minDetail="year"
          />
        </S.CalendarDropdown>
      )}
    </S.Container>
  );
};

export default CustomCalendarDropdown;
