import styled from '@emotion/styled';

type Props = {
  height?: string;
  width?: string;
};

const MultiLineTextFiled = styled.textarea<Props>`
  //layout
  display: flex;
  padding: 12px 16px;
  //font
  font-size: 14px;
  line-height: 20px;
  // resize 고정
  width: ${(props) => props.width ?? '100%'};
  height: ${(props) => props.height ?? '128px'};
  border: none;
  resize: none;
  //style
  box-sizing: border-box;
  border-radius: var(--Radius_MD, 6px);
  border: 1px solid var(--CoolGray-CoolGray600, #677683);
  background-color: var(--TrueGray-White, #fff);
  &::placeholder {
    color: var(--CoolGray-CoolGray400, #9aa9b7);
    font-weight: 400;
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
