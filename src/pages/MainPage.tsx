import { useForm, SubmitHandler } from 'react-hook-form';
import { CoreTarget, DetailTarget, Target } from '@/types/main';
import OButton from '@components/common/button/OButton';
import OLayout from '@components/common/layout/OLayout';
import styled from '@emotion/styled';
import { useState } from 'react';
import TargetCard from '@/components/main/TargetCard';

import TargetInputs from '@/components/main/TargetInputs';
import { useTheme } from '@emotion/react';

const MainPage = () => {
  const theme = useTheme();
  const [step, setStep] = useState<number>(1);
  const [target, setTarget] = useState<CoreTarget>();
  const [detailTarget, setDetailTarget] = useState<DetailTarget[]>([]);

  const firstTarget = useForm<Target>();
  const secondTarget = useForm<Target>();

  const handleSetCoreTarget: SubmitHandler<Target> = (core: Target) => {
    setTarget({ ...core, detailList: [] });
    setStep(2);
  };

  const handleSetDetailTarget: SubmitHandler<Target> = (detail: Target) => {
    setDetailTarget((prev) => {
      return prev.length >= 10 ? prev : [{ ...detail, todoList: [], coreId: '' }, ...prev];
    });
    secondTarget.reset({
      title: '',
      contents: '',
      startAt: new Date(),
      endAt: new Date(),
      createdAt: new Date(),
    });
  };

  return (
    <OLayout width={step === 1 ? theme.screens.xsm : theme.screens.lg}>
      {step === 1 ? (
        <>
          <MainTypography>원하는 목표를 입력해 주세요.</MainTypography>
          <MainPageSelect>
            <TargetInputs register={firstTarget.register} />
            <OButton onClick={firstTarget.handleSubmit(handleSetCoreTarget)}>저장</OButton>
          </MainPageSelect>
        </>
      ) : step === 2 ? (
        target ? (
          <DetailSection>
            <DetailSectionColumn>
              <MainTypography>세부 목표를 입력해 주세요.</MainTypography>
              <TargetInputs register={secondTarget.register} />
              <OButton onClick={secondTarget.handleSubmit(handleSetDetailTarget)}>추가</OButton>
            </DetailSectionColumn>
            <DetailSectionColumn>
              <MainTargetStyle>
                <TargetCard
                  title={target.title}
                  contents={target.contents}
                  startAt={target.startAt}
                  endAt={target.endAt}
                />
              </MainTargetStyle>
              {detailTarget.map((el, index) => {
                return (
                  <TargetCard
                    title={el.title}
                    contents={el.contents}
                    startAt={el.startAt}
                    endAt={el.endAt}
                    key={index}
                  />
                );
              })}
            </DetailSectionColumn>
          </DetailSection>
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
