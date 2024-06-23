import { Target } from '@/types/main';
import { MultiLineTextFiled } from '@components/common/textFiled';
import styled from '@emotion/styled';
import dayjs from 'dayjs';
type Props = Target & {
  onDelete?: (id: string) => void;
  id?: string;
};

const TargetCard = ({ title, contents, createdAt, endAt, startAt, onDelete, id }: Props) => {
  const dayFormat = (date: Date) => dayjs(date).format('YYYY-MM-DD');
  const onDeleteBtn = onDelete && id ? () => onDelete(id) : undefined;

  return (
    <Card>
      <h3 className="title">{title}</h3>
      {onDeleteBtn ? <button onClick={onDeleteBtn}>X</button> : ''}
      <MultiLineTextFiled value={contents} disabled height="100px" />
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

const Card = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 14px;
  .title {
    ${(props) => props.theme.typography.B2_Body_16_B}
  }
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
