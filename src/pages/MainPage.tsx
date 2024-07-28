import { useForm, SubmitHandler } from 'react-hook-form';
import uuid from 'react-uuid';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { CoreTarget, DetailTarget, Target, TodoTarget } from '@/types/main';
import OButton from '@components/common/button/OButton';
import OLayout from '@components/common/layout/OLayout';
import styled from '@emotion/styled';
import { useCallback, useState } from 'react';
import TargetCard from '@/components/main/TargetCard';

import TargetInputs from '@/components/main/TargetInputs';
import { useTheme } from '@emotion/react';
import dayjs from 'dayjs';
import { DefaultTextFiled } from '@/components/common/textFiled';

const CORE_TARGET_TITLE = '코어 목표를 입력해주세요.';
const CORE_INPUT_TITLE = '코어 목표를 입력해 주세요.';
const DETAIL_TARGET_TITLE = '상세 목표를 입력해주세요.';
const DETAIL_INPUT_TITLE = '상세 목표를 입력해주세요.';
const DETAIL_MAX_LENGTH = '상세 목표는 9개까지 추가 가능합니다.';

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
const todoSchema = yup.object({
  title: yup.string().required(DETAIL_TARGET_TITLE),
});

const MainPage = () => {
  const theme = useTheme();
  const [step, setStep] = useState<number>(1);
  const [coreTarget, setCoreTarget] = useState<CoreTarget>();
  const [detailTarget, setDetailTarget] = useState<DetailTarget[]>([]);
  const [todoTarget, setTodoTarget] = useState<DetailTarget>();

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
  const thirdTarget = useForm<Target>({
    mode: 'onChange',
    resolver: yupResolver(todoSchema),
    defaultValues: resetTarget,
  });

  /** 코어 등록 */
  const handleSetCoreTarget: SubmitHandler<Target> = (core: Target) => {
    const id = uuid();
    setCoreTarget({ ...core, detailList: [], id });
    setStep(2);
  };
  /** 디테일 등록 */
  const handleSetDetailTarget: SubmitHandler<Target> = (param: Target) => {
    if (!coreTarget) return;
    setDetailTarget((prev) => {
      if (prev.length > 8) {
        secondTarget.setError('title', { message: DETAIL_MAX_LENGTH });
        return prev;
      } else {
        const id = uuid();
        const next: DetailTarget[] = [{ ...param, todoList: [], coreId: coreTarget.id, id }, ...prev];
        return next;
      }
    });
    secondTarget.reset();
  };

  /** 디테일 삭제 */
  const handleDeleteDetailTarget = useCallback(
    (id?: string) => setDetailTarget((prev) => prev.filter((el) => el.id !== id)),
    [],
  );

  /** todo 이동 */
  const handleStepThree = () => setStep(3);

  /** todo 등록 */
  const handleSetTodoTarget: SubmitHandler<Target> = (param: Target) => {
    setTodoTarget((prev) => {
      if (!prev) return;
      const id = uuid();
      const todo: TodoTarget = { ...param, coreId: prev.coreId, detailId: prev.id, id };
      const next: DetailTarget = { ...prev, todoList: [...prev.todoList, todo] };
      return next;
    });

    thirdTarget.reset();
  };

  return (
    <OLayout width={theme.screens.lg}>
      {step === 1 ? (
        <MainPageSelect>
          <MainTypography>{CORE_INPUT_TITLE}</MainTypography>
          <TargetInputs
            register={firstTarget.register}
            onKeyPress={firstTarget.handleSubmit(handleSetCoreTarget)}
            errors={firstTarget.formState.errors}
          />
          <OButton onClick={firstTarget.handleSubmit(handleSetCoreTarget)}>저장</OButton>
        </MainPageSelect>
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
            <OButton onClick={handleStepThree}>다음으로</OButton>
          </DetailSectionColumn>
          <DetailSectionColumn>
            <MainTargetStyle>
              {coreTarget && (
                <TargetCard
                  title={coreTarget.title}
                  contents={coreTarget.contents}
                  startAt={coreTarget.startAt}
                  endAt={coreTarget.endAt}
                />
              )}
            </MainTargetStyle>
            {detailTarget.map((el) => {
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
        <DetailSection>
          <DetailSectionColumn>
            {detailTarget.map((el) => {
              return (
                <TargetCard
                  title={el.title}
                  contents={el.contents}
                  startAt={el.startAt}
                  endAt={el.endAt}
                  key={el.id}
                  checked={todoTarget?.id === el.id}
                  onDelete={() => handleDeleteDetailTarget(el.id)}
                  onSelect={() => setTodoTarget(el)}
                />
              );
            })}
          </DetailSectionColumn>
          <DetailSectionColumn>
            {todoTarget && (
              <TodoCard>
                <TargetCard {...todoTarget} />
                {todoTarget.todoList &&
                  todoTarget.todoList.map((el) => {
                    return <TodoListItem key={el.id}>{el.title}</TodoListItem>;
                  })}

                <DefaultTextFiled {...thirdTarget.register('title')} style={{ marginTop: 'auto' }} />
                <OButton onClick={thirdTarget.handleSubmit(handleSetTodoTarget)}>등록</OButton>
              </TodoCard>
            )}
          </DetailSectionColumn>
        </DetailSection>
      )}
    </OLayout>
  );
};

export default MainPage;

const MainPageSelect = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.theme.gap.xl};
`;

const MainTypography = styled.div`
  ${(props) => props.theme.typography.H1_Headline_32_B}
  text-align: center;
`;

const DetailSection = styled.div`
  display: flex;
  flex-direction: row;
  align-items: start;
`;

const DetailSectionColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.theme.gap.lg};
  width: 50%;
  border-right: 1px solid ${(props) => props.theme.palette.gray[200]};
  height: 700px;

  padding: 0 ${(props) => props.theme.gap.xl} 0 0;
  :last-child {
    border-right: 0px;
    padding: 0 ${(props) => props.theme.gap.xl};
  }
`;

const MainTargetStyle = styled.div`
  padding-bottom: ${(props) => props.theme.gap.lg};
  border-bottom: 1px solid ${(props) => props.theme.palette.gray[200]};
`;

const TodoCard = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const TodoCardHead = styled.div`
  ${(props) => props.theme.typography.B4_Body_16_M}
  padding: ${(props) => props.theme.gap.md};
  border-radius: ${(props) => props.theme.gap.sm};
`;

const TodoCardDate = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  .th {
    ${(props) => props.theme.typography.B7_Body_14_M}
    color:${(props) => props.theme.palette.gray[900]}
  }
  .tb {
    ${(props) => props.theme.typography.B8_Body_14_R}
    color:${(props) => props.theme.palette.gray[300]}
  }
`;

const TodoListItem = styled.div`
  ${(props) => props.theme.typography.T6_Title_16_B}
  padding: 4px 8px;
  border: 1px solid ${(props) => props.theme.palette.gray[300]};
  border-radius: ${(props) => props.theme.gap.md};
`;
