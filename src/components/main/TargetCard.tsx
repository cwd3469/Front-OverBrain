import { Target } from '@/types/main';
import { OCard } from '@components/common';
import OTextarea from '@components/common/OTextarea';
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
      <div className="flex flex-col gap-2">
        <div className="flex justify-between">
          <p className="text-xl font-bold">{title}</p>
          <button className="w-4 h-4 text-xs bg-slate-200" onClick={onDeleteBtn}>
            X
          </button>
        </div>
        <div className="p-2 rounded-lg bg-slate-200">
          <OTextarea
            value={contents}
            disabled
            style={{
              width: '100%',
              height: '6.25em',
              border: 'none',
              resize: 'none',
            }}
          />
        </div>
        <div className="flex flex-col">
          <div className="flex flex-row justify-between">
            <div>생성 날짜 :</div>
            <p className="text-base">{createdDate}</p>
          </div>
          <div className="flex flex-row justify-between">
            <div>시작 날짜 :</div>
            <p className="text-base">{startDate}</p>
          </div>
          <div className="flex flex-row justify-between">
            <div>끝 날짜 :</div>
            <p className="text-base">{endDate}</p>
          </div>
        </div>
        {modifyDate && <p className="text-base">{modifyDate}</p>}
      </div>
    </OCard>
  );
};

export default TargetCard;
