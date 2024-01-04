import styled from '@emotion/styled';

const MultiLineTextFiled = styled.textarea`
  //layout
  display: flex;
  padding: 12px 16px;
  //font
  font-size: 14px;
  line-height: 20px;
  // resize 고정
  width: 100%;
  height: 128px;
  border: none;
  resize: none;
  //style
  border-radius: var(--Radius_MD, 6px);
  border: 1px solid var(--CoolGray-CoolGray600, #677683);
  background-color: var(--TrueGray-White, #fff);
  &::placeholder {
    color: var(--CoolGray-CoolGray400, #9aa9b7);
  }
  &:focus-visible {
    outline: 1px solid var(--CoolGray-CoolGray600, #677683);
  }
  &:disabled {
    color: var(--TrueGray-Gray500, #b3b3b3);
    border: 1px solid var(--TrueGray-Gray200, #e1e1e1);
    background-color: var(--TrueGray-Gray025, #fbfbfb);
  }
`;

export default MultiLineTextFiled;
