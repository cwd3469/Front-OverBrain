import useModal from '@/hooks/useModal';
import { useForm } from 'react-hook-form';
import { DefaultTextFiled, AuthTextFiled } from '@components/common/textFiled';
import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import { mobileFormat } from '@/utils/formatNumber';
import { UserInfoInterface } from '@/interface/auth';
import { type ModalInfo } from '@/interface/modal';
import { useTimer } from 'react-timer-hook';
import { useNavigate } from 'react-router-dom';

type MobileAuthInfo = {
  mobile: string;
};

type ElementState = { disabled: boolean; placeholder?: string; errorMsg?: string };

const useMobileModal = () => {
  const navigate = useNavigate();
  const {
    register,
    formState: { isValid },
    setValue,
    reset,
  } = useForm<MobileAuthInfo>();
  //사용자 정보
  const [userInfo, setUserInfo] = useState<UserInfoInterface>();
  // 인증번호 입력 컴포넌트 상태
  const [authInputState, setAuthInputState] = useState<ElementState>({
    disabled: true,
    placeholder: '인증번호가 발송되지 않았습니다',
  });
  // 인증번호 발송 버튼 상태
  const [authRequestBtnState, setAuthRequestBtnState] = useState<ElementState>({
    disabled: false,
  });

  // 인증번호 입력 기능
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    const numericValue = inputValue.replace(/\D/g, '');
    setValue('mobile', numericValue);
  };
  // 사용자 정보 저장 기능
  const onUserInfo = (info: UserInfoInterface) => setUserInfo(info);

  const handleReset = () => {
    handleExpire();
    setUserInfo(undefined);
  };

  const handleExpire = () => {
    reset();
    setAuthInputState({ disabled: true, placeholder: '인증번호가 발송되지 않았습니다' });
    setAuthRequestBtnState({ disabled: false });
    restart(time, false);
  };

  const time = new Date();
  time.setSeconds(time.getSeconds() + 10);
  const { seconds, minutes, start, restart, isRunning } = useTimer({
    expiryTimestamp: time,
    onExpire: handleExpire,
    autoStart: false,
  });

  // 인증번호 발송 api 요청
  const handleAuthRequest = () => {
    const response = () => {
      console.log(userInfo);
    };
    const onSuccess = () => {
      setAuthInputState({
        disabled: false,
        placeholder: '인증번호 6자리',
      });
      setAuthRequestBtnState({ disabled: true });
      start();
    };
    onSuccess();
    response();
  };

  // 인증번호 확인 api 요청
  const handleConfirm = () => {
    const code: string = '200';
    const onSuccuss = () => {
      handleReset();
      navigate('/login/multi');
    };
    const onError = () => {
      setModalName('errors');
    };
    const onErrorValid = () => {
      setAuthInputState((prev) => {
        const newNext = { ...prev, errorMsg: '인증번호가 일치하지 않습니다.' };
        return newNext;
      });
    };
    switch (code) {
      case '200':
        onSuccuss();
        return;
      case '400':
        onErrorValid();
        return;
      case '500':
        onError();
        return;
      default:
        onSuccuss();
        return;
    }
  };

  // 본인 인증 SMS 모달 정보
  const AuthModal: ModalInfo = {
    type: 'confirm',
    header: '본인 인증(SMS)',
    body: (
      <MobileAuthBody>
        <div>
          <AuthGuideText>계정에 등록된 휴대폰으로 6자리 인증번호를 </AuthGuideText>
          <AuthGuideText>발송하였습니다.</AuthGuideText>
          <AuthGuideText>인증번호를 입력해 주시기 바랍니다.</AuthGuideText>
        </div>
        {userInfo && (
          <>
            <MobileAuthBox>
              <BoxWidth>
                <DefaultTextFiled type="text" defaultValue={mobileFormat(userInfo.phoneNumber)} disabled />
              </BoxWidth>
              <MobileAuthButton disabled={authRequestBtnState.disabled} onClick={handleAuthRequest}>
                인증번호 발송
              </MobileAuthButton>
            </MobileAuthBox>
            <AuthTextFiled
              {...register('mobile', {
                validate: (value) => /^\d+$/.test(value) || '숫자만 입력하세요.',
                minLength: 6,
                maxLength: 6,
              })}
              placeholder={authInputState.placeholder}
              disabled={authInputState.disabled}
              onChange={handleInputChange}
              maxLength={6}
              message={authInputState.errorMsg ? { state: 'error', context: authInputState.errorMsg } : undefined}
              time={isRunning ? { minute: minutes, second: seconds } : undefined}
            />
          </>
        )}
      </MobileAuthBody>
    ),
    footer: {
      confirm: {
        onClick: handleConfirm,
        disabled: !isValid,
      },
    },
    width: '360px',
  };

  // 로그인 실패 모달
  const AuthFailureModal: ModalInfo = {
    type: 'alert',
    header: '로그인 실패',
    body: <>로그인 정보가 올바르지 않습니다.</>,
  };

  // 로그인 오류 모달
  const AuthFailureError: ModalInfo = {
    type: 'alert',
    header: '로그인 오류',
    body: (
      <>
        <div>통신, 서버 장애가 발생했습니다.</div>
        <div> 다시 시도해주세요.</div>
      </>
    ),
  };

  const { modal, setModalName, modalName, isModalMount } = useModal({
    info: new Map([
      ['mobile-auth', AuthModal],
      ['failure', AuthFailureModal],
      ['errors', AuthFailureError],
    ]),
  });

  useEffect(() => {
    if (!isModalMount) handleReset();
  }, [modalName]);

  return { modal, setModalName, onUserInfo };
};

export default useMobileModal;

const BoxWidth = styled.div`
  width: 200px;
`;

const AuthGuideText = styled.p`
  color: var(--TrueGray-Gray800, #484848);
  font-size: 14px;
  line-height: 20px;
  text-align: left;
`;

const MobileAuthBody = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 16px;
  padding: 8px 0 16px;
`;

const MobileAuthBox = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 8px;
`;
const MobileAuthButton = styled.button`
  //layout
  padding: 6px;

  width: 104px;
  border: 0;
  cursor: pointer;

  //color
  border-radius: var(--RadiusSM, 4px);
  border: 1px solid var(--Function-MintDefault, #1abcb7);
  background: var(--TrueGray-White, #fff);
  //font
  font-size: 12px;
  font-weight: 700;
  line-height: 20px;
  color: var(--Function-MintDark, #0f7675);
  :disabled {
    background-color: var(--TrueGray-Gray100, #f0f0f0);
    color: var(--TrueGray-Gray500, #b3b3b3);
    border: 1px solid var(--TrueGray-Gray100, #f0f0f0);
  }
`;
