import styled from '@emotion/styled';
import { HTMLAttributes } from 'react';

type Variant =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'body1'
  | 'body2'
  | 'body3'
  | 'label1'
  | 'label2'
  | 'label3'
  | 'display1';

type Props = {
  variant?: Variant;
};

const Display1 = `
  /* font-family: Pretendard; */
  font-size: 32px;
  font-weight: 900;
  line-height: normal;
`;
const H1 = `
  font-size: 32px;
  font-weight: 700;
  line-height: 40px; /* 125% */
`;
const H2 = `
  font-size: 24px;
  font-weight: 700;
  line-height: 28px; /* 116.667% */
`;
const H3 = `
  font-size: 18px;
  font-weight: 700;
  line-height: 24px; /* 133.333% */
`;
const H4 = `
  font-size: 16px;
  font-weight: 700;
  line-height: 24px; /* 150% */
`;
const H5 = `
  font-size: 14px;
  font-weight: 700;
  line-height: 20px; /* 142.857% */
`;
const H6 = `
  font-size: 12px;
  font-weight: 700;
  line-height: 16px;
`;
const Body1 = `
  font-size: 16px;
  font-weight: 400;
  line-height: 24px; /* 150% */
`;
const Body2 = `
  font-size: 14px;
  font-weight: 700;
  line-height: 20px; /* 142.857% */
`;
const Body3 = `
  font-size: 12px;
  font-weight: 400;
  line-height: 16px;
`;
const Label1 = `
  font-size: 16px;
  font-weight: 700;
  line-height: 24px;
`;
const Label2 = `
  font-size: 14px;
  font-weight: 700;
  line-height: 24px;
`;
const Label3 = `
  font-size: 12px;
  font-weight: 700;
  line-height: 20px;
`;
const getTypographyStyle = (type?: Variant) => {
  switch (type) {
    case 'display1':
      return Display1;
    case 'h1':
      return H1;
    case 'h2':
      return H2;
    case 'h3':
      return H3;
    case 'h4':
      return H4;
    case 'h5':
      return H5;
    case 'h6':
      return H6;
    case 'body1':
      return Body1;
    case 'body2':
      return Body2;
    case 'body3':
      return Body3;
    case 'label1':
      return Label1;
    case 'label2':
      return Label2;
    case 'label3':
      return Label3;
    default:
      return Body1;
  }
};

const getTag = (type?: Variant): React.ElementType => {
  if (!type || type === 'display1') return 'p';
  if (type === 'body1' || type === 'body2' || type === 'body3') {
    return 'p';
  } else if (type === 'label1' || type === 'label2' || type === 'label3') {
    return 'label';
  } else {
    return type;
  }
};

const StyledEmotionComponent = styled.div<Props>`
  ${(props) => getTypographyStyle(props.variant)}
`;

type TypographyProps = Props & HTMLAttributes<HTMLDivElement>;

const Typography = (props: TypographyProps) => {
  return (
    <StyledEmotionComponent as={getTag(props.variant)} variant={props.variant} {...props}>
      {props.children}
    </StyledEmotionComponent>
  );
};

export default Typography;
