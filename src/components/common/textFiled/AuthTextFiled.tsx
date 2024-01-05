import styled from '@emotion/styled';
import { DefaultTextFiled, MessageBox, type DefaultTextFiledProps, type MessageBoxProps } from './DefaultTextFiled';

type Props = DefaultTextFiledProps &
  MessageBoxProps & {
    time?: {
      second: number;
      minute: number;
    };
  };

const AuthTextFiled = ({ message, time, ...props }: Props) => {
  return (
    <Container>
      <DefaultTextFiled {...props} />
      <AuthBox>
        <MessageBox message={message} />
        {time && (
          <AuthTimer>
            {time.minute}:{time.second}
          </AuthTimer>
        )}
      </AuthBox>
    </Container>
  );
};

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
