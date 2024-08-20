import styled from '@emotion/styled';
import IcBullet from '@/shared/assets/svg/ic_bullet.svg?react';
import IcBulletError from '@/shared/assets/svg/ic_bullet_error.svg?react';

type Props = {
  fieldSize?: 'lg' | 'mb' | 'sm';
};

type DefaultTextFiledProps = React.InputHTMLAttributes<HTMLInputElement> & Props;

const DefaultTextFiled = styled.input<Props>`
  //layout
  display: flex;
  padding: 12px 16px;
  //font
  font-size: 14px;
  line-height: 18px;
  width: 100%;
  //style
  border-radius: var(--Radius_MD, 6px);
  border: 1px solid var(--CoolGray-CoolGray300, #b4bfc8);
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
  ${(props) =>
    props.fieldSize === 'mb'
      ? 'padding: 10px 16px'
      : props.fieldSize === 'sm'
      ? 'padding: 8px; font-size: 12px; line-height: 14px'
      : ''}
`;

type MessageBoxProps = {
  /**상태 메시지 */
  state: 'error' | 'success';
  context: string;
};

const MessageBox = ({ message }: { message?: MessageBoxProps; style?: React.CSSProperties }) => {
  return message ? (
    <LabelMessageBox>
      {message.state === 'error' && <IcBulletError className="icon_box" />}
      {message.state === 'success' && <IcBullet className="icon_box" />}
      <LabelMessage state={message.state}>{message.context}</LabelMessage>
    </LabelMessageBox>
  ) : (
    <></>
  );
};

type MessageProps = {
  state?: 'error' | 'success';
};

const LabelMessageBox = styled.div`
  display: flex;
  gap: 4px;
  align-self: stretch;
  & .icon_box {
    width: 24px;
    height: 24px;
  }
`;

const LabelMessage = styled.div<MessageProps>`
  font-size: 14px;
  line-height: 20px;
  ${(props) =>
    props.state === 'error'
      ? 'color: var(--Function-Red_Default, #F15050);'
      : props.state === 'success'
      ? 'color: var(--Function-Green_Dark, #109138);'
      : ''};
`;

export { DefaultTextFiled, MessageBox, type MessageBoxProps, type DefaultTextFiledProps };
