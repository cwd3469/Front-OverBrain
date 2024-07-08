import dayjs from 'dayjs';
import styled from '@emotion/styled';
import { AiOutlineClose } from 'react-icons/ai';

import { Target } from '@/types/main';
import { MultiLineTextFiled } from '@components/common/textFiled';
import { css } from '@emotion/react';

type Props = Target & {
  checked?: boolean;
  onDelete?: () => void;
  onSelect?: () => void;
  id?: string;
};

const TargetCard = ({ title, contents, createdAt, endAt, startAt, onDelete, onSelect, checked }: Props) => {
  const dayFormat = (date: Date) => dayjs(date).format('YYYY-MM-DD');

  return (
    <Card onClick={onSelect} checked={checked} pointer={Boolean(onSelect)}>
      <CardHead>
        <h3 className="title">{title}</h3>
        {onDelete && (
          <button onClick={onDelete}>
            <AiOutlineClose />
          </button>
        )}
      </CardHead>
      {contents && <MultiLineTextFiled value={contents} disabled height="80px" padding="8px" />}
      {createdAt && (
        <Item>
          <div className="th">생성 날짜 :</div>
          <p className="td">{dayFormat(createdAt)}</p>
        </Item>
      )}
      {endAt && (
        <Item>
          <div className="th">시작 날짜 :</div>
          <p className="td">{dayFormat(endAt)}</p>
        </Item>
      )}

      {startAt && (
        <Item>
          <div className="th">끝 날짜 :</div>
          <p className="td">{dayFormat(startAt)}</p>
        </Item>
      )}
    </Card>
  );
};

export default TargetCard;

const checkedColor = css`
  background-color: red;
`;

const Card = styled.div<{ checked?: boolean; pointer: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 8px;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 14px;
  ${(props) => (props.pointer ? 'cursor: pointer;' : '')}
  .title {
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
