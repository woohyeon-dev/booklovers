import React, { Dispatch, SetStateAction, useMemo, useState } from 'react';
import styled from 'styled-components';
import 'react-quill/dist/quill.snow.css';
import ReactQuill from 'react-quill';
import '../../../../styles/editor.css';

interface ChatInputProps {
  setState: Dispatch<SetStateAction<string>>;
}

const ChatInput = ({ setState }: ChatInputProps) => {
  const [inputValue, setInputValue] = useState('');

  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          ['bold', 'italic', 'underline', 'strike'],
          [{ color: [] }, { background: [] }],
          ['clean'],
          ['link'],
        ],
      },
    }),
    [],
  );

  const formats = ['bold', 'italic', 'underline', 'link', 'clean'];

  return (
    <ChatInputBox>
      <ReactQuill theme="snow" value={inputValue} onChange={setInputValue} modules={modules} formats={formats} />
      <SendButton
        onClick={() => {
          setState(inputValue);
        }}
      >
        보내기
      </SendButton>
    </ChatInputBox>
  );
};

const ChatInputBox = styled.div`
  background-color: grey;
  position: relative;
  padding: 4px;
`;

const SendButton = styled.button`
  position: absolute;
  top: 8px;
  right: 17px;
  padding: 4px;

  border: 1px solid black;
`;

export default ChatInput;
