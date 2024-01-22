import { ReactNode } from 'react';

import styled from '@emotion/styled';

interface TableRowProps {
  children: ReactNode;
}

function TableRow({ children }: TableRowProps) {
  return <TableRowWrapper>{children}</TableRowWrapper>;
}

const TableRowWrapper = styled.tr`
  display: flex;
  align-items: center;
  align-self: stretch;
  width: 100%;

  border-bottom: 1px solid var(--gray-cool-100, #e6eaec);
`;

const RowCell = styled.td<{ width: string }>`
  height: 48px;
  display: flex;

  width: ${({ width }) => width};
  justify-content: center;
  align-items: center;
  gap: var(--radius-lg, 8px);
  flex: ${({ width }) => (width !== '100%' ? '0 1 auto' : '1 0 0')};
`;

export { TableRow, RowCell };
