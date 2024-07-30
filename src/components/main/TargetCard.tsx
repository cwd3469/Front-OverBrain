import dayjs from 'dayjs';
import styled from '@emotion/styled';
import { AiOutlineClose } from 'react-icons/ai';

import { Target } from '@/types/main';
import { css } from '@emotion/react';

type Props = Target & {
  checked?: boolean;
  onDelete?: () => void;
  onSelect?: () => void;
  id?: string;
  width?: string;
};

const TargetCard = ({ title, contents, createdAt, endAt, startAt, onDelete, onSelect, width, checked }: Props) => {
  const dayFormat = (date?: Date) => (date ? dayjs(date).format('YYYY/MM/DD') : '----/--/--');

  return (
    <Card onClick={onSelect} checked={checked} pointer={Boolean(onSelect)} width={width}>
      <CardHead>
        <h3 className="title">{title}</h3>
        {onDelete && (
          <button onClick={onDelete}>
            <AiOutlineClose />
          </button>
        )}
      </CardHead>
      {contents && <CordContents value={contents} disabled />}
      <Item>
        <div className="th">생성 날짜 :</div>
        <p className="td">{dayFormat(createdAt)}</p>
      </Item>
      <Item>
        <div className="th">시작 날짜 :</div>
        <p className="td">{dayFormat(endAt)}</p>
      </Item>
      <Item>
        <div className="th">끝 날짜 :</div>
        <p className="td">{dayFormat(startAt)}</p>
      </Item>
    </Card>
  );
};

export default TargetCard;

const checkedColor = css`
  border: 2px solid var(--Function-MintDefault, #1abcb7);
`;

const CordContents = styled.textarea`
  border: none;
  resize: none;
  padding: 0px;
  &:disabled {
    background-color: ${(props) => props.theme.palette.white};
    ${(props) => props.theme.typography.B7_Body_14_M}
  }
`;

const Card = styled.div<{ checked?: boolean; pointer: boolean; width?: string }>`
  display: flex;
  flex-direction: column;
  gap: 8px;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 14px;
  width: ${(props) => props.width};
  ${(props) => (props.pointer ? 'cursor: pointer;' : '')} .title {
    ${(props) => props.theme.typography.B2_Body_16_B}
  }
  ${(props) => (props.checked ? checkedColor : '')}
`;

const CardHead = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Item = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  .th {
    ${(props) => props.theme.typography.L5_Label_14_M}
  }
  .td {
    ${(props) => props.theme.typography.B8_Body_14_R}
  }
`;
