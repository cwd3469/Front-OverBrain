import styled from '@emotion/styled';
import { useEffect, useRef, useState } from 'react';
import { DefaultTextFiled } from './textFiled/DefaultTextFiled';

export type OptionType = {
  id: string;
  value: string;
};

type Props = {
  fieldSize?: 'lg' | 'mb' | 'sm';
  data?: OptionType[];
  onClick?: (item: OptionType) => void;
  value?: OptionType;
};
// 커밋 테스트
export const DropDownBox = ({ fieldSize, data, value, onClick }: Props) => {
  const dropMenuRef = useRef<HTMLInputElement | null>(null);
  const [select, setSelect] = useState<OptionType>();
  const [isDropMenuOpen, setDropMenuOpen] = useState<boolean>(false);

  const onClickDown = () => setDropMenuOpen(true);

  const handleClickOption = (item: OptionType) => {
    setSelect(item);
    onClick && onClick(item);
  };

  const selectValue = value ? value.value : select?.value;

  useEffect(() => {
    // eslint-disable-next-line
    const handleOutsideClose = (e: { target: any }) => {
      // useRef current에 담긴 엘리먼트 바깥을 클릭 시 드롭메뉴 닫힘
      if (isDropMenuOpen && dropMenuRef.current && !dropMenuRef.current.contains(e.target)) setDropMenuOpen(false);
    };
    document.addEventListener('click', handleOutsideClose);

    return () => document.removeEventListener('click', handleOutsideClose);
  }, [isDropMenuOpen]);

  return (
    <Container>
      <DefaultTextFiled readOnly fieldSize={fieldSize} onClick={onClickDown} ref={dropMenuRef} value={selectValue} />
      {isDropMenuOpen && data && data.length ? (
        <OptionContainer>
          <div>
            {data.map((el, index) => {
              return (
                <Option key={el.id + index} onClick={() => handleClickOption(el)}>
                  {el.value}
                </Option>
              );
            })}
          </div>
        </OptionContainer>
      ) : (
        <></>
      )}
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
`;

const OptionContainer = styled.div`
  position: absolute;
  top: 52px;
  left: 0px;
  width: 100%;
  border-radius: var(--RadiusMD, 6px);
  border: 1px solid var(--CoolGray-CoolGray500, #8094a4);
  background: var(--TrueGray-White, #fff);
  box-shadow: 0px 2px 4px 0px rgba(103, 118, 131, 0.2);
  height: 204px;
  overflow-y: scroll;
`;

const Option = styled.div`
  display: flex;
  height: 40px;
  padding: 0px 16px;
  align-items: center;
  border-bottom: 1px solid var(--CoolGray-CoolGray100, #e6eaec);
  background: var(--TrueGray-White, #fff);
  cursor: pointer;
  &:hover {
    background-color: var(--Function-Blue_Background, #f6fbfe);
  }
`;
