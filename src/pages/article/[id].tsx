import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import * as S from "./article.style";
import { Post } from "@/types/post";
import { selectedArticleState } from "@/atoms/selectedArticleAtom";
import { useRecoilValue } from "recoil";

const ArticleDetail: React.FC = () => {
  const router = useRouter();
  const article = useRecoilValue(selectedArticleState);
  const [isExpanded, setIsExpanded] = useState(false);

  if (!article) return <S.LoadingMessage>Loading...</S.LoadingMessage>;

  return (
    <S.ArticleContainer>
      <S.ArticleHeader>
        <div style={{ display: "flex" }}>
          <S.Category>{article.category}</S.Category>
          <div style={{ width: "15px" }}></div>
          <S.Title>{article.title}</S.Title>
        </div>
        <S.Date>{article.datetime.split(" ")[0].replace(/-/g, ".")}</S.Date>
      </S.ArticleHeader>

      <S.Summary>
        <S.SummaryTitle>📰 {article.category}의 세 줄 요약</S.SummaryTitle>
        <S.SummaryContent>
          <p>
            <strong>What:</strong> {article.what}
          </p>
          <p>
            <strong>Why:</strong> {article.why}
          </p>
          <p>
            <strong>How:</strong> {article.how}
          </p>
        </S.SummaryContent>
        <S.LinkButton href={article.link} target="_blank">
          기사 원문 보러가기
        </S.LinkButton>
      </S.Summary>

      <S.ToggleButton onClick={() => setIsExpanded(!isExpanded)}>
        ▼ 경제신문 정리하기
      </S.ToggleButton>
      {isExpanded && (
        <S.ExpandableSection>
          <S.Table>
            <tbody>
              <tr>
                <td>
                  <strong>헤드라인</strong>
                </td>
                <td>
                  <S.GrayText>{article.title}</S.GrayText>
                </td>
              </tr>
              <tr>
                <td>
                  <strong>한 줄 요약</strong>
                </td>
                <td>
                  <S.Input placeholder="한 줄 요약 제공" />
                </td>
              </tr>
              <tr>
                <td>
                  <strong>
                    세줄 경제의
                    <br />
                    세줄 요약
                  </strong>
                </td>
                <td>
                  <S.Row>
                    <strong>What:</strong> {article.what}
                  </S.Row>
                  <S.Row>
                    <strong>Why:</strong> {article.why}
                  </S.Row>
                  <S.Row>
                    <strong>How:</strong> {article.how}
                  </S.Row>
                </td>
              </tr>
              <tr>
                <td>
                  <strong>기사 내용의 수치화</strong>
                </td>
                <td>
                  <S.Input placeholder="기사 내용 속 수치화 부분을 작성해 보세요." />
                </td>
              </tr>
              <tr>
                <td>
                  <strong>기사 내용 인사이트</strong>
                </td>
                <td>
                  <S.Input placeholder="기사 내용 속 인사이트를 작성해 보세요." />
                </td>
              </tr>
              <tr>
                <td>
                  <strong>추가 조사 내용</strong>
                </td>
                <td>
                  <S.Input placeholder="모르는 용어나 추가 조사 내용을 작성해 보세요." />
                </td>
              </tr>
              <tr>
                <td>
                  <strong>
                    적용할 점<br />
                    (현직자에게 할 질문)
                  </strong>
                </td>
                <td>
                  <S.Input placeholder="현직자에게 할 질문이나 적용할 점을 메모해 보세요." />
                </td>
              </tr>
              <tr>
                <td>
                  <strong>연관기사 링크</strong>
                </td>
                <td>
                  <S.Input placeholder="관련 기사의 링크를 붙여넣어 보세요." />
                </td>
              </tr>
            </tbody>
          </S.Table>
        </S.ExpandableSection>
      )}
    </S.ArticleContainer>
  );
};

export default ArticleDetail;
