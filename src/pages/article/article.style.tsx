import styled from "@emotion/styled";

export const LoadingMessage = styled.div`
  font-size: 24px;
  text-align: center;
  color: #666;
`;

export const ArticleContainer = styled.div`
  max-width: 800px;
  margin: 2rem auto;
  padding: 1.5rem;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
`;

export const ArticleHeader = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 1.5rem;
  border-bottom: 1px solid #ddd;
  padding-bottom: 1rem;
`;

export const Category = styled.div`
  font-size: 16px;
  font-weight: bold;
  color: #666;
  background-color: #e0e0e0;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  display: inline-block;
  margin-bottom: 0.5rem;
`;

export const Title = styled.h1`
  font-size: 24px;
  font-weight: bold;
  margin: 0;
`;

export const Date = styled.div`
  font-size: 16px;
  color: #888;
  margin-top: 0.5rem;
`;

export const Summary = styled.div`
  margin-top: 1.5rem;
  padding-top: 1rem;
  border-top: 1px solid #ddd;
`;

export const SummaryTitle = styled.h2`
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 0.75rem;
`;

export const SummaryContent = styled.div`
  font-size: 16px;
  color: #444;
  line-height: 1.5;

  p {
    margin: 0.5rem 0;
  }
`;

export const LinkButton = styled.a`
  display: inline-block;
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  background-color: #333;
  color: #fff;
  font-size: 16px;
  text-decoration: none;
  border-radius: 4px;
  text-align: center;

  &:hover {
    background-color: #555;
  }
`;

export const ToggleButton = styled.button`
  background: none;
  border: none;
  color: #333;
  font-size: 24px;
  cursor: pointer;
  margin-top: 1rem;
`;

export const ExpandableSection = styled.div`
  margin-top: 1rem;
  padding: 1rem;
  background-color: #f3f3f3;
  border-radius: 8px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.05);
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 1rem;
  border-radius: 8px;

  td {
    padding: 0.5rem;
    border-top: 1px solid #ddd;
    vertical-align: top;
    background-color: white;
  }
  td:first-of-type {
    width: 25%;
    font-weight: 500;
    background-color: rgba(58, 61, 78, 0.03);
  }

  strong {
    font-weight: bold;
  }
`;

export const Row = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const Input = styled.input`
  width: 100%;
  padding: 0.5rem;
  font-size: 16px;
  color: #333;
  background-color: #f0f0f0;
  border: 1px solid #ddd;
  border-radius: 4px;
  outline: none;
  &::placeholder {
    color: #999;
  }
`;

export const GrayText = styled.span`
  color: #666;
`;
