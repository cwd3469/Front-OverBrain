import { ReactNode } from 'react';

import styled from '@emotion/styled';

interface TableHeaderProps {
  children: ReactNode;
}

function TableHeader({ children }: TableHeaderProps) {
  return (
    <TableHeaderWrapper>
      <TableHeaderRow>{children}</TableHeaderRow>
    </TableHeaderWrapper>
  );
}

const TableHeaderWrapper = styled.thead`
  display: flex;
  height: 40px;
  align-items: center;
  align-self: stretch;

  border-radius: var(--radius-sm, 4px);
  border-bottom: 1px solid var(--gray-cool-100, #e6eaec);
`;

const TableHeaderRow = styled.tr`
  display: flex;
  width: 100%;
  align-items: center;
  align-self: stretch;

  color: var(--gray-cool-700, #4e5962);
  ${(props) => props.theme.typography.label3}
`;

const HeaderCell = styled.th<{ width: string }>`
  display: flex;
  width: ${({ width }) => width};
  justify-content: center;
  align-items: center;
  gap: var(--radius-lg, 8px);
  flex: ${({ width }) => (width !== '100%' ? '0 1 auto' : '1 0 0')};
`;

export { TableHeader, HeaderCell };
