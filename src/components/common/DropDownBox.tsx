import { forwardRef, useEffect, useRef, useState } from 'react';
import styled from '@emotion/styled';

import ic_brackets_sm from '@/assets/svg/ic_brackets_sm.svg';
import ic_brackets_disabled from '@/assets/svg/ic_brackets_disabled.svg';
import ic_brackets_lsm from '@/assets/svg/ic_brackets_lsm.svg';

import { css } from '@emotion/react';
import { IcRequireTypography } from './Typography';

export type OptionType = {
  id: string;
  value: string;
};

type FieldSize = { fieldSize?: 'lg' | 'md' | 'sm' };

type Props = FieldSize & {
  data: OptionType[];
  onSelectBox?: (item: OptionType) => void;
  selectValue?: OptionType;
  disabled?: boolean;
  label?: string;
  require?: boolean;
  width?: string;
  isUp?: boolean;
  mode?: 'chip' | 'select';
};

// TODO placeholder 필요 유무
export const DropDownBox = forwardRef<HTMLDivElement, Props>(
  ({ fieldSize, data, selectValue, onSelectBox, disabled, require, label, width, isUp, mode, ...props }, ref) => {
    const dropMenuRef = useRef<HTMLButtonElement | null>(null);
    const [isOpen, setDropMenuOpen] = useState<boolean>(false);
    const height = dropMenuRef.current?.offsetHeight;

    useEffect(() => {
      // eslint-disable-next-line
      const handleOutsideClose = (e: { target: any }) => {
        if (isOpen && dropMenuRef.current && !dropMenuRef.current.contains(e.target)) setDropMenuOpen(false);
      };
      document.addEventListener('click', handleOutsideClose);

      return () => document.removeEventListener('click', handleOutsideClose);
    }, [isOpen]);

    const onClickDown = () => setDropMenuOpen(true);

    return (
      <Container ref={ref} {...props} width={width}>
        <IcRequireTypography label={label} require={require} />
        <SelectBox onClick={onClickDown} ref={dropMenuRef} fieldSize={fieldSize} disabled={disabled} isOpen={isOpen}>
          {selectValue?.value}
        </SelectBox>
        {isOpen ? (
          <OptionContainer bottom={label && height ? height + 24 : height} isUp={isUp}>
            {data.map((el, index) => {
              return (
                <Option key={el.id + index} onClick={() => onSelectBox && onSelectBox(el)}>
                  {el.value}
                </Option>
              );
            })}
          </OptionContainer>
        ) : (
          <></>
        )}
      </Container>
    );
  },
);
DropDownBox.displayName = 'DropDownBox';

const SelectBox = styled('button')<FieldSize & { isOpen?: boolean }>`
  width: 100%;
  text-align: left;
  border-radius: var(--Radius_MD, 6px);
  border: 1px solid var(--gray-cool-300, #b4bfc8);
  background-color: var(--gray-true-white, #fff);
  padding: 12px 16px;
  position: relative;
  display: inline-block;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  padding-right: 40px;
  height: 44px;
  ${(props) => props.theme.typography.B2_Body_16_B}
  ${(props) =>
    props.fieldSize === 'md'
      ? css`
          padding: 10px 16px;
          height: 40px;
        `
      : props.fieldSize === 'sm'
      ? css`
          height: 32px;
          padding: 8px;
          font-size: 12px;
          line-height: 14px;
          padding-right: 30%;
          border-radius: var(--radius-sm, 4px);
          ::after {
            background-image: url(${ic_brackets_lsm});
          }
        `
      : ''}
  ${(props) =>
    props.isOpen
      ? css`
          ::after {
            transform: rotate(180deg);
          }
        `
      : ''}

:hover {
    border: 1px solid var(--gray-cool-600, #677683);
  }
  &:disabled {
    color: var(--gray-true-500, #b3b3b3);
    border: 1px solid var(--gray-true-200, #e1e1e1);
    background-color: var(--gray-true-025, #fbfbfb);
    ::after {
      background-image: url(${ic_brackets_disabled});
    }
  }

  ::after {
    content: '';
    width: 24px;
    height: 24px;
    background-image: url(${ic_brackets_sm});
    background-repeat: no-repeat;
    background-position: center;
    position: absolute;
    right: 8px;
    top: 50%;
    margin-top: -12px;
    transition: all ease 0.2s;
  }
`;

const Container = styled.div<{ width?: string }>`
  position: relative;
  display: flex;
  flex-direction: column;
  width: ${(props) => (props.width ? props.width : '100%')};
  gap: 4px;
`;

const OptionContainer = styled.div<{ bottom: number | undefined; isUp?: boolean }>`
  position: absolute;
  top: ${(props) => (props.isUp ? 'auto' : props.bottom ? props.bottom + 5 : 0)}px;
  left: 0px;
  width: 100%;
  border-radius: var(--RadiusMD, 6px);
  border: 1px solid var(--gray-cool-500, #8094a4);
  background: var(--gray-true-white, #fff);
  box-shadow: 0px 2px 4px 0px rgba(103, 118, 131, 0.2);
  max-height: 204px;
  overflow-y: scroll;
  z-index: 999;
  bottom: ${(props) => (props.isUp ? `${props.bottom ? props.bottom + 5 : 0}px` : 'auto')};
  ::-webkit-scrollbar {
    width: 7px;
  }
  ::-webkit-scrollbar-thumb {
    background-color: #999;
    border-radius: 10%;
    background-clip: padding-box;
    border: 2px solid transparent;
  }
  ::-webkit-scrollbar-track {
    border-radius: 10%;
    box-shadow: inset 0px 0px 5px white;
  }
`;

const Option = styled.div`
  display: flex;
  height: 40px;
  padding: 0px 16px;
  align-items: center;
  border-bottom: 1px solid var(--gray-cool-100, #e6eaec);
  background: var(--gray-true-white, #fff);
  cursor: pointer;
  color: var(--gray-cool-900, #1a1e20);
  ${(props) => props.theme.typography.B2_Body_16_B}
  &:hover {
    background-color: var(--Function-Blue_Background, #f6fbfe);
  }
`;

const LabelName = styled.label`
  font-size: 12px;
  line-height: 20px;
  font-weight: 700;
  color: var(--gray-cool-700, #4e5962);
`;
