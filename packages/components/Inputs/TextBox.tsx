import styled from 'styled-components';

export const TextBox = styled.input`
  display: block;
  box-sizing: border-box;
  width: 100%;
  border-radius: 4px;
  border: 1px solid hsl(0, 0%, 80%);
  padding: 10px 15px;
  outline: none;

  &:focus {
    border-radius: 4px;

  }
`;
