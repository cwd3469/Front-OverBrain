import { useForm, SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Target } from '@/types/main';
import TargetCard from '@components/main/TargetCard';
import useCurrentTarget from '@/components/stores/useCurrentTarget';
import { MultiLineTextFiled, LabelTextFiled } from '@components/common/textFiled';
import OButton from '@components/common/button/OButton';
import OLayout from '@components/common/layout/OLayout';
import styled from '@emotion/styled';
import { useEffect } from 'react';

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

  useEffect(() => {
    console.log(target);
  }, [target]);

  return (
    <OLayout>
      <MainTypography>원하는 목표를 입력해 주세요.</MainTypography>
      <MainContainer>
        <form onSubmit={handleSubmit(onSubmit)}>
          <MainPageSelect>
            <LabelTextFiled {...register('title')} placeholder="목표를 작성해 주세요." />
            <MultiLineTextFiled {...register('contents')} placeholder="구체적으로 작성해 주세요." />
            <LabelTextFiled {...register('startAt')} type="date" label="시작 날짜" />
            <LabelTextFiled {...register('endAt')} type="date" label="끝 날짜" />
            <OButton type="submit">저장</OButton>
          </MainPageSelect>
        </form>
        {target.map((item, index) => {
          return <TargetCard key={index} {...item} onDelete={onDelete} />;
        })}
      </MainContainer>
    </OLayout>
  );
};

export default MainPage;

const MainContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const MainPageSelect = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--RadiusXL, 16px);
`;

const MainTypography = styled.div`
  ${(props) => props.theme.typography.H1_Headline_32_B}
`;
