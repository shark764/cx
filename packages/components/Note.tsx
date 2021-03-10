import styled from 'styled-components';

interface INote {
  color?: string;
  bgColor?: string;
  bdrColor?: string;
}
export const Note = styled.div<INote>`
  color: ${({ color }) => color || '#2d8dcc'};
  background-color: ${({ bgColor }) => bgColor || '#f0f7fb'};
  border: solid 1px ${({ bdrColor }) => bdrColor || '#3498db'};
  border-radius: 6px;
  line-height: 18px;
  overflow: hidden;
  padding: 12px;
`;

export const NoteAlt = styled.div<INote>`
  color: ${({ color }) => color || '#404040'};
  background-color: ${({ bgColor }) => bgColor || '#f0f7fb'};
  border-left: solid 4px ${({ bdrColor }) => bdrColor || '#3498db'};
  line-height: 18px;
  overflow: hidden;
  padding: 12px;
`;
