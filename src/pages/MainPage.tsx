import { useForm, SubmitHandler } from 'react-hook-form';
import uuid from 'react-uuid';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { CoreTarget, DetailTarget, Target } from '@/types/main';
import OButton from '@components/common/button/OButton';
import OLayout from '@components/common/layout/OLayout';
import styled from '@emotion/styled';
import { useCallback, useState } from 'react';
import TargetCard from '@/components/main/TargetCard';

import TargetInputs from '@/components/main/TargetInputs';
import { useTheme } from '@emotion/react';

const CORE_TARGET_TITLE = '코어 목표를 입력해주세요.';
const CORE_INPUT_TITLE = '코어 목표를 입력해 주세요.';
const DETAIL_TARGET_TITLE = '상세 목표를 입력해주세요.';
const DETAIL_INPUT_TITLE = '상세 목표를 입력해주세요.';

const resetTarget = {
  title: '',
  contents: undefined,
  startAt: undefined,
  endAt: undefined,
  createdAt: undefined,
};

const coresSchema = yup.object({
  title: yup.string().required(CORE_TARGET_TITLE),
});
const detailSchema = yup.object({
  title: yup.string().required(DETAIL_TARGET_TITLE),
});

const MainPage = () => {
  const theme = useTheme();
  const [step, setStep] = useState<number>(1);
  const [target, setTarget] = useState<CoreTarget>();
  const [detailTarget, setDetailTarget] = useState<DetailTarget[]>([]);

  const firstTarget = useForm<Target>({
    mode: 'onChange',
    resolver: yupResolver(coresSchema),
    defaultValues: resetTarget,
  });
  const secondTarget = useForm<Target>({
    mode: 'onChange',
    resolver: yupResolver(detailSchema),
    defaultValues: resetTarget,
  });

  const handleDeleteDetailTarget = useCallback((id?: string) => {
    setDetailTarget((prev) => {
      const next = prev.filter((el) => el.id !== id);
      return next;
    });
  }, []);

  const handleSetCoreTarget: SubmitHandler<Target> = (core: Target) => {
    const id = uuid();
    setTarget({ ...core, detailList: [], id });
    setStep(2);
  };

  const handleSetDetailTarget: SubmitHandler<Target> = (param: Target) => {
    const id = uuid();
    setDetailTarget((prev) => {
      const detail: DetailTarget = { ...param, todoList: [], coreId: target?.id, id };
      return prev.length >= 10 ? prev : [detail, ...prev];
    });
    secondTarget.reset(resetTarget);
  };

  return (
    <OLayout width={step === 1 ? theme.screens.xsm : theme.screens.lg}>
      {step === 1 ? (
        <>
          <MainTypography>{CORE_INPUT_TITLE}</MainTypography>
          <MainPageSelect>
            <TargetInputs
              register={firstTarget.register}
              onKeyPress={firstTarget.handleSubmit(handleSetCoreTarget)}
              errors={firstTarget.formState.errors}
            />
            <OButton onClick={firstTarget.handleSubmit(handleSetCoreTarget)}>저장</OButton>
          </MainPageSelect>
        </>
      ) : step === 2 ? (
        <DetailSection>
          <DetailSectionColumn>
            <MainTypography>{DETAIL_INPUT_TITLE}</MainTypography>
            <TargetInputs
              register={secondTarget.register}
              onKeyPress={secondTarget.handleSubmit(handleSetDetailTarget)}
              errors={secondTarget.formState.errors}
            />
            <OButton onClick={secondTarget.handleSubmit(handleSetDetailTarget)}>추가</OButton>
          </DetailSectionColumn>
          <DetailSectionColumn>
            <MainTargetStyle>
              {target && (
                <TargetCard
                  title={target.title}
                  contents={target.contents}
                  startAt={target.startAt}
                  endAt={target.endAt}
                />
              )}
            </MainTargetStyle>
            {detailTarget.map((el, index) => {
              return (
                <TargetCard
                  title={el.title}
                  contents={el.contents}
                  startAt={el.startAt}
                  endAt={el.endAt}
                  key={el.id}
                  onDelete={() => handleDeleteDetailTarget(el.id)}
                />
              );
            })}
          </DetailSectionColumn>
        </DetailSection>
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

const DetailSection = styled.div`
  display: flex;
  flex-direction: row;
  align-items: start;
`;

const DetailSectionColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.theme.gap.xl};
  width: 50%;
  border-right: 1px solid ${(props) => props.theme.palette.gray[200]};
  height: 700px;
  overflow-y: scroll;
  padding: 0 ${(props) => props.theme.gap.xl} 0 0;
  :last-child {
    border-right: 0px;
    padding: 0 ${(props) => props.theme.gap.xl};
  }
`;

const MainTargetStyle = styled.div`
  padding-bottom: ${(props) => props.theme.gap.xl};
  border-bottom: 1px solid ${(props) => props.theme.palette.gray[200]};
`;
