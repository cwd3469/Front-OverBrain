import { ReactNode } from 'react';

import styled from '@emotion/styled';

interface TableFooterProps {
  children: ReactNode;
}

export function TableFooter({ children }: TableFooterProps) {
  return <FooterWrapper>{children}</FooterWrapper>;
}

const FooterWrapper = styled.div`
  display: flex;
  height: 72px;
  padding: 20px 24px 20px 24px;
  align-items: flex-start;
  align-self: stretch;
`;
