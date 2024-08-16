import { useForm, SubmitHandler } from 'react-hook-form';
import uuid from 'react-uuid';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { AiOutlineClose } from 'react-icons/ai';

import { CoreTarget, DetailTarget, Target, TodoTarget } from '@/types/main';
import OButton from '@components/common/button/OButton';
import styled from '@emotion/styled';
import { KeyboardEventHandler, useCallback, useEffect, useState } from 'react';
import TargetCard from '@/components/main/TargetCard';

import TargetInputs from '@/components/main/TargetInputs';

import { DefaultTextFiled } from '@/components/common/textFiled';
import { useSearchParams } from 'react-router-dom';
import dayjs from 'dayjs';
import { css } from '@emotion/css';
import { setLocalStorageCoreTargetValue } from '@/utils/function/localStorageUtils';
import useToast from '@/hooks/useToast';

const START_BTN_TITLE = '시작';
const ADD_BTN_TITLE = '추가';
const PREV_BTN_TITLE = '이전으로';
const NEXT_BTN_TITLE = '다음으로';
const START_FROM = '시작 :';
const END_TO = '끝 :';
const REGISTRATION_BTN = '등록';
const TUTORIALS_CLEAR_BTN = '튜토리얼 클리어';

const CORE_TARGET_TITLE = '코어 목표를 입력해주세요.';
const CORE_INPUT_TITLE = '코어 목표를 입력해 주세요.';
const DETAIL_TARGET_TITLE = '상세 목표를 입력해주세요.';
const DETAIL_INPUT_TITLE = '상세 목표를 입력해주세요.';
const DETAIL_MAX_LENGTH = '상세 목표는 9개까지 추가 가능합니다.';
const TODO_STEP_TITLE = '상세 목표를 이루기 위한 활동 혹은 태도를 입력해주세요.';
const TODO_MAX_LENGTH = '활동 갯수는 8개까지 추가 할수 있습니다.';

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

