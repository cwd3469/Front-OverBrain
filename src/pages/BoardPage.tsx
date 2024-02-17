import useCurrentTarget from '@/stores/useCurrentTarget';
import TargetCard from '@components/main/TargetCard';

const BoardPage = () => {
  const { target, createTarget, deleteTarget } = useCurrentTarget();

  return (
    <>
      {target.map((item, index) => {
        return <TargetCard key={index} {...item} onDelete={deleteTarget} />;
      })}
    </>
  );
};

export default BoardPage;
