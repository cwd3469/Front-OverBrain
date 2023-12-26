import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { OLayout, OTextField, OCard, OButton } from '@components/common/index';

type Inputs = {
  todo: string;
};

const MainPage = () => {
  const [todo, setTodo] = useState<string[]>([]);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const newTodo = data.todo;
    await setTodo((prev) => [...prev, newTodo]);
    reset();
  };

  return (
    <OLayout>
      <div className="flex flex-col gap-2">
        <form className="flex flex-col gap-2" onSubmit={handleSubmit(onSubmit)}>
          <OTextField {...register('todo')} />
          <OButton type="submit" size="small">
            저장
          </OButton>
        </form>
        {errors.todo && <span>This field is required</span>}
        {todo.map((item, index) => {
          return <OCard key={index}>{item}</OCard>;
        })}
      </div>
    </OLayout>
  );
};

export default MainPage;
