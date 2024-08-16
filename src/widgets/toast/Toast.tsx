import React, { useEffect } from 'react';
import styled from '@emotion/styled';

interface ToastProps {
  id: string;
  message: string;
  duration?: number;
  onClose: (id: string) => void;
}

const Toast: React.FC<ToastProps> = ({ id, message, duration = 3000, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => onClose(id), duration);
    return () => clearTimeout(timer);
  }, [id, duration, onClose]);

  return (
    <>
      <Mask />
      <MaskBody>
        <MaskBodyContent>{message}</MaskBodyContent>
      </MaskBody>
    </>
  );
};

export default Toast;

const Mask = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #000000b2;
`;

const MaskBody = styled.div`
  position: fixed;
  top: 20%;
  left: 50%;
  transform: translateX(-50%);
`;

const MaskBodyContent = styled.div`
  background-color: white;
  padding: 1rem;
  height: auto;
  width: 220px;
  border-radius: var(--RadiusLG, 8px);
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;
