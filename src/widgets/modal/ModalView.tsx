import { type ModalInfo } from '@/app/interface/modal';
import styled from '@emotion/styled';
import OButton from '../common/button/OButton';
import { ReactNode, useEffect } from 'react';
import ReactDOM from 'react-dom';

type ModalBodyContentType = {
  width?: string;
};

type Props = ModalInfo & {
  onClose: () => void;
};

const ModalPortal = ({ children }: { children: ReactNode }) => {
  const el = document.getElementById('modal');
  const component = el as Element;
  return ReactDOM.createPortal(children, component);
};

export const ModalView = ({ header, body, width, leftBtn, rightBtn, type, onClose }: Props) => {
  useEffect(() => {
    if (type === 'alarm') {
      if (leftBtn || rightBtn) {
        throw new Error('Modal Type "alarm"에서는 leftBtn , rightBtn data를 사용할 수 없습니다.');
      }
    } else if (type === 'alert') {
      if (rightBtn) {
        throw new Error('Modal Type "alert"에서는 rightBtn data를 사용할 수 없습니다.');
      }
    } else if (type === 'confirm') {
      if (!leftBtn) {
        throw new Error('Modal Type "confirm"에서는 leftBtn data가 필수 값입니다.');
      }
    }
  }, []);

  return (
    <ModalPortal>
      <Mask onClick={onClose} />
      <MaskBody>
        <MaskBodyContent width={width}>
          {typeof header === 'string' ? <ModalHeader>{header}</ModalHeader> : header}
          {typeof body === 'string' ? <ModalBody>{body}</ModalBody> : body}
          <ModalFooter>
            {type === 'alert' && (
              <OButton
                onClick={leftBtn?.onClick ? leftBtn?.onClick : onClose}
                disabled={leftBtn?.disabled}
                size={leftBtn?.btnInfo?.size ?? 'sm'}
                palette={leftBtn?.btnInfo?.palette ?? 'primary'}
                variant={leftBtn?.btnInfo?.variant ?? 'contained'}
              >
                {leftBtn?.title ? leftBtn.title : '확인'}
              </OButton>
            )}
            {type === 'confirm' && (
              <>
                <OButton
                  onClick={leftBtn?.onClick ? leftBtn?.onClick : onClose}
                  disabled={leftBtn?.disabled}
                  size={leftBtn?.btnInfo?.size ?? 'sm'}
                  palette={leftBtn?.btnInfo?.palette ?? 'primary'}
                  variant={leftBtn?.btnInfo?.variant ?? 'contained'}
                >
                  {leftBtn?.title ? leftBtn.title : '확인'}
                </OButton>
                <OButton
                  onClick={rightBtn?.onClick ? rightBtn.onClick : onClose}
                  disabled={rightBtn?.disabled}
                  size={rightBtn?.btnInfo?.size ?? 'sm'}
                  palette={rightBtn?.btnInfo?.palette ?? 'primary'}
                  variant={rightBtn?.btnInfo?.variant ?? 'outlined'}
                >
                  {rightBtn?.title ? rightBtn?.title : '취소'}
                </OButton>
              </>
            )}
          </ModalFooter>
        </MaskBodyContent>
      </MaskBody>
    </ModalPortal>
  );
};

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
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const MaskBodyContent = styled.div<ModalBodyContentType>`
  background-color: white;
  padding: 1rem;
  height: auto;
  width: ${(props: ModalBodyContentType) => (props.width ? props.width : '320px')};
  border-radius: var(--RadiusLG, 8px);
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const ModalHeader = styled.div`
  color: var(--TrueGray-Gray800, #484848);
  text-align: center;
  font-size: 16px;
  font-weight: 700;
  line-height: 24px; /* 150% */
`;

const ModalBody = styled.div`
  min-height: 192px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  white-space: pre-wrap;
  color: var(--TrueGray-Gray900, #242424);
  text-align: center;
  /* Body1 */
  ${(props) => props.theme.typography.B5_Body_16_R}
`;

const ModalFooter = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: var(--RadiusLG, 8px);
  align-self: stretch;
`;
