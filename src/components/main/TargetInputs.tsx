import { Target } from '@/types/main';
import { LabelTextFiled, MultiLineTextFiled } from '../common/textFiled';
import { FieldErrors, UseFormRegister } from 'react-hook-form';
import styled from '@emotion/styled';

import { inputMessage } from '@/utils/contextMsg';

type Props = { register: UseFormRegister<Target>; errors: FieldErrors<Target> };

const TargetInputs = ({ register, errors }: Props) => {
  return (
    <InputSection>
      <ContentsBox>
        <LabelTextFiled
          {...register('title')}
          placeholder="목표를 작성해 주세요."
          message={inputMessage(errors, 'title')}
          label="목표"
          style={{ padding: '13px 16px' }}
        />
        <MultiLineTextFiledBox>
          <MultiLineTextFiledLabel>설명</MultiLineTextFiledLabel>
          <MultiLineTextFiled {...register('contents')} placeholder="구체적으로 작성해 주세요." maxLength={500} />
        </MultiLineTextFiledBox>
      </ContentsBox>
      <SubContentsBox>
        <LabelTextFiled {...register('startAt')} type="date" label="시작 날짜" />
        <LabelTextFiled {...register('endAt')} type="date" label="끝 날짜" />
      </SubContentsBox>
    </InputSection>
  );
};

export default TargetInputs;

const InputSection = styled.div`
  display: flex;
  flex-direction: row;
  align-items: start;
  gap: var(--RadiusXL, 16px);
`;

const ContentsBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 70%;
`;

const SubContentsBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 25%;
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
