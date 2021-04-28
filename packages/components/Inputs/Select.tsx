import styled from 'styled-components';

export const Select = styled.select`
  display: block;
  box-sizing: border-box;
  width: 100%;
  border-radius: 4px;
  border: 1px solid hsl(0, 0%, 80%);
  padding: 10px 15px;
  background: white;

  &:focus {
    border-radius: 4px;

  }
`;
