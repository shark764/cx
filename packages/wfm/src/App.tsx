import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from './redux/store';
import styled, { css } from 'styled-components';
import { PageSideBar } from '@cx/components/PageSideBar';
import { PageHeader } from '@cx/components/PageHeader';
import { Navigation } from './navigation';
import { useDivWidth } from '@cx/utilities/CustomHooks/useDivWidth';
import { fetchTenantCompetencies } from './redux/thunks';
import './App.css';

const Main = styled.main`
  margin: 0;
  overflow: auto;
`;

const Content = styled.section<{ isMobile: boolean }>`
  ${({ isMobile }) => isMobile ?
    css`
      margin-left: 56px;
    ` :
    css`
      padding: 24px;
      margin-left: 100px;
    `
  }
`;

export function App() {
  const displaySize = useSelector((state: RootState) => state.main.displaySize);
  const [ref, width] = useDivWidth();
  const [isMobile, setIsMobile] = React.useState(false);
  const dispatch = useDispatch();

  React.useEffect(() => {
    width < displaySize ? setIsMobile(true) : setIsMobile(false);
  }, [width, displaySize]);


  React.useEffect(() => {
    dispatch(fetchTenantCompetencies());
  }, [dispatch]);

  return (
    <>
      {window.parent === window ? <PageHeader /> : <></>}

      <PageSideBar />

      <Main>
        <Content ref={ref} isMobile={isMobile}>
          <Navigation />
        </Content>
      </Main>
    </>
  );
}
