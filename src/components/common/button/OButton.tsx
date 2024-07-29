import styled from '@emotion/styled';

//bg , text , border

const OButton = styled.button`
  background: transparent;
  border: 0;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  min-width: 96px;
  padding: 12px 16px;
  border-radius: var(--RadiusMD, 6px);
  background: var(--Function-MintDefault, #1abcb7);
  color: #fff;
  &:disabled {
    color: #999; /* Gray text color */
    background-color: #f5f5f5; /* Light gray background */
    border-color: #ccc; /* Gray border */
    cursor: not-allowed; /* Show a not-allowed cursor */
    opacity: 0.6; /* Reduce opacity */
  }
`;
export default OButton;
