import styled from '@emotion/styled';
import { Outlet } from 'react-router-dom';
export type MenuInfo = {
  name: string;
  link: string;
  icons: React.ReactNode;
};

type Props = {
  width?: string;
};

const MainLayout = ({ width }: Props) => {
  return (
    <Layout>
      <Container width={width}>
        <Outlet />
      </Container>
    </Layout>
  );
};

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: ${(props) => props.theme.palette.gray[100]};
  position: relative;
`;

const Container = styled.div<{ width?: string }>`
  border-radius: ${(props) => props.theme.gap.lg};
  background: #fff;
  padding: 24px;
  width: ${(props) => props.width ?? '768px'};
  @media screen and (max-width: ${(props) => props.theme.screens.lg}) {
    width: 100%;
  }
`;

export default MainLayout;
