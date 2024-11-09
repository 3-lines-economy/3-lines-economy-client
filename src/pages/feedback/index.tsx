import React, { ChangeEvent, useState } from "react";
import * as S from "./index.style";

const InquiryForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [question, setQuestion] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [agree, setAgree] = useState(false);

  const [fileList, setFileList] = useState<File[]>([]);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const files = Array.from(event.target.files);
      setFileList((prevList) => [...prevList, ...files]);
    }
  };

  const handleRemoveFile = (fileName: string) => {
    setFileList((prevList) =>
      prevList.filter((file) => file.name !== fileName)
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    console.log({ email, question, file, agree });
  };

  return (
    <S.FormContainer onSubmit={handleSubmit}>
      <S.Title>세줄 경제에게 궁금한 점이 있으신가요?</S.Title>
      <S.Description>
        세줄 경제에 대해 궁금한 점이 있다면 물어봐주세요!
        <br />
        휴일과 공휴일을 제외한 날에는 하루 이내에 적어주신 메일로 답변을
        받아보실 수 있어요.
      </S.Description>
      <S.Row>
        <S.Label htmlFor="email">e-mail</S.Label>
        <S.Input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="abcd1234@gmail.com"
        />
      </S.Row>

      <S.Row>
        <S.Label htmlFor="question">문의 내용</S.Label>
        <S.TextArea
          id="question"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="문의 내용을 입력해주세요."
        />
      </S.Row>

      <S.Row>
        <S.Label>첨부파일</S.Label>
        <label htmlFor="file">
          <S.FindFileButton>파일 업로드하기</S.FindFileButton>
        </label>
        <input
          type="file"
          name="file"
          id="file"
          style={{ display: "none" }}
          onChange={handleFileChange}
        />

        <S.FileList>
          {fileList.map((file, index) => (
            <div key={index} style={{ display: "flex", alignItems: "center" }}>
              <a href="#" style={{ marginRight: "5px", color: "#374151" }}>
                {file.name}
              </a>
              <S.FileListButton onClick={() => handleRemoveFile(file.name)}>
                &times;
              </S.FileListButton>
            </div>
          ))}
        </S.FileList>
      </S.Row>

      <S.CheckboxContainer>
        <S.Checkbox
          type="checkbox"
          checked={agree}
          onChange={() => setAgree(!agree)}
        />
        <S.CheckboxLabel>이메일 정보 활용에 동의합니다.</S.CheckboxLabel>
        <S.CheckboxLabel>
          질문에 답변해 드리기 위해서 이메일 정보 제공 동의가 필요해요.
        </S.CheckboxLabel>
      </S.CheckboxContainer>

      <S.SubmitButton type="submit">보내기</S.SubmitButton>
    </S.FormContainer>
  );
};

export default InquiryForm;
