import styled from '@emotion/styled';
import { Outlet } from 'react-router-dom';
export type MenuInfo = {
  name: string;
  link: string;
  icons: React.ReactNode;
};

type Props = {
  children?: React.ReactNode;
  width?: string;
};

const MainLayout = ({ children, width }: Props) => {
  return (
    <Container>
      <Card width={width}>
        <Outlet />
      </Card>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100vh;
  background-color: ${(props) => props.theme.palette.gray[100]};
  position: relative;
`;

const Card = styled.div<{ width?: string }>`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  border-radius: ${(props) => props.theme.gap.lg};
  background: #fff;
  padding: ${(props) => props.theme.gap.lg} 24px;

  width: ${(props) => props.width ?? '768px'};
  @media screen and (max-width: ${(props) => props.theme.screens.lg}) {
    width: 100%;
  }
`;

export default MainLayout;
