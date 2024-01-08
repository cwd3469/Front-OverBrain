import React, { useState } from 'react';
import OButton from '@components/common/OButton';
import OLayout from '@components/common/layout/OLayout';
import { DefaultTextFiled } from '@components/common/textFiled';
import { useForm, SubmitHandler } from 'react-hook-form';

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
    console.log(watch('userID'));
  };
  return (
    <OLayout>
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DefaultTextFiled {...register('userID', { required: true })} />
          <DefaultTextFiled {...register('pw', { required: true })} type="password" />
          <OButton type="submit">로그인</OButton>
        </form>
      </div>
    </OLayout>
  );
};

export default SigninPage;
