import styled from '@emotion/styled';
import { css } from '@emotion/css';

export type MenuInfo = {
  name: string;
  link: string;
  icons: React.ReactNode;
};

type Props = {
  children?: React.ReactNode;
  width?: string;
};

const OLayout = ({ children, width }: Props) => {
  return (
    <Container>
      <Card className={style} width={width}>
        {children}
      </Card>
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

const Card = styled.div<{ width?: string }>`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: ${(props) => props.width ?? '768px'};
  @media screen and (max-width: 1180px) {
    width: 100%;
  }
`;

export default OLayout;
