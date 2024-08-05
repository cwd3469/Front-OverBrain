import styled from '@emotion/styled';
import { GoTriangleUp } from 'react-icons/go';
import { useState } from 'react';
import { css } from '@emotion/css';

type Props = {
  children: JSX.Element;
  contents?: string;
};

const OPopper: React.FC<Props> = ({ children, contents }) => {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <PopperBox>
      <button onClick={() => setOpen((prev) => !prev)}>{children}</button>
      {open && (
        <PopperModal>
          <GoTriangleUp className={triangleUpStyle} color="#999" />
          <PopperContents>{contents}</PopperContents>
        </PopperModal>
      )}
    </PopperBox>
  );
};

export default OPopper;

const triangleUpStyle = css`
  position: absolute;
  top: -10px;
  left: 0px;
`;

const PopperBox = styled.div`
  position: relative;
`;

const PopperModal = styled.div`
  position: absolute;
  top: 23px;
  left: 0px;
  border: 1px solid #999;
  background-color: #fff;
  border-radius: 3px;
`;

const PopperContents = styled.div`
  white-space: pre-wrap;
  width: 250px;
  height: 70px;
  padding: 6px;
  overflow-y: scroll;
`;
