import { ReactNode } from 'react';

import styled from '@emotion/styled';

interface TableProps {
  children: ReactNode;
}

export default function Table({ children }: TableProps) {
  return <TableWrapper>{children}</TableWrapper>;
}

const TableWrapper = styled.table`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  align-self: stretch;
`;
