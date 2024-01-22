import { ReactNode } from 'react';
import Table from './Table';
import TableBody from './TableBody';
import { HeaderCell, TableHeader } from './TableHeader';
import { RowCell, TableRow } from './TableRow';
import { TableBodyEmpty } from './TableBodyEmpty';

export interface DataInfo<T extends object> {
  th: string;
  td: TBType<T>;
  width: string;
}

type TBType<T extends object> = string | ((data?: Optional<T>) => ReactNode);

type Optional<T> = {
  [K in keyof T]?: T[K];
};

type Props<T extends object> = {
  dataInfo: DataInfo<T>[];
  rowData: T[];
  isSearch: boolean;
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

const DataTable = <T extends object>(props: Props<T>) => {
  const { dataInfo, rowData, isSearch } = props;
  const rowList: Optional<T>[] = rowData;

  return (
    <Table>
      <TableHeader>
        {dataInfo.map((item, index) => {
          return (
            <HeaderCell width={item.width} key={index}>
              <>{item.th}</>
            </HeaderCell>
          );
        })}
      </TableHeader>
      <TableBody>
        {rowList.length ? (
          rowList.map((row, index) => {
            const Data = rowDataFn(row, dataInfo);
            return (
              <TableRow key={'-' + index}>
                {Data.map((el, idx) => {
                  return (
                    <RowCell width={el.width} key={`${index}-${idx}`}>
                      <>{el.row}</>
                    </RowCell>
                  );
                })}
              </TableRow>
            );
          })
        ) : (
          <TableBodyEmpty isSearch={isSearch} />
        )}
      </TableBody>
    </Table>
  );
};

export default DataTable;
