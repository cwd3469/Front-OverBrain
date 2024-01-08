import styled from '@emotion/styled';

const OContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 1180px;
  @media screen and (max-width: 1180px) {
    width: 100%;
  }
`;

export default OContainer;
