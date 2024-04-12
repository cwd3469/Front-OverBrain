import { Target } from '@/types/main';
import OCard from '@components/common/OCard';
import { MultiLineTextField } from '@components/common/textFiled';
import dayjs from 'dayjs';
type Props = Target & {
  onDelete: (id: string) => void;
};

const TargetCard = ({ title, contents, createdAt, endAt, startAt, modifyAt, onDelete, id }: Props) => {
  const dayFormat = (date: Date) => {
    const formatting = 'YYYY-MM-DD';
    return dayjs(date).format(formatting);
  };
  const createdDate = dayFormat(createdAt);
  const endDate = dayFormat(endAt);
  const startDate = dayFormat(startAt);
  const modifyDate = modifyAt && dayFormat(modifyAt);
  const onDeleteBtn = () => onDelete(id);
  return (
    <OCard>
      <button onClick={onDeleteBtn}>X</button>
      <MultiLineTextField
        value={contents}
        disabled
        style={{
          width: '100%',
          height: '6.25em',
          border: 'none',
          resize: 'none',
        }}
      />
      <div>
        <div>
          <div>생성 날짜 :</div>
          <p>{createdDate}</p>
        </div>
        <div>
          <div>시작 날짜 :</div>
          <p>{startDate}</p>
        </div>
        <div>
          <div>끝 날짜 :</div>
          <p>{endDate}</p>
        </div>
      </div>
      {modifyDate && <p>{modifyDate}</p>}
    </OCard>
  );
};

export default TargetCard;
