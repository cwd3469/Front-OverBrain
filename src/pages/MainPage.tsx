import { useForm, SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Target } from '@/types/main';
import useCurrentTarget from '@/stores/useCurrentTarget';
import { MultiLineTextFiled, LabelTextFiled } from '@components/common/textFiled';
import OButton from '@components/common/button/OButton';
import OLayout from '@components/common/layout/OLayout';
import styled from '@emotion/styled';
import { useState } from 'react';
import TargetCard from '@/components/main/TargetCard';

const MainPage = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<number>(1);
  const [target, setTarget] = useState<Target>();
  const { register, handleSubmit } = useForm<Target>();

  const onSubmit: SubmitHandler<Target> = ({ title, contents, startAt, endAt }: Target) => {
    setTarget({ title, contents, startAt, endAt, id: 'firstId' });
    setStep(2);
  };

  return (
    <OLayout width="480px">
      {step === 1 ? (
        <>
          <MainTypography>원하는 목표를 입력해 주세요.</MainTypography>
          <MainPageSelect>
            <LabelTextFiled {...register('title')} placeholder="목표를 작성해 주세요." />
            <MultiLineTextFiled {...register('contents')} placeholder="구체적으로 작성해 주세요." />
            <LabelTextFiled {...register('startAt')} type="date" label="시작 날짜" />
            <LabelTextFiled {...register('endAt')} type="date" label="끝 날짜" />
            <OButton onClick={handleSubmit(onSubmit)}>저장</OButton>
          </MainPageSelect>
        </>
      ) : step === 2 ? (
        target ? (
          <>
            <TargetCard
              id={target.id}
              title={target.title}
              contents={target.contents}
              startAt={target.startAt}
              endAt={target.endAt}
            />
          </>
        ) : (
          <></>
        )
      ) : (
        <></>
      )}
    </OLayout>
  );
};

export default MainPage;

const MainPageSelect = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--RadiusXL, 16px);
`;

const MainTypography = styled.div`
  ${(props) => props.theme.typography.H1_Headline_32_B}
`;
