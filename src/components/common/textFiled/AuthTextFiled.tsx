import styled from '@emotion/styled';
import { DefaultTextFiled, MessageBox, type DefaultTextFiledProps, type MessageBoxProps } from './DefaultTextFiled';
import { forwardRef } from 'react';

const timeFormat = (time: number) => (time < 10 ? `0${time}` : time);

type Props = DefaultTextFiledProps &
  MessageBoxProps & {
    time?: {
      second: number;
      minute: number;
    };
  };

const AuthTextFiled = forwardRef<HTMLDivElement, Props>(({ message, time, ...props }, ref) => (
  <Container ref={ref}>
    <DefaultTextFiled {...props} />
    <AuthBox>
      <MessageBox message={message} />
      {time && (
        <AuthTimer>
          {timeFormat(time.minute)}:{timeFormat(time.second)}
        </AuthTimer>
      )}
    </AuthBox>
  </Container>
));

AuthTextFiled.displayName = 'AuthTextFiled';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  align-items: flex-start;
`;

const AuthTimer = styled.p`
  font-size: 14px;
  font-weight: 700;
  line-height: 24px;
  margin-left: auto;
`;

const AuthBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

export default AuthTextFiled;
