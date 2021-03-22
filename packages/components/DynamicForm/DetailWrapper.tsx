import * as React from 'react';
import { useState } from 'react';
import styled from 'styled-components';
import { Chevron } from '../Icons/Chevron';

const Wrapper = styled.div`
  font-family: Arial;
  display: grid;
  grid-template-columns: fit-content(150px) 1fr fit-content(30px);
  margin-bottom: 30px;
`;
const TitleBar = styled.div`
  height: 0px;
  border: 1px solid #dadada;
  margin: 7px 20px;
  /* font-weight: bold; */
`;
const Content = styled.div`
  Margin: 0 0 50px 0;
`;

interface Props {
  title: string;
  children: React.ReactNode;
  open: boolean;
  collapsable: boolean;
};

export const DetailWrapper: React.VFC<Props> = ({title, children, open = true, collapsable = true}) => {
  const [ isOpen, setOpen ] = useState(open);

    return <>
        <Wrapper onClick={() => setOpen(!isOpen) }>
          <span>{ title }</span>
          <TitleBar />
          {collapsable && <Chevron
            rotate={isOpen ? -90 : 90}
            size={15}
          />}
        </Wrapper>
        <Content>
          { isOpen && children }
        </Content>
      </>

}
