import { Target } from '@/types/main';
import dayjs from 'dayjs';
import styled from '@emotion/styled';
import { AiOutlineClose } from 'react-icons/ai';

import OPopper from '../common/button/OPopper';

type Props = Target & {
  checked?: boolean;
  onDelete?: () => void;
  onSelect?: () => void;
  id?: string;
  width?: string;
  isContentsOpen?: (open: boolean) => void;
};

const TargetCard: React.FC<Props> = ({
  title,
  contents,
  endAt,
  startAt,
  onDelete,
  onSelect,
  isContentsOpen,
  width,
  checked,
}) => {
  const dayFormat = (date?: Date) => (date ? dayjs(date).format('YYYY/MM/DD') : 'YYYY/MM/DD');

  return (
    <Card onClick={onSelect} checked={checked} pointer={Boolean(onSelect)} width={width} className="item">
      <CardHead>
        <DateSection>
          <DateTag>
            <label className="th">시작: </label>
            <span className="td">{dayFormat(startAt)}</span>
          </DateTag>
          <DateTag>
            <label className="th">끝: </label>
            <span className="td">{dayFormat(endAt)}</span>
          </DateTag>
        </DateSection>
        {onDelete && (
          <button onClick={onDelete}>
            <AiOutlineClose />
          </button>
        )}
      </CardHead>
      <TypographyH4Tile>{title}</TypographyH4Tile>

      {contents && (
        <OPopper contents={contents} isOpen={isContentsOpen}>
          <>{'........'}</>
        </OPopper>
      )}
    </Card>
  );
};

export default TargetCard;

const Card = styled.div<{ checked?: boolean; pointer: boolean; width?: string }>`
  display: flex;
  flex-direction: column;
  gap: 4px;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 12px;
  width: ${(props) => props.width};
  ${(props) => (props.pointer ? 'cursor: pointer;' : '')} .title {
    ${(props) => props.theme.typography.B2_Body_16_B}
  }
  ${(props) => (props.checked ? 'border: 1px solid var(--Function-MintDefault, #1abcb7);' : '')}
`;

const CardHead = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const DateTag = styled.p`
  color: #2a2a2a;
  .th {
    ${(props) => props.theme.typography.L6_Label_12_M}
  }
  .td {
    ${(props) => props.theme.typography.B10_Body_12_R}
  }
`;

const DateSection = styled.div`
  display: flex;
  justify-content: flex-start;
  gap: 10px;
`;

const TypographyH4Tile = styled.h4`
  ${(props) => props.theme.typography.B6_Body_14_SB}
  word-break: keep-all;
`;
