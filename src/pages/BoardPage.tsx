import useCurrentTarget from '@/controllers/useCurrentTarget';
import { OLayout } from '@components/common';
import TargetCard from '@components/main/TargetCard';

const BoardPage = () => {
  const { target, createTarget, deleteTarget } = useCurrentTarget();

  return (
    <OLayout>
      <div className="flex justify-between gap-2">
        <div className="w-1/3 bg-slate-700 h-32" />
        <div className="w-1/3 h-32 bg-slate-700" />
        <div className="w-1/3 h-32 bg-slate-700" />
      </div>
      {target.map((item, index) => {
        return <TargetCard key={index} {...item} onDelete={deleteTarget} />;
      })}
    </OLayout>
  );
};

export default BoardPage;
