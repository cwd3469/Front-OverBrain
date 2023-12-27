import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { OLayout, OTextField, OCard, OButton } from '@components/common/index';
import { useNavigate } from 'react-router-dom';
import { Target } from '@/types/main';
import OTextarea from '@components/common/OTextarea';
import TargetCard from '@components/main/TargetCard';

const newID = () => {
  return Math.random().toString(36).substr(2, 16);
};

const MainPage = () => {
  const [todo, setTodo] = useState<Target[]>([]);
  const navigate = useNavigate();
  const { register, handleSubmit, reset } = useForm<Target>();

  const onSubmit: SubmitHandler<Target> = async ({ title, contents, startAt, endAt }: Target) => {
    const createdAt = new Date();
    const id = newID();
    if (!contents || !title) return;
    const newTarget: Target = {
      id,
      title,
      contents,
      createdAt,
      startAt,
      endAt,
    };

    await setTodo((prev) => [...prev, newTarget]);
    reset();
  };

  const handleStartPage = () => {
    navigate('/main');
  };

  return (
    <OLayout>
      <div className="flex justify-center">
        <div className="flex flex-col w-full gap-2 sm:w-1/2 lg:w-1/3 xl:w-144">
          {todo.map((item, index) => {
            return <TargetCard key={index} {...item} onDelete={(id) => console.log(item)} />;
          })}
          <form className="flex flex-col gap-2" onSubmit={handleSubmit(onSubmit)}>
            <OTextField {...register('title')} placeholder="목표를 작성해 주세요." />
            <OTextarea {...register('contents')} placeholder="구체적으로 작성해 주세요." />
            <OTextField {...register('startAt')} type="date" label="시작 날짜" />
            <OTextField {...register('endAt')} type="date" label="끝 날짜" />
            <OButton type="submit" size="small">
              저장
            </OButton>
          </form>
          {todo.length ? (
            <OButton palette="success" onClick={handleStartPage}>
              시작하기
            </OButton>
          ) : (
            ''
          )}
        </div>
      </div>
    </OLayout>
  );
};

export default MainPage;
