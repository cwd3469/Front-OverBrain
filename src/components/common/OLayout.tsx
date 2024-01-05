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
      <ContainerBody>{children}</ContainerBody>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const ContainerBody = styled.div`
  padding: 3rem;
  border-radius: 30px;
  background-color: #eee;
`;
export default OLayout;
