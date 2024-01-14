import { type ModalInfo, type ModalViewType } from '@/interface/modal';
import styled from '@emotion/styled';

type ModalBodyContentType = {
  width?: string;
};

type ModalLayoutType = {
  type?: ModalViewType;
};

type ModalFooterBtnType = {
  bgColor?: string;
};

type Props = ModalInfo &
  ModalBodyContentType & {
    onClose: () => void;
  };

export const ModalView = ({ type, header, footer, body, width, onClose }: Props) => {
  return (
    <>
      <Mask onClick={onClose} />
      <MaskBody>
        <MaskBodyContent width={width}>
          <ModalHeader type={type}>{header}</ModalHeader>
          <ModalBody>{body}</ModalBody>
          {type !== 'alarm' && (
            <ModalFooter type={type}>
              <ModalFooterBtn
                onClick={footer?.confirm.onClick ? footer?.confirm.onClick : onClose}
                bgColor={footer?.confirm.bgColor}
                disabled={footer?.confirm.disabled}
              >
                {footer?.confirm.title ? footer?.confirm.title : '확인'}
              </ModalFooterBtn>
              {type === 'confirm' || type === 'left-head' ? (
                <ModalFooterCloseBtn
                  onClick={footer?.close?.onClick ? footer?.close?.onClick : onClose}
                  bgColor={footer?.close?.bgColor}
                  disabled={footer?.close?.disabled}
                >
                  {footer?.close?.title ? footer?.close?.title : '취소'}
                </ModalFooterCloseBtn>
              ) : (
                <></>
              )}
            </ModalFooter>
          )}
        </MaskBodyContent>
      </MaskBody>
    </>
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

const ModalHeader = styled.div<ModalLayoutType>`
  color: var(--TrueGray-Gray800, #484848);
  text-align: center;
  font-size: 16px;
  font-weight: 700;
  line-height: 24px; /* 150% */
  display: flex;
  justify-content: ${(props: ModalLayoutType) => (props.type === 'left-head' ? 'start' : 'center')};
`;

const ModalBody = styled.div`
  min-height: 192px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: var(--TrueGray-Gray900, #242424);
  text-align: center;
  /* Body1 */
  font-size: 16px;
  font-weight: 400;
  line-height: 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ModalFooter = styled.div<ModalLayoutType>`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: var(--RadiusLG, 8px);
  align-self: stretch;
`;

const ModalFooterBtn = styled.button<ModalFooterBtnType>`
  background: transparent;
  border: 0;
  cursor: pointer;
  padding: 8px 16px;
  line-height: 24px;
  border-radius: var(--RadiusSM, 4px);
  background-color: ${(props: ModalFooterBtnType) =>
    props.bgColor ? props.bgColor : 'var(--Function-MintDefault, #1abcb7)'};
  color: #fff;
  width: 120px;
  :disabled {
    background-color: var(--TrueGray-Gray100, #f0f0f0);
    color: var(--TrueGray-Gray500, #b3b3b3);
  }
`;
const ModalFooterCloseBtn = styled.button<ModalFooterBtnType>`
  background: transparent;
  border: 0;
  cursor: pointer;
  padding: 8px 16px;
  line-height: 24px;
  border-radius: var(--RadiusMD, 6px);
  border: 1px solid var(--CoolGray-CoolGray400, #9aa9b7);
  background-color: ${(props: ModalFooterBtnType) => (props.bgColor ? props.bgColor : 'var(--TrueGray-White, #fff)')};
  width: 120px;
  :disabled {
    background-color: var(--TrueGray-Gray100, #f0f0f0);
    color: var(--TrueGray-Gray500, #b3b3b3);
  }
`;
