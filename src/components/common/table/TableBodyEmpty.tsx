import SeachCircleIcon from '../../assets/svg/ic_search_circle.svg?react';

import styled from '@emotion/styled';

interface TableBodyEmpty {
  isSearch: boolean;
}

const EMPTY_ACCOUNT_LIST = '등록된 계정이 없습니다.';
const EMPTY_SEACTH_RESULT_LIST = '검색 결과가 없습니다.';

export function TableBodyEmpty({ isSearch }: TableBodyEmpty) {
  return (
    <TableBodyEmptyWrapper>
      {isSearch && <SeachCircleIcon width={'80px'} height={'80px'} />}
      <Label>{isSearch ? EMPTY_SEACTH_RESULT_LIST : EMPTY_ACCOUNT_LIST}</Label>
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
`;

const Label = styled.label`
  color: var(--gray-cool-300, #b4bfc8);
  ${(props) => props.theme.typography.h3}
`;
