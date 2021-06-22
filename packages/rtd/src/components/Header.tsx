import { Theme, Typography } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { MainState } from 'redux/reducers/main';
import styled from 'styled-components';
import { GlobalFiltersBar } from './Filters/GlobalFilters';
import { BoxTitle, BoxWrapper } from './Styled';

export const HeaderBoxWrapper = styled(BoxWrapper)`
  border: solid 1px rgba(128, 128, 128, 0.59);
  box-shadow: none;
  ${({ theme }: { theme: Theme }) => `
    color: ${theme.palette.text.secondary};
    margin-top: ${theme.spacing(2)};
    margin-bottom: ${theme.spacing(2)};
    padding: ${theme.spacing(2)};
    padding-left: ${theme.spacing(3)};
  `};
`;

export function Header() {
  const dashboardTitle: string = useSelector(
    (state: { main: MainState }) => state.main.dashboard?.name ?? '',
  );

  return (
    <>
      <Typography variant="h6" color="textSecondary">
        {dashboardTitle}
      </Typography>

      <HeaderBoxWrapper elevation={0}>
        <BoxTitle variant="h4">Global Filters</BoxTitle>

        <GlobalFiltersBar />
      </HeaderBoxWrapper>
    </>
  );
}
