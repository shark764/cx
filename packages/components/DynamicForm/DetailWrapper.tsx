import * as React from 'react';
import { useState } from 'react';
import styled from 'styled-components';
import { Chevron } from '../Icons/Chevron';

const Wrapper = styled.div`
  font-family: Arial;
  display: ${({hidden}) => hidden? 'none' : 'grid'};
  grid-template-columns: fit-content(150px) 1fr fit-content(30px);
  margin-bottom: 30px;
`;
const TitleBar = styled.div`
  height: 0px;
  border: 1px solid #dadada;
  margin: 7px 20px;
`;
const Content = styled.div`
  Margin: 0 0 50px 0;
`;

interface Props {
  title: string;
  children: React.ReactNode;
  open: boolean;
  collapsable: boolean;
  hidden: boolean;
};

export const DetailWrapper: React.VFC<Props> = ({title, children, open = true, collapsable = true, hidden = false}) => {
  const [ isOpen, setOpen ] = useState(open);

    return <>
        <Wrapper hidden={hidden} onClick={() => collapsable && setOpen(!isOpen) }>
          <span>{ title }</span>
          {title && <TitleBar />}
          {collapsable && <Chevron
            rotate={isOpen ? -90 : 90}
            size={15}
          />}
        </Wrapper>
        <Content>
          { isOpen && children }
        </Content>
      </>;

}
