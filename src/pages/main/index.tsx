import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useSetRecoilState } from "recoil";
import { calendarValueState } from "../../atoms/calendarAtom";
import ArticleSvg from "@public/article.svg";
import * as S from "./index.style";

const Main: React.FC = () => {
  const router = useRouter();
  const setCalendarValue = useSetRecoilState(calendarValueState);
  const [articles, setArticles] = useState<string[]>([]);

  const handleArticleClick = (date: string) => {
    const selectedDate = new Date(date);
    setCalendarValue(selectedDate);
    router.push("/board");
  };

  const separateDay = (date: string) => {
    if (!date) {
      console.error("Date is undefined or null");
      return "날짜 없음";
    }
    const separated = date.split("-");
    return `${Number(separated[1])}월 ${Number(separated[2])}일`;
  };

  const fetchData = async () => {
    const baseUrl = `${process.env.NEXT_PUBLIC_API}news/date`;
    const params: Record<string, string> = {
      path: "date",
    };

    const url = new URL(baseUrl);
    Object.keys(params).forEach((key) =>
      url.searchParams.append(key, params[key])
    );

    try {
      const response = await fetch(url.toString(), {
        method: "GET",
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json();
      if (data.statusCode === 500) {
        return;
      }
      setArticles(data.body.reverse());
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    console.log(articles);
  }, [articles]);

  return (
    <S.MainContainer>
      <S.SideBarContainer>
        {/* <CustomCalendar isMobile={false} /> */}
      </S.SideBarContainer>
      <S.Content>
        <S.MainBody>
          <S.ArticleList>
            {articles.map((article, index) => (
              <S.ArticleContainer
                key={index}
                onClick={() => handleArticleClick(article)}>
                <ArticleSvg />
                <S.CustomText>
                  {separateDay(article)}
                  <br /> 경신스
                </S.CustomText>
                <S.DateText>{article} 경신스</S.DateText>
              </S.ArticleContainer>
            ))}
          </S.ArticleList>
        </S.MainBody>
      </S.Content>
    </S.MainContainer>
  );
};

export default Main;
