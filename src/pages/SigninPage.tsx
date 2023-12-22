import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { OLayout, OTextField, OCard, OButton } from '@components/common/index';

type Inputs = {
  userID: string;
  pw: string;
};

const SigninPage = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data);
  };
  return (
    <OLayout>
      <div className="flex flex-col gap-2">
        <form onSubmit={handleSubmit(onSubmit)}>
          <OTextField {...register('userID', { required: true })} />
          <OTextField {...register('pw', { required: true })} type="password" />
          <OButton type="submit" size="small">
            로그인
          </OButton>
        </form>
      </div>
      {JSON.stringify(watch)}
    </OLayout>
  );
};

export default SigninPage;
