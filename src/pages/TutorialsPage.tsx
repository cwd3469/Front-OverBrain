import { useForm, SubmitHandler } from 'react-hook-form';
import uuid from 'react-uuid';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import Slider from 'react-slick';
import { AiOutlineClose } from 'react-icons/ai';

import { CoreTarget, DetailTarget, Target, TodoTarget } from '@/types/main';
import OButton from '@components/common/button/OButton';
import styled from '@emotion/styled';
import { useCallback, useEffect, useMemo, useState } from 'react';
import TargetCard from '@/components/main/TargetCard';

import TargetInputs from '@/components/main/TargetInputs';
import { useTheme } from '@emotion/react';

import { DefaultTextFiled } from '@/components/common/textFiled';
import { useNavigate, useSearchParams } from 'react-router-dom';
import dayjs from 'dayjs';
import { css } from '@emotion/css';
import { hasLocalStorageCoreTargetValue, setLocalStorageCoreTargetValue } from '@/utils/function/localStorageUtils';
import useToast from '@/hooks/useToast';

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

const settings = {
  dots: true,
  infinite: false,
  speed: 100,
  slidesToScroll: 1,
  slidesToShow: 3.5,
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
  };

  /** 코어 등록 */
  const handleSetCoreTarget: SubmitHandler<Target> = (core: Target) => {
    const id = uuid();
    const target = { ...core, detailList: [], id };
    setCoreTarget((prev) => {
      const next = prev ? { ...prev, core } : target;
      return next;
    });
    handleStepTwo();
  };

  /** 디테일 등록 */
  const handleSetDetailTarget: SubmitHandler<Target> = (param: Target) => {
    setCoreTarget((prev) => {
      if (!prev) return;
      if (prev.detailList.length <= 8) {
        const id = uuid();
        const detailList: DetailTarget[] = [{ ...param, todoList: [], coreId: prev.id, id }, ...prev.detailList];
        const next: CoreTarget = { ...prev, detailList };
        secondTarget.reset();
        return next;
      } else {
        secondTarget.setError('title', { message: DETAIL_MAX_LENGTH });
        return prev;
      }
    });
  };

  /** 디테일 삭제 */
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

  /** todo 디테일 선택 */
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

  /** todo 등록 */
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

  /** todo 삭제 */
  const handleDeleteTodo = (params: string) =>
    setTodoTarget((prev) => {
      if (!prev) return;
      const filter = prev?.todoList.filter((el) => el.id !== params);
      const next: DetailTarget = { ...prev, todoList: filter };
      return next;
    });

  useEffect(() => {
    if (coreTarget) setLocalStorageCoreTargetValue(coreTarget);
  }, [coreTarget]);

  useEffect(() => {
    const value = hasLocalStorageCoreTargetValue();
    if (value) {
      setCoreTarget(value);
      firstTarget.setValue('title', value.title);
    } else {
      searchParams.set('step', '1');
      setSearchParams(searchParams);
    }
  }, []);

  return (
    <>
      <OButton
        onClick={() => {
          openToast('안녕', 2000);
        }}
      >
        버튼
      </OButton>
      {!step || step === '1' ? (
        <TutorialsPageSelect>
          <MainTypography>{CORE_INPUT_TITLE}</MainTypography>
          <MainTextFiled {...firstTarget.register('title')} />
          <OButton size="sm" onClick={firstTarget.handleSubmit(handleSetCoreTarget)} disabled={isFirstClear}>
            시작
          </OButton>
        </TutorialsPageSelect>
      ) : step === '2' ? (
        <DetailSection>
          <MainTypography>{DETAIL_INPUT_TITLE}</MainTypography>
          <DetailSectionColumn>
            {coreTarget && <TargetCard {...coreTarget} />}
            <DetailCardContainer>
              {coreTarget ? (
                coreTarget.detailList.length > 3 ? (
                  <Slider {...settings}>
                    {coreTarget.detailList.map((el) => {
                      return (
                        <TargetCard {...el} key={el.id} onDelete={() => handleDeleteDetailTarget(el.id)} width="90%" />
                      );
                    })}
                  </Slider>
                ) : (
                  <CordBox>
                    {coreTarget.detailList.map((el) => {
                      return (
                        <TargetCard {...el} key={el.id} onDelete={() => handleDeleteDetailTarget(el.id)} width="30%" />
                      );
                    })}
                  </CordBox>
                )
              ) : (
                ''
              )}
            </DetailCardContainer>
          </DetailSectionColumn>
          <DetailSectionColumn>
            <TargetInputs register={secondTarget.register} errors={secondTarget.formState.errors} />
            <OButton onClick={secondTarget.handleSubmit(handleSetDetailTarget)} size="sm">
              추가
            </OButton>
            <PageAction>
              <OButton onClick={handleStepOne} variant="outlined" palette="black" size="sm">
                이전으로
              </OButton>
              <OButton onClick={handleStepThree} disabled={!isClear} className={clearBtnStyle} size="sm">
                다음으로
              </OButton>
            </PageAction>
          </DetailSectionColumn>
        </DetailSection>
      ) : (
        <DetailSection>
          <MainTypography>{TODO_STEP_TITLE}</MainTypography>
          <DetailSectionColumn>
            <DetailCardContainer>
              {coreTarget ? (
                coreTarget.detailList.length > 3 ? (
                  <Slider {...settings}>
                    {coreTarget.detailList.map((el) => {
                      return (
                        <TargetCard
                          {...el}
                          key={el.id}
                          width="90%"
                          onDelete={() => handleDeleteDetailTarget(el.id)}
                          onSelect={() => handleDetailSelect(el)}
                          checked={todoTarget?.id === el.id}
                        />
                      );
                    })}
                  </Slider>
                ) : (
                  <CordBox>
                    {coreTarget.detailList.map((el) => {
                      return (
                        <TargetCard
                          {...el}
                          key={el.id}
                          width="30%"
                          onDelete={() => handleDeleteDetailTarget(el.id)}
                          onSelect={() => handleDetailSelect(el)}
                          checked={todoTarget?.id === el.id}
                        />
                      );
                    })}
                  </CordBox>
                )
              ) : (
                ''
              )}
            </DetailCardContainer>
          </DetailSectionColumn>
          {todoTarget && (
            <>
              <TargetCard {...todoTarget} />
              <TodoListContainer>
                {todoTarget.todoList.map((el) => {
                  return (
                    <TodoListItem key={el.id}>
                      <TodoListItemTitle>{el.title}</TodoListItemTitle>
                      <TodoCardDate>
                        <span className="th">시작 : </span>
                        <span className="tb">{el.startAt ? dayjs(el.startAt).format('YYYY/MM/DD') : '----/--/--'}</span>
                      </TodoCardDate>
                      <TodoCardDate>
                        <span className="th">끝 : </span>
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
                  등록
                </OButton>
              </TodoInputBox>
            </>
          )}

          <DetailSectionColumn>
            <PageAction>
              <OButton onClick={handleStepTwo} palette="black" size="sm" variant="outlined">
                이전으로
              </OButton>
              <OButton disabled={!isClear} className={clearBtnStyle} size="sm">
                튜토리얼 클리어
              </OButton>
            </PageAction>
          </DetailSectionColumn>
        </DetailSection>
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

const CordBox = styled.div`
  display: flex;
  flex-direction: row;
  gap: 16px;
  align-items: start;
`;

const DetailCardContainer = styled.div`
  padding: 16px 0 30px;
  min-height: 140px;
  border-top: 1px solid ${(props) => props.theme.palette.gray[200]};
  border-bottom: 1px solid ${(props) => props.theme.palette.gray[200]};
`;

const DetailSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 16px;
`;

const DetailSectionColumn = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
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
