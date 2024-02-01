import styled from '@emotion/styled';

import { TablePagination } from './TablePagination';
import { DropDownBox, OptionType } from '../DropDownBox';

interface TableFooterProps {
  total: number;
  limit: number;
  pageSize: OptionType;
  pageNumber: number;
  onPageSizeChange: (size: OptionType) => void;
  onPageNumberChange: (number: number) => void;
}

export function TableFooter({
  total,
  limit,
  pageSize,
  pageNumber,
  onPageSizeChange,
  onPageNumberChange,
}: TableFooterProps) {
  const handlePageSizeSelect = (size: OptionType) => {
    onPageSizeChange(size);
  };

  const handlePageNumberSelect = (number: number) => {
    onPageNumberChange(number);
  };
  return (
    <FooterWrapper>
      <AbsoluteWrapper>
        <DropDownBox
          fieldSize="sm"
          data={PAGE_SIZE}
          onSelectBox={handlePageSizeSelect}
          selectValue={pageSize}
          width="80px"
          isUp
        />
      </AbsoluteWrapper>

      <TablePagination page={pageNumber} limit={limit} total={total} onChangePage={handlePageNumberSelect} />
    </FooterWrapper>
  );
}

const AbsoluteWrapper = styled.div`
  position: absolute;
  left: 24px;
`;

const FooterWrapper = styled.div`
  display: flex;
  height: 72px;
  padding: 20px 24px 20px 24px;
  align-items: flex-start;
  justify-content: center;
  width: 100%;
  position: relative;
`;

const PAGE_SIZE: Array<OptionType> = [
  { id: '20', value: '20개' },
  { id: '50', value: '50개' },
  { id: '100', value: '100개' },
];
