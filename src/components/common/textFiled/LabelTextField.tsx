import { DefaultTextFiled, MessageBox, type DefaultTextFiledProps, type MessageBoxProps } from './DefaultTextFiled';
import styled from '@emotion/styled';
import IcRequire from '@/assets/svg/ic_require.svg?react';
import { forwardRef } from 'react';

type Props = DefaultTextFiledProps &
  MessageBoxProps & {
    label?: string;
    require?: boolean;
  };

/**상태 메시지 */
const LabelTextFiled = forwardRef<HTMLDivElement, Props>(({ label, message, require, ...props }, ref) => (
  <Container ref={ref}>
    {label && (
      <LabelName>
        {label} {require && <IcRequire />}
      </LabelName>
    )}
    <DefaultTextFiled {...props} />
    <MessageBox message={message} />
  </Container>
));

LabelTextFiled.displayName = 'LabelTextFiled';

const Container = styled.div`
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

export default LabelTextFiled;
