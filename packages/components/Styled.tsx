import styled from 'styled-components';

export const Wrapper = styled.div`
  border: solid 1px rgba(128, 128, 128, 0.59);
  border-radius: 5px;
  padding: 1rem;
  background: white;
`;

export const Title = styled.h4`
  color: grey;
  font-style: italic;
  margin-top: 0px;
  margin-left: 10px;
`;

export const Label = styled.span`
  font-size: 12px;
  color: grey;
  vertical-align: super;
  margin-left: 1rem;
`;

export const SimpleTable = styled.div<{ numCol: number }>`
  display: grid;
  grid-template-columns: repeat(${({ numCol }) => numCol}, minmax(0, auto));
  border: 1px solid #80808096;
  border-radius: 5px;
  margin: 0.6rem 0;

  .st-row {
    display: contents;
    &:last-child {
      .st-cell {
        border-bottom: none;
      }
    }
  }
  .st-header {
    font-weight: bold;
    color: #808080;
  }
  .st-cell {
    padding: 6px 8px;
    border-bottom: 1px solid #80808096;
    text-align: center;
  }
  .st-full-cell {
    grid-column: 1 / -1;
  }
`;

export const Dash = styled.span`
  &:after {
    color: #808080;
    content: '----';
    letter-spacing: -0.1rem;
    white-space: nowrap;
    margin: 0.3rem;
  }
`;
