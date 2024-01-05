import { useForm, SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Target } from '@/types/main';
import TargetCard from '@components/main/TargetCard';
import useCurrentTarget from '@/controllers/useCurrentTarget';
import { MultiLineTextFiled, LabelTextFiled } from '@components/common/textFiled';
import OButton from '@components/common/OButton';
import OLayout from '@components/common/OLayout';

const MainPage = () => {
  const navigate = useNavigate();
  const { target, createTarget, deleteTarget } = useCurrentTarget();
  const { register, handleSubmit, reset } = useForm<Target>();

  const onSubmit: SubmitHandler<Target> = async ({ title, contents, startAt, endAt }: Target) => {
    await createTarget({ title, contents, startAt, endAt });
    reset();
  };
  const onDelete = (id: string) => deleteTarget(id);

  const handleStartPage = () => navigate('/board');

  return (
    <OLayout>
      <form onSubmit={handleSubmit(onSubmit)}>
        <LabelTextFiled {...register('title')} placeholder="목표를 작성해 주세요." />
        <MultiLineTextFiled
          {...register('contents')}
          placeholder="구체적으로 작성해 주세요."
          style={{
            width: '100%',
            height: '20.25em',
            border: 'none',
            resize: 'none',
          }}
        />
        <LabelTextFiled {...register('startAt')} type="date" label="시작 날짜" />
        <LabelTextFiled {...register('endAt')} type="date" label="끝 날짜" />
        <OButton type="submit">저장</OButton>
      </form>
      {target.map((item, index) => {
        return <TargetCard key={index} {...item} onDelete={onDelete} />;
      })}
    </OLayout>
  );
};

export default MainPage;
