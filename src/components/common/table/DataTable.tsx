import { CSSProperties, ReactNode } from 'react';
import { TableHeader } from './TableHeader';
import { RowCell, TableRow } from './TableRow';
import { TableBodyEmpty } from './TableBodyEmpty';
import { faker } from '@faker-js/faker';
import PerfectScrollbar from 'react-perfect-scrollbar';
import styled from '@emotion/styled';
import { css } from '@emotion/css';
import { TableFooter } from './TableFooter';
import { OptionType } from '../DropDownBox';

export interface DataInfo<T extends object> {
  th: ReactNode;
  td: TBType<T>;
  width: string;
}

export interface RowInfo<T extends object> {
  onRowClick?: (data: Optional<T>) => void;
  style?: CSSProperties;
}

type TBType<T extends object> = string | ((data?: Optional<T>) => ReactNode);

type Optional<T> = {
  [K in keyof T]?: T[K];
};

export type DataTableProps<T extends object> = {
  dataInfo?: DataInfo<T>[];
  rowInfo?: RowInfo<T>;
  rowData: T[];
  isSearch?: boolean;
  viewSize?: number;
  nullText?: string;
  style?: React.CSSProperties;
  footer?: {
    total: number;
    limit: number;
    pageSize: OptionType;
    pageNumber: number;
    onPageSizeChange: (size: OptionType) => void;
    onPageNumberChange: (number: number) => void;
  };
};

function rowDataFn<T extends object>(obj: Optional<T>, dataInfo: DataInfo<T>[]) {
  const arr = Object.entries(obj);
  const formatData = dataInfo.map((item) => {
    const tbData = item.td;
    const width = item.width;

    if (typeof tbData === 'string') {
      const equalElement = arr.filter((el) => el[0] === tbData);
      const roqValue = equalElement.length ? equalElement[0][1] : '데이터 없음';
      return { row: `${roqValue}`, width };
    } else {
      const tbFunc = tbData as (data: Optional<T>) => ReactNode;
      const element = tbFunc(obj);
      return { row: element, width };
    }
  });
  return formatData;
}

const DataTable2 = <T extends object>(props: DataTableProps<T>) => {
  const { dataInfo, rowData, rowInfo, isSearch, viewSize, nullText, style, footer } = props;

  const rowList: Optional<T>[] = rowData;

  const tableViewSize = viewSize && rowList.length >= viewSize ? viewSize : undefined;

  if (!dataInfo) return <></>;

  return (
    <Table style={style}>
      <TableHeader rowStyle={{ ...rowInfo?.style }}>
        {dataInfo.map((item) => {
          const trId = faker.database.mongodbObjectId();
          return (
            <DataHeaderCell width={item.width} key={trId}>
              <>{item.th}</>
            </DataHeaderCell>
          );
        })}
      </TableHeader>
      {rowList.length ? (
        <PerfectScrollbar className={scrollStyle}>
          <TableBody viewSize={tableViewSize}>
            {rowList.map((row) => {
              const Data = rowDataFn(row, dataInfo);
              const id = faker.database.mongodbObjectId();

              return (
                <TableRow
                  key={`${id}`}
                  onRowClick={() => {
                    rowInfo && rowInfo?.onRowClick && rowInfo.onRowClick(row);
                  }}
                  style={{
                    cursor: rowInfo && rowInfo?.onRowClick ? 'pointer' : 'auto',
                    ...rowInfo?.style,
                  }}
                >
                  {Data.map((el) => {
                    const trId = faker.database.mongodbObjectId();
                    return (
                      <RowCell width={el.width} key={trId}>
                        <>{el.row}</>
                      </RowCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </PerfectScrollbar>
      ) : (
        <TableBodyEmpty isSearch={isSearch}>{nullText ? nullText : '데이터가 없습니다.'}</TableBodyEmpty>
      )}
      {footer && (
        <TableFooter
          total={footer.total}
          limit={footer.limit}
          pageNumber={footer.pageNumber}
          pageSize={footer.pageSize}
          onPageNumberChange={footer.onPageNumberChange}
          onPageSizeChange={footer.onPageSizeChange}
        />
      )}
    </Table>
  );
};

export default DataTable2;

const scrollStyle = css`
  width: 100%;
  .ps__rail-y {
    opacity: 0.6;
  }
`;

const Table = styled.div<{ otherHeight?: string }>`
  width: 100%;
  display: flex;
  flex-direction: column;
  background: var(--gray-true-white);
  min-height: 100px;
  margin-bottom: 4px;
`;

const DataHeaderCell = styled.div<{ width: string }>`
  display: flex;
  width: ${({ width }) => width};
  justify-content: center;
  align-items: center;
  gap: var(--radius-lg, 8px);
  height: 100%;
  padding: 10px 0;
`;

const TableBody = styled.div<{ viewSize?: number }>`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  align-self: stretch;
  max-height: ${(props) => (props.viewSize ? `${49 * props.viewSize}px` : 'auto')};
  color: var(--gray-cool-700, #4e5962);
  ${(props) => props.theme.typography.body2}
`;
