import styled from '@emotion/styled';
import { ReactNode } from 'react';
import { faker } from '@faker-js/faker';

type UiList = {
  size?: string;
  component: ReactNode[];
};

export type DesignComponent = {
  id: string;
  title: string;
  ui: UiList[];
};

type Props = {
  components: DesignComponent[];
};

export const ODesignCard = ({ components }: Props) => {
  return components.map((item) => {
    return (
      <Component key={item.id}>
        <ComponentType>{item.title}</ComponentType>
        {item.ui.map((el) => {
          const trId = faker.database.mongodbObjectId();
          return (
            <FlexRow key={trId}>
              <State>{el.size}</State>
              <Container>
                {el.component.map((uiComponent) => {
                  const trId = faker.database.mongodbObjectId();
                  return <UiBox key={trId}>{uiComponent}</UiBox>;
                })}
              </Container>
            </FlexRow>
          );
        })}
      </Component>
    );
  });
};

const UiBox = styled.div`
  min-width: 140px;
  display: flex;
  justify-content: center;
`;

export const OVDesignPageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 32px;
`;

const FlexRow = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  width: 100%;
`;

const Component = styled.div`
  padding: 32px;

  border-bottom: 1px solid var(--gray-cool-100, #e6eaec);
`;

const ComponentType = styled.div`
  margin-bottom: 16px;

  color: var(--gray-true-900, #242424);
  ${(props) => props.theme.typography.H6_Headline_24_R}
`;

const Container = styled.div`
  display: flex;
  gap: 24px;
  align-items: center;
  margin-bottom: 26px;
  justify-content: space-around;
`;

const State = styled.div`
  color: var(--gray-true-800, #484848);
  margin-bottom: 18px;
  ${(props) => props.theme.typography.B1_Body_18_R}
  min-width: 100px;
`;
