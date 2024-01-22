import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import { css } from '@emotion/react';

import PagePrev from '../../assets/svg/Page_prev.svg?react';
import PageStart from '../../assets/svg/Page_start.svg?react';
import PageNext from '../../assets/svg/Page_next.svg?react';
import PageEnd from '../../assets/svg/Page_end.svg?react';

interface TablePaginationProps {
  page: number;
  total: number;
  limit: number;
  onChangePage: (page: number) => void;
}

//TODO (1) icon button disabled 조건
export function TablePagination(props: TablePaginationProps) {
  const [buttons, setButtons] = useState<Array<number>>([]);
  const index = getIndex(props.page, props.limit);
  const group = getGroup(props.page, props.limit);

  useEffect(() => {
    const newButtons = makeButtons({ group: group, total: props.total, limit: props.limit });
    setButtons(newButtons);
  }, [group]);

  // 첫페이지로 이동
  const handlePageStartClick = () => {
    props.onChangePage(0);
  };

  //이전 그룹 마지막 페이지로 이동
  const handlePagePrevClick = () => {
    const prevGroupLast = (group - 1) * props.limit + props.limit - 1;
    if (prevGroupLast >= 0) {
      props.onChangePage(prevGroupLast);
    }
  };

  // 다음 그룹으로 첫 페이지 이동
  const handlePageNextClick = () => {
    const nextGroupFirstPage = (group + 1) * props.limit;
    if (nextGroupFirstPage < props.total) {
      props.onChangePage(nextGroupFirstPage);
    }
  };

  // 마지막 페이지로 이동
  const handlePageEndClick = () => {
    if (props.total > 1) {
      props.onChangePage(props.total - 1);
    }
  };

  // 선택한 페이지로 이동
  const handlePageClick = (clickedPage: number) => {
    // 동일한 인덱스를 클릭하는 경우 제외
    if (clickedPage !== props.page) {
      props.onChangePage(clickedPage);
    }
  };

  return (
    <Center>
      <TablePaginationWrapper>
        <PageButton onClick={handlePageStartClick} disabled={group === 0}>
          <PageStart width={'8px'} height={'8px'} />
        </PageButton>
        <PageButton onClick={handlePagePrevClick}>
          <PagePrev width={'8px'} height={'8px'} />
        </PageButton>
        {buttons.length !== 0 ? (
          buttons.map((page) => {
            return (
              <PageButton
                key={page}
                isSelected={getIndex(page, props.limit) === index}
                onClick={() => handlePageClick(page)}
              >
                {page + 1}
              </PageButton>
            );
          })
        ) : (
          <PageButton disabled>{1}</PageButton>
        )}
        <PageButton onClick={handlePageNextClick}>
          <PageNext width={'8px'} height={'8px'} />
        </PageButton>
        <PageButton onClick={handlePageEndClick}>
          <PageEnd width={'8px'} height={'8px'} />
        </PageButton>
      </TablePaginationWrapper>
    </Center>
  );
}

const getIndex = (page: number, limit: number) => {
  return page % limit;
};

const getGroup = (page: number, limit: number) => {
  return Math.floor(page / limit);
};

const Center = styled.div`
  display: flex;
  width: 100%;
  // 가운데 정렬 후 드롭박스's width(80px) 적용
  padding-right: 80px;
  justify-content: center;
`;

const TablePaginationWrapper = styled.ul`
  display: flex;
  height: 32px;
  padding: 1px;
  align-items: center;

  border-radius: var(--radius-sm, 4px);
  border: 1px solid var(--gray-cool-100, #e6eaec);
  background: var(--gray-true-white, #fff);
`;

const PageButton = styled.button<{ isSelected?: boolean }>`
  cursor: pointer;
  display: flex;
  height: 30px;
  min-width: 30px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 8px;

  text-align: center;
  ${(props) => props.theme.typography.body3}

  ${({ isSelected = false }) => {
    return css`
      color: ${isSelected ? 'var(--gray-true-white, #FFF)' : 'var(--gray-cool-400, #9aa9b7)'};
      background-color: ${isSelected ? 'var(--gray-cool-800, #2D3E4F)' : 'var(--gray-true-white, #FFF)'};
    `;
  }}

  border-right: 1px solid var(--gray-cool-050, #f3f5f7);
  &:last-of-type {
    border-right: none;
  }

  &:disabled {
    cursor: default;
  }
`;

interface PageProps {
  group: number;
  total: number;
  limit: number;
}

function makeButtons(props: PageProps): Array<number> {
  const buttons: Array<number> = [];
  const startPage = props.group * props.limit;
  let endPage = (props.group + 1) * props.limit;

  // 끝 페이지인 경우
  if (endPage > props.total) {
    endPage = props.total;
  }

  for (let i = startPage; i < endPage; i++) {
    buttons.push(i);
  }

  return buttons;
}
