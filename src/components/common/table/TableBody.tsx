import { ReactNode } from 'react';

import styled from '@emotion/styled';

interface TableBodyProps {
  children: ReactNode;
}

export default function TableBody({ children }: TableBodyProps) {
  return <TableBodyWrapper>{children}</TableBodyWrapper>;
}

const TableBodyWrapper = styled.tbody`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  align-self: stretch;

  color: var(--gray-cool-700, #4e5962);
  ${(props) => props.theme.typography.body2}
`;
