type MsgType = {
  state: 'error' | 'success';
  context: string;
};

type ContextMsgParam = { errType: string | undefined; keyValue: { [key: string]: string } };

type StateMessageParam = {
  keyValue: { [key: string]: string };
};

class StateMessage {
  keyValue: { [key: string]: string };
  constructor(params: StateMessageParam) {
    this.keyValue = params.keyValue;
  }
  private contextMsg = (param: ContextMsgParam) => {
    const { errType, keyValue } = param;
    if (errType) {
      const info: MsgType = {
        state: 'error',
        context: keyValue[errType],
      };

      return info;
    }
  };
  createMsg = () => {
    const msg = (errType?: string) => {
      return this.contextMsg({ errType, keyValue: this.keyValue });
    };
    return msg;
  };
}

const userIdMsg: { [key: string]: string } = {
  required: '아이디를 입력해 주세요.',
  pattern: '이메일 형식만 입력할 수 있습니다.',
};
const pwMsg: { [key: string]: string } = {
  required: '비밀번호를 입력해 주세요.',
  pattern: '영문자,숫자,특수문자 중 2개 이상을 사용하여 입력해 주세요',
  minLength: '8-16자리를 입력해 주세요.',
  maxLength: '8-16자리를 입력해 주세요.',
};

export const userIdMessage = new StateMessage({ keyValue: userIdMsg }).createMsg();
export const pwMessage = new StateMessage({ keyValue: pwMsg }).createMsg();
