import styled from '@emotion/styled';
import DefaultTextFiled, { DefaultTextFiledProps } from './DefaultTextFiled';
import { MessageBox, TextFiledContainer, type MessageBoxProps } from './LabelTextFiled';

type Props = DefaultTextFiledProps &
  MessageBoxProps & {
    time?: {
      second: number;
      minute: number;
    };
  };

const AuthTextFiled = ({ message, time, ...props }: Props) => {
  return (
    <TextFiledContainer>
      <DefaultTextFiled {...props} />
      <AuthBox>
        <MessageBox message={message} />
        {time && (
          <AuthTimer>
            {time.minute}:{time.second}
          </AuthTimer>
        )}
      </AuthBox>
    </TextFiledContainer>
  );
};

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
