import React, { useState } from "react";
import { useRouter } from "next/router";
import Calendar from "react-calendar";
import moment from "moment";
import { useRecoilState } from "recoil";
import { calendarValueState } from "../../atoms/calendarAtom";
import * as S from "./CustomCalendar.style";
import "./calendar.css";
import ChevronBottom from "@public/chevron-bottom.svg";
import ChevronTop from "@public/chevron-top.svg";
import calendarImg from "@public/calendar.png";
import Image from "next/image";

const CustomCalendar = () => {
  const [showCalendar, setShowCalendar] = useState(true);
  const [value, setValue] = useRecoilState(calendarValueState);
  const router = useRouter();

  // const handleButtonClick = () => {
  //   router.push("/main");
  // };

  return (
    <>
      <S.CategoryButton
        onClick={() => setShowCalendar(!showCalendar)}
        isClick={showCalendar}>
        <Image src={calendarImg} alt="calendar" />
        오늘의 뉴스 {showCalendar ? <ChevronTop /> : <ChevronBottom />}
      </S.CategoryButton>
      {showCalendar && (
        <S.CalendarContainer>
          <Calendar
            onChange={(e) => {
              setValue(e);
            }}
            value={value}
            formatDay={(locale, date) => moment(date).format("D")}
            formatMonthYear={(locale, date) => moment(date).format("YYYY. MM")}
            // calendarType="US"
            showNeighboringMonth={false}
            next2Label={null}
            prev2Label={null}
            minDetail="year"
          />
        </S.CalendarContainer>
      )}
    </>
  );
};

export default CustomCalendar;
