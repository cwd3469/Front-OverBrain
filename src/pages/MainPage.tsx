import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { OLayout, OTextField, OButton } from '@components/common/index';
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
    if (!contents || !title || !endAt || !startAt) return;
    const newTarget: Target = { id, title, contents, createdAt, startAt, endAt };
    await setTodo((prev) => [...prev, newTarget]);
    reset();
  };

  const onDeleteTarget = (id: string) => {
    setTodo((prev) => {
      const filter = prev.filter((el, idx) => el.id !== id);
      return filter;
    });
  };

  const handleStartPage = () => navigate('/board');

  return (
    <OLayout>
      <div className="flex items-center justify-center gap-3 ">
        <div className="flex flex-col w-full gap-2 sm:w-1/2 lg:w-1/3 xl:w-144">
          <form className="flex flex-col gap-2" onSubmit={handleSubmit(onSubmit)}>
            <OTextField {...register('title')} placeholder="목표를 작성해 주세요." />
            <OTextarea
              {...register('contents')}
              placeholder="구체적으로 작성해 주세요."
              style={{
                width: '100%',
                height: '20.25em',
                border: 'none',
                resize: 'none',
              }}
            />
            <OTextField {...register('startAt')} type="date" label="시작 날짜" />
            <OTextField {...register('endAt')} type="date" label="끝 날짜" />
            <OButton type="submit" size="small" variant="contained">
              저장
            </OButton>
          </form>
          {todo.length ? <OButton onClick={handleStartPage}>시작하기</OButton> : ''}
        </div>
        {todo.length ? (
          <div className="flex flex-col w-full gap-3 overflow-y-scroll sm:w-1/2 lg:w-1/3 xl:w-144 h-[600px] p-2 bg-slate-100">
            {todo.map((item, index) => {
              return <TargetCard key={index} {...item} onDelete={onDeleteTarget} />;
            })}
          </div>
        ) : (
          ''
        )}
      </div>
    </OLayout>
  );
};

export default MainPage;
