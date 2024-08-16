import { ReactNode } from 'react';
import styled from '@emotion/styled';
import SeachCircleIcon from '../../assets/svg/ic_search_circle.svg?react';

interface TableBodyEmpty {
  children: ReactNode;
  isSearch?: boolean;
}

export function TableBodyEmpty({ isSearch = false, children }: Readonly<TableBodyEmpty>) {
  return (
    <TableBodyEmptyWrapper>
      {isSearch && <SeachCircleIcon width={'80px'} height={'80px'} />}
      {children}
    </TableBodyEmptyWrapper>
  );
}

const TableBodyEmptyWrapper = styled.div`
  display: flex;
  padding: 64px 0px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: var(--radius-xl, 16px);
  align-self: stretch;

  color: var(--gray-cool-300, #b4bfc8);
  ${(props) => props.theme.typography.B3_Body_16_SB}
`;
