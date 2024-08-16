import { CSSProperties, ReactNode } from 'react';

import styled from '@emotion/styled';
import { css } from '@emotion/react';

interface TableRowProps {
  children: ReactNode;
  onRowClick: () => void;
  style?: CSSProperties;
}

function TableRow({ children, onRowClick, style }: Readonly<TableRowProps>) {
  return (
    <TableRowWrapper onClick={onRowClick} style={style}>
      {children}
    </TableRowWrapper>
  );
}

const TableRowWrapper = styled.div`
  display: flex;
  align-items: center;
  align-self: stretch;
  width: 100%;

  border-bottom: 1px solid var(--gray-cool-100, #e6eaec);

  // 커서 임시적용
  cursor: pointer;
  // 호버 임시 적용
  &:hover {
    background: var(--function-mint-background, #f3fbfa);
  }
`;

const RowCell = styled.div<{ width: string; isFill?: boolean }>`
  height: 48px;
  display: flex;
  width: ${({ width }) => width};

  ${({ isFill = false }) => {
    return css`
      justify-content: ${isFill ? 'start' : 'center'};
      padding: ${isFill ? '0px 16px' : '0px'};
    `;
  }};

  align-items: center;
  gap: var(--radius-lg, 8px);
  flex: ${({ width }) => (width !== '100%' ? '0 1 auto' : '1 0 0')};
`;

export { TableRow, RowCell };
