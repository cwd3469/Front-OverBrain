import { useForm, SubmitHandler } from 'react-hook-form';
import uuid from 'react-uuid';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import Slider from 'react-slick';

import { CoreTarget, DetailTarget, Target, TodoTarget } from '@/types/main';
import OButton from '@components/common/button/OButton';
import OLayout from '@components/common/layout/OLayout';
import styled from '@emotion/styled';
import { useCallback, useState } from 'react';
import TargetCard from '@/components/main/TargetCard';

import TargetInputs from '@/components/main/TargetInputs';
import { useTheme } from '@emotion/react';

import { DefaultTextFiled } from '@/components/common/textFiled';
import { useNavigate, useSearchParams } from 'react-router-dom';

const CORE_TARGET_TITLE = '코어 목표를 입력해주세요.';
const CORE_INPUT_TITLE = '코어 목표를 입력해 주세요.';
const DETAIL_TARGET_TITLE = '상세 목표를 입력해주세요.';
const DETAIL_INPUT_TITLE = '상세 목표를 입력해주세요.';
const DETAIL_MAX_LENGTH = '상세 목표는 9개까지 추가 가능합니다.';

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
  const theme = useTheme();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [coreTarget, setCoreTarget] = useState<CoreTarget>();
  const [detailTarget, setDetailTarget] = useState<DetailTarget[]>([]);
  const [todoTarget, setTodoTarget] = useState<DetailTarget>();

  const firstTarget = useForm<Target>({
    mode: 'onChange',
    resolver: yupResolver(coresSchema),
  });
  const secondTarget = useForm<Target>({
    mode: 'onChange',
    resolver: yupResolver(detailSchema),
  });
  const thirdTarget = useForm<Target>({
    mode: 'onChange',
    resolver: yupResolver(todoSchema),
  });

  const step = searchParams.get('step');

  const settings = {
    dots: true,
    infinite: false,
    speed: 100,
    slidesToScroll: 1,
    slidesToShow: 3.5,
  };

  /** 코어 등록 */
  const handleSetCoreTarget: SubmitHandler<Target> = (core: Target) => {
    const id = uuid();
    setCoreTarget({ ...core, detailList: [], id });
    navigate('/tutorials?step=2');
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
  const handleStepOne = () => navigate('/tutorials?step=1');
  const handleStepThree = () => navigate('/tutorials?step=3');

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
      {!step || step === '1' ? (
        <TutorialsPageSelect>
          <MainTypography>{CORE_INPUT_TITLE}</MainTypography>
          <MainTextFiled {...firstTarget.register('title')} />
          <MainOButton
            onClick={firstTarget.handleSubmit(handleSetCoreTarget)}
            disabled={!firstTarget.formState.isValid}
          >
            시작
          </MainOButton>
        </TutorialsPageSelect>
      ) : step === '2' ? (
        <DetailSection>
          <MainTypography>{DETAIL_INPUT_TITLE}</MainTypography>
          <DetailSectionColumn>
            <MainTargetStyle>{coreTarget && <TargetCard {...coreTarget} />}</MainTargetStyle>
            <DetailCardContainer>
              {detailTarget.length > 3 ? (
                <Slider {...settings}>
                  {detailTarget.map((el) => {
                    return (
                      <TargetCard {...el} key={el.id} onDelete={() => handleDeleteDetailTarget(el.id)} width="90%" />
                    );
                  })}
                </Slider>
              ) : (
                <CordBox>
                  {detailTarget.map((el) => {
                    return (
                      <TargetCard {...el} key={el.id} onDelete={() => handleDeleteDetailTarget(el.id)} width="30%" />
                    );
                  })}
                </CordBox>
              )}
            </DetailCardContainer>
          </DetailSectionColumn>
          <DetailSectionColumn>
            <TargetInputs register={secondTarget.register} errors={secondTarget.formState.errors} />
            <OButton onClick={secondTarget.handleSubmit(handleSetDetailTarget)}>추가</OButton>
            <PageAction>
              <OPageButton onClick={handleStepOne}>이전으로</OPageButton>
              <OPageButton onClick={handleStepThree}>다음으로</OPageButton>
            </PageAction>
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

export default TutorialsPage;

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

const MainOButton = styled(OButton)`
  ${(props) => props.theme.typography.B4_Body_16_M}
`;

const CordBox = styled.div`
  display: flex;
  flex-direction: row;
  gap: 16px;
  align-items: start;
`;

const DetailCardContainer = styled.div`
  padding: 30px 0;
`;

const DetailSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
`;

const DetailSectionColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.theme.gap.lg};
  width: 100%;
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

const OPageButton = styled.div`
  padding: 12px 16px;
  border: 1px solid #999;
  text-align: center;
  border-radius: 6px;
  width: 49%;
`;

const PageAction = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 10px;
  ${(props) => props.theme.typography.B9_Body_12_M}
  cursor: pointer;
`;
