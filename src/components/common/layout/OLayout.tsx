import styled from '@emotion/styled';

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
      <Card width={width}>{children}</Card>
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

const Card = styled.div<{ width?: string }>`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  border-radius: ${(props) => props.theme.gap.xl};
  background: ${(props) => props.theme.palette.white};
  padding: ${(props) => props.theme.gap.xl} 24px;

  width: ${(props) => props.width ?? '768px'};
  @media screen and (max-width: 1180px) {
    width: 100%;
  }
`;

export default OLayout;
