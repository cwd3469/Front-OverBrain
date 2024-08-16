import styled from '@emotion/styled';
import { GoTriangleUp, GoTriangleDown } from 'react-icons/go';

import { useRef, useState } from 'react';

type Props = {
  children: JSX.Element;
  contents?: string;
  width?: string;
  isOpen?: (open: boolean) => void;
};

const MASK_Z_INDEX = '900';
const MODAL_Z_INDEX = '901';
const BUTTON_Z_INDEX = '901';

const OPopper: React.FC<Props> = ({ children, contents, isOpen }) => {
  const [open, setOpen] = useState<boolean>(false);
  const anchorRef = useRef<HTMLButtonElement>(null);

  const handleToggle = () =>
    setOpen((prev) => {
      const next = !prev;
      isOpen && isOpen(next);
      return next;
    });

  return (
    <PopperBox>
      <PopperButton open={open} onClick={handleToggle} ref={anchorRef}>
        <TypographyBody3BtnTitle>{children}</TypographyBody3BtnTitle>
        {!open ? <GoTriangleUp /> : <GoTriangleDown />}
      </PopperButton>
      {open && <Mask onClick={handleToggle} />}
      {open && (
        <PopperModal top={anchorRef.current?.offsetHeight}>
          <PopperContents>{contents}</PopperContents>
        </PopperModal>
      )}
    </PopperBox>
  );
};

export default OPopper;

const PopperBox = styled.div`
  position: relative;
`;

const PopperModal = styled.div<{ top?: number }>`
  position: absolute;
  top: ${(props) => props.top ?? '0'}px;
  left: 0px;
  border: 1px solid #999;
  background-color: #fff;
  border-radius: 3px;
  padding: 8px;
  z-index: ${MODAL_Z_INDEX};
`;

const PopperContents = styled.div`
  white-space: pre-wrap;
  width: 250px;
  height: 70px;
  padding: 6px;
  overflow-y: scroll;
`;

const Mask = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  background-color: #000000b2;
  opacity: 0;
  z-index: ${MASK_Z_INDEX};
  width: 100%;
  height: 100%;
`;

const PopperButton = styled.button<{ open: boolean }>`
  display: flex;
  align-items: center;
  gap: 6px;
  position: relative;
  ${(props) => (props.open ? `z-index: ${BUTTON_Z_INDEX}` : '')};
  &:hover {
    p {
      text-decoration: underline;
    }
  }
`;

const TypographyBody3BtnTitle = styled.p`
  ${(props) => props.theme.typography.B3_Body_16_SB}
`;
