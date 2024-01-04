import DefaultTextFiled, { type DefaultTextFiledProps } from './DefaultTextFiled';
import styled from '@emotion/styled';
import IcRequire from '@/assets/svg/ic_require.svg?react';
import IcBullet from '@/assets/svg/ic_bullet.svg?react';
import IcBulletError from '@/assets/svg/ic_bullet_error.svg?react';

export type MessageBoxProps = {
  message?: {
    state: 'error' | 'success';
    context: string;
  };
};

export const MessageBox = (props: MessageBoxProps) => {
  const { message } = props;
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

type Props = DefaultTextFiledProps &
  MessageBoxProps & {
    label?: string;
    require?: boolean;
  };

const LabelTextFiled = ({ label, message, require, ...props }: Props) => {
  return (
    <TextFiledContainer>
      {label && (
        <LabelName>
          {label} {require && <IcRequire />}
        </LabelName>
      )}
      <DefaultTextFiled {...props} />
      <MessageBox message={message} />
    </TextFiledContainer>
  );
};

export default LabelTextFiled;

export const TextFiledContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  align-items: flex-start;
`;

const LabelName = styled.label`
  font-size: 12px;
  line-height: 20px;
  font-weight: 700;
  color: var(--CoolGray-CoolGray700, #4e5962);
`;

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
