import styled from "@emotion/styled";

export const FormContainer = styled.form`
  /* max-width: 600px; */
  margin: 0 100px;
  padding: 2rem;
  border-radius: 8px;

  > :nth-child(3) {
    border-top: 1px #e5e7eb solid;
  }
`;

export const Title = styled.h1`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 1rem;
`;

export const Description = styled.p`
  font-size: 16px;

  color: #666;
  margin-bottom: 2rem;
`;

export const Row = styled.div`
  display: flex;
  padding: 20px 0;
  border-bottom: 1px #e5e7eb solid;
`;

export const Label = styled.label`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  font-weight: 500;
  color: #333;
  width: 100px;
`;

export const FindFileButton = styled.div`
  display: inline-block;
  font-size: 16px;
  padding: 10px 20px;
  color: black;
  border-radius: 6px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  text-align: center;
`;

export const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  font-size: 16px;
  color: #333;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

export const TextArea = styled.textarea`
  width: 100%;
  height: 150px;
  padding: 0.75rem;
  font-size: 16px;
  color: #333;
  border: 1px solid #ddd;
  border-radius: 4px;
  resize: none;
`;

export const FileInput = styled.input`
  display: none;
  /* font-size: 16px; */
`;

export const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 20px 0;
`;

export const Checkbox = styled.input`
  margin-right: 0.5rem;
`;

export const CheckboxLabel = styled.label`
  font-size: 14px;
  color: #666;
`;

export const SubmitButton = styled.button`
  width: 120px;
  padding: 0.75rem;
  font-size: 16px;
  color: #fff;
  background-color: #292929;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  text-align: center;

  &:hover {
    background-color: #555;
  }
`;

export const FileList = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 10px;
`;

export const FileListButton = styled.button`
  background: none;
  border: none;
  color: red;
  cursor: pointer;
  font-size: 16px;
`;
