import styled from '@emotion/styled';
import OContainer from './OContainer';
import { css } from '@emotion/css';

export type MenuInfo = {
  name: string;
  link: string;
  icons: React.ReactNode;
};

type Props = {
  children?: React.ReactNode;
};

const OLayout = ({ children }: Props) => {
  return (
    <Container>
      <OContainer className={style}>{children}</OContainer>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100vh;
  background: var(--CoolGray-CoolGray025, #f9fafb);
  position: relative;
`;

const style = css`
  border-radius: var(--RadiusXL, 16px);
  background: var(--TrueGray-White, #fff);
  padding: var(--RadiusXL, 16px) 24px;
`;

export default OLayout;
