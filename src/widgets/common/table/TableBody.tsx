import styled from '@emotion/styled';

interface TableBodyProps {
  viewSize?: number;
}

const TableBody = styled.div<TableBodyProps>`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  align-self: stretch;
  max-height: ${(props) => (props.viewSize ? `${49 * props.viewSize}px` : 'auto')};
  color: var(--gray-cool-700, #4e5962);
  ${(props) => props.theme.typography.B2_Body_16_B}
`;
export default TableBody;
