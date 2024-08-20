import { Target } from '@/app/interface/target';
import { LabelTextField, MultiLineTextField } from '../../shared/uiKit/textFiled';
import { FieldErrors, UseFormRegister } from 'react-hook-form';
import styled from '@emotion/styled';

import { inputMessage } from '@/shared/contextMsg';

type Props = { register: UseFormRegister<Target>; errors: FieldErrors<Target> };

const TargetInputs = ({ register, errors }: Props) => {
  return (
    <InputSection>
      <LabelTextField
        {...register('title')}
        placeholder="목표를 작성해 주세요."
        message={inputMessage(errors, 'title')}
        label="목표"
        style={{ padding: '13px 16px' }}
        maxLength={35}
      />
      <MultiLineTextFiledBox>
        <MultiLineTextFiledLabel>설명</MultiLineTextFiledLabel>
        <MultiLineTextField
          {...register('contents')}
          placeholder="구체적으로 작성해 주세요."
          maxLength={50}
          height="60px"
        />
      </MultiLineTextFiledBox>
      <SubContentsBox>
        <InputBox>
          <LabelTextField {...register('startAt')} type="date" label="시작 날짜" fieldSize="sm" />
        </InputBox>
        <InputBox>
          <LabelTextField {...register('endAt')} type="date" label="끝 날짜" fieldSize="sm" />
        </InputBox>
      </SubContentsBox>
    </InputSection>
  );
};

export default TargetInputs;

const InputBox = styled.div`
  width: 50%;
`;

const InputSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const SubContentsBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: stretch;
  gap: 16px;
`;

const MultiLineTextFiledLabel = styled.label`
  font-size: 12px;
  line-height: 20px;
  font-weight: 700;
  color: var(--CoolGray-CoolGray700, #4e5962);
`;

const MultiLineTextFiledBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  align-items: flex-start;
`;