const TutorialsPage = () => {
  const { openToast } = useToast();
  const [scrollOff, setScrollOff] = useState<boolean>(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [coreTarget, setCoreTarget] = useState<CoreTarget>();
  const [todoTarget, setTodoTarget] = useState<DetailTarget>();

  const firstTarget = useForm<Target>({
    mode: 'all',
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

  const step = searchParams.get('step');

  const isFirstClear = !firstTarget.formState.isValid;

  const isClear = coreTarget && coreTarget.detailList.length >= 3 ? true : false;

  /** step 이동 */
  const handleStepOne = () => {
    searchParams.set('step', '1');
    setSearchParams(searchParams);
  };
  const handleStepTwo = () => {
    searchParams.set('step', '2');
    setSearchParams(searchParams);
  };
  const handleStepThree = () => {
    searchParams.set('step', '3');
    setSearchParams(searchParams);
    const firstDetail = coreTarget?.detailList[0];
    setTodoTarget(firstDetail);
  };

  /** step-1 코어 등록 */
  const handleSetCoreTarget = (core: Target) => {
    const id = uuid();
    const target: CoreTarget = { ...core, detailList: [], id };
    setCoreTarget(target);
    handleStepTwo();
  };

  /** step-1 코어 등록 Button Click*/
  const handleSetCoreTargetButtonClick: SubmitHandler<Target> = (core: Target) => {
    handleSetCoreTarget(core);
  };

  /** step-1 코어 등록 Key Enter */
  const handleSetCoreTargetKeyEnter: KeyboardEventHandler<HTMLInputElement> = async (e) => {
    if (e.key === 'Enter') {
      const core = await firstTarget.getValues();
      handleSetCoreTarget(core);
    }
  };

  /** step-2 디테일 등록 */
  const handleSetDetailTarget: SubmitHandler<Target> = (param: Target) => {
    setCoreTarget((prev) => {
      if (!prev) return;
      if (prev.detailList.length <= 8) {
        const id = uuid();
        const detailList: DetailTarget[] = [{ ...param, todoList: [], coreId: prev.id, id }, ...prev.detailList];
        const next: CoreTarget = { ...prev, detailList };
        secondTarget.reset();
        secondTarget.setValue('contents', '');
        return next;
      } else {
        secondTarget.setError('title', { message: DETAIL_MAX_LENGTH });
        return prev;
      }
    });
  };

  /** step-2 디테일 삭제 */
  const handleDeleteDetailTarget = useCallback(
    (id?: string) =>
      setCoreTarget((prev) => {
        if (!prev) return;
        const detailList = prev?.detailList.filter((el) => el.id !== id);
        const next: CoreTarget = { ...prev, detailList };
        return next;
      }),
    [],
  );

  /** step-3 todo 디테일 선택 */
  const handleDetailSelect = (params: DetailTarget) =>
    setTodoTarget((prev) => {
      if (prev) {
        setCoreTarget((item) => {
          if (!item) return;
          const detailList = item?.detailList.map((el) => (el.id === prev.id ? prev : el));
          const next: CoreTarget = { ...item, detailList };
          return next;
        });
      }

      return params;
    });
  /** step-3 todo 디테일 삭제 */
  const handleDeleteDetailTargetStep3 = (id?: string) => {
    setCoreTarget((prev) => {
      if (!prev) return;
      const detailList = prev?.detailList.filter((el) => el.id !== id);
      const next: CoreTarget = { ...prev, detailList };
      if (next.detailList.length === 0) {
        handleStepTwo();
      }
      return next;
    });
  };

  /** step-3 todo 등록 */
  const handleSetTodoTarget: SubmitHandler<Target> = (param: Target) => {
    setTodoTarget((prev) => {
      if (!prev) return;
      if (prev.todoList.length >= 8) {
        thirdTarget.setError('title', { message: TODO_MAX_LENGTH });
        return prev;
      }
      const id = uuid();
      const todo: TodoTarget = { ...param, coreId: prev.coreId, detailId: prev.id, id };
      const next: DetailTarget = { ...prev, todoList: [todo, ...prev.todoList] };
      thirdTarget.reset();
      return next;
    });
  };

  /** step-3 todo 삭제 */
  const handleDeleteTodo = (params: string) =>
    setTodoTarget((prev) => {
      if (!prev) return;
      const filter = prev?.todoList.filter((el) => el.id !== params);
      const next: DetailTarget = { ...prev, todoList: filter };
      return next;
    });

  const handleEndTutorials = () => coreTarget && setLocalStorageCoreTargetValue(coreTarget);

  useEffect(() => {
    searchParams.delete('step');
    setSearchParams(searchParams);
  }, []);

  return (
    <>
      {!step || step === '1' ? (
        <TutorialsPageSelect>
          <MainTypography>{CORE_INPUT_TITLE}</MainTypography>
          <MainTextFiled {...firstTarget.register('title')} onKeyDown={handleSetCoreTargetKeyEnter} />
          <OButton size="sm" onClick={firstTarget.handleSubmit(handleSetCoreTargetButtonClick)} disabled={isFirstClear}>
            {START_BTN_TITLE}
          </OButton>
        </TutorialsPageSelect>
      ) : step === '2' ? (
        <DetailSection>
          <MainTypography>{DETAIL_INPUT_TITLE}</MainTypography>
          {coreTarget && <TargetCard {...coreTarget} checked />}
          <ContainerMiddle scrollOff={scrollOff}>
            {coreTarget ? (
              <TargetCardContainer>
                {coreTarget.detailList.map((el) => {
                  return (
                    <TargetCard
                      {...el}
                      key={el.id}
                      onDelete={() => handleDeleteDetailTarget(el.id)}
                      width="30%"
                      isContentsOpen={(open) => setScrollOff(open)}
                    />
                  );
                })}
              </TargetCardContainer>
            ) : (
              ''
            )}
          </ContainerMiddle>
          <ContainerBottom>
            <TargetInputs register={secondTarget.register} errors={secondTarget.formState.errors} />
            <OButton onClick={secondTarget.handleSubmit(handleSetDetailTarget)} size="sm">
              {ADD_BTN_TITLE}
            </OButton>
            <PageAction>
              <OButton onClick={handleStepOne} variant="outlined" palette="black" size="sm">
                {PREV_BTN_TITLE}
              </OButton>
              <OButton onClick={handleStepThree} disabled={!isClear} className={clearBtnStyle} size="sm">
                {NEXT_BTN_TITLE}
              </OButton>
            </PageAction>
          </ContainerBottom>
        </DetailSection>
      ) : step === '3' ? (
        <DetailSection>
          <MainTypography>{TODO_STEP_TITLE}</MainTypography>
          <ContainerTop>
            <DetailCardContainer>
              {coreTarget ? (
                <TargetCardContainer>
                  {coreTarget.detailList.map((el) => {
                    return (
                      <TargetCard
                        {...el}
                        key={el.id}
                        width="30%"
                        onDelete={() => handleDeleteDetailTargetStep3(el.id)}
                        onSelect={() => handleDetailSelect(el)}
                        checked={todoTarget?.id === el.id}
                      />
                    );
                  })}
                </TargetCardContainer>
              ) : (
                ''
              )}
            </DetailCardContainer>
          </ContainerTop>
          {todoTarget && (
            <>
              <ContainerMiddle scrollOff={scrollOff}>
                <TargetCard {...todoTarget} checked />
              </ContainerMiddle>
              <ContainerBottom>
                <TodoListContainer>
                  {todoTarget.todoList.map((el) => {
                    return (
                      <TodoListItem key={el.id}>
                        <TodoListItemTitle>{el.title}</TodoListItemTitle>
                        <TodoCardDate>
                          <span className="th">{START_FROM}</span>
                          <span className="tb">
                            {el.startAt ? dayjs(el.startAt).format('YYYY/MM/DD') : '----/--/--'}
                          </span>
                        </TodoCardDate>
                        <TodoCardDate>
                          <span className="th">{END_TO}</span>
                          <span className="tb">{el.endAt ? dayjs(el.endAt).format('YYYY/MM/DD') : '----/--/--'}</span>
                        </TodoCardDate>
                        <button onClick={() => handleDeleteTodo(el.id)}>
                          <AiOutlineClose />
                        </button>
                      </TodoListItem>
                    );
                  })}
                </TodoListContainer>
                <TodoInputBox>
                  <DefaultTextFiled {...thirdTarget.register('title')} />
                  <OButton onClick={thirdTarget.handleSubmit(handleSetTodoTarget)} size="sm">
                    {REGISTRATION_BTN}
                  </OButton>
                </TodoInputBox>
              </ContainerBottom>
            </>
          )}
          <PageAction>
            <OButton onClick={handleStepTwo} palette="black" size="sm" variant="outlined">
              {PREV_BTN_TITLE}
            </OButton>
            <OButton disabled={!isClear} className={clearBtnStyle} size="sm" onClick={handleEndTutorials}>
              {TUTORIALS_CLEAR_BTN}
            </OButton>
          </PageAction>
        </DetailSection>
      ) : (
        <></>
      )}
    </>
  );
};

export default TutorialsPage;

const clearBtnStyle = css`
  width: 50%;
`;

const TutorialsPageSelect = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: ${(props) => props.theme.gap.xl};
`;

const MainTypography = styled.div`
  ${(props) => props.theme.typography.H1_Headline_32_B}
  text-align: center;
  width: 100%;
`;

const MainTextFiled = styled(DefaultTextFiled)`
  width: calc(100% - 120px);
  height: 60px;
  ${(props) => props.theme.typography.B1_Body_18_R}
`;

const TargetCardContainer = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 16px;
  .item {
    flex: 0 0 auto;
  }
`;

const ContainerTop = styled.div`
  padding-top: 16px;
  padding-bottom: 16px;
  height: 158px;
`;

const ContainerMiddle = styled.div<{ scrollOff: boolean }>`
  padding: 16px 16px 0;
  border: 1px solid ${(props) => props.theme.palette.gray[200]};
  overflow-x: ${(props) => (!props.scrollOff ? 'auto' : 'clip')};
  ${(props) => (!props.scrollOff ? '' : 'padding-bottom: 5px')};
  min-height: 168px;
  /* custom scrollbar */
  ::-webkit-scrollbar {
    width: 5px;
  }

  ::-webkit-scrollbar-track {
    background-color: transparent;
  }

  ::-webkit-scrollbar-thumb {
    background-color: #d6dee1;
    border-radius: 20px;
    border: 6px solid transparent;
    background-clip: content-box;
  }

  ::-webkit-scrollbar-thumb:hover {
    background-color: #a8bbbf;
  }
`;
const ContainerBottom = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 16px;
`;

const DetailCardContainer = styled.div``;

const DetailSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 16px;
`;

const TodoListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 12px 8px;
  height: 190px;
  overflow-y: scroll;
  border: 1px solid ${(props) => props.theme.palette.gray[300]};
  border-radius: 4px;
`;

const TodoListItem = styled.div`
  padding: 12px 8px;
  border: 1px solid ${(props) => props.theme.palette.gray[300]};
  border-radius: ${(props) => props.theme.gap.md};
  display: flex;
  flex-direction: row;
  justify-content: end;
  gap: 10px;
`;

const TodoListItemTitle = styled.p`
  ${(props) => props.theme.typography.B7_Body_14_M}
  margin-right: auto;
`;

const TodoCardDate = styled.p`
  .th {
    ${(props) => props.theme.typography.B7_Body_14_M}
    color:${(props) => props.theme.palette.gray[900]}
  }
  .tb {
    ${(props) => props.theme.typography.B8_Body_14_R}
    color:${(props) => props.theme.palette.gray[600]}
  }
`;

const OPageButton = styled.button`
  padding: 12px 16px;
  border: 1px solid #999;
  text-align: center;
  border-radius: 6px;
  cursor: pointer;
  width: 49%;
`;

const PageAction = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 10px;
  ${(props) => props.theme.typography.B9_Body_12_M}
`;

const TodoInputBox = styled.div`
  display: flex;
  flex-direction: row;
  padding: 20px 0;
  width: 100%;
  gap: 10px;
  /* align-items: ; */
`;
