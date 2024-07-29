import { Target } from '@/types/main';
import { LabelTextFiled, MultiLineTextFiled } from '../common/textFiled';
import { FieldErrors, UseFormRegister } from 'react-hook-form';
import styled from '@emotion/styled';

import { inputMessage } from '@/utils/contextMsg';

type Props = { register: UseFormRegister<Target>; errors: FieldErrors<Target> };

const TargetInputs = ({ register, errors }: Props) => {
  return (
    <InputSection>
      <LabelTextFiled
        {...register('title')}
        placeholder="목표를 작성해 주세요."
        message={inputMessage(errors, 'title')}
      />
      <MultiLineTextFiled {...register('contents')} placeholder="구체적으로 작성해 주세요." maxLength={500} />
      <LabelTextFiled {...register('startAt')} type="date" label="시작 날짜" />
      <LabelTextFiled {...register('endAt')} type="date" label="끝 날짜" />
    </InputSection>
  );
};

export default TargetInputs;

const InputSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--RadiusXL, 16px);
`;
