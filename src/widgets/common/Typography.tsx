import styled from '@emotion/styled';
import IcRequire from '@/assets/svg/ic_require.svg?react';
import { LabelHTMLAttributes } from 'react';

type Props = LabelHTMLAttributes<HTMLLabelElement> & {
  require?: boolean;
  label?: string;
};

export const IcRequireTypography = ({ require, label, ...props }: Props) => {
  if (!label) return <></>;
  return (
    <LabelName {...props}>
      {label} {require && <IcRequire />}
    </LabelName>
  );
};

const LabelName = styled.label`
  font-size: 12px;
  line-height: 20px;
  font-weight: 700;
  color: var(--gray-cool-700, #4e5962);
`;
