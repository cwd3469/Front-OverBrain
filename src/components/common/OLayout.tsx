import styled from '@emotion/styled';

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
      <PageBox>{children}</PageBox>
    </Container>
  );
};

const Container = styled.div`
  padding-top: 64px;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  height: 100vh;
  background: var(--CoolGray-CoolGray025, #f9fafb);
`;

const PageBox = styled.div`
  border-radius: var(--RadiusXL, 16px);
  background: var(--TrueGray-White, #fff);
  padding: var(--RadiusXL, 16px) 24px;
`;

export default OLayout;
