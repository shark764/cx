import * as React from 'react';
import { channels, directions, tempTenantId } from 'utils/consts';
import { useFetchGroups, useFetchSkills } from 'queries/generalQueries';
import { useDispatch, useSelector } from 'react-redux';
import { setGlobalFilter } from 'redux/thunks/main';
import { FilterTypes, MainState } from 'redux/reducers/main';
import { EntityData } from '@cx/types/api';
import { Grid } from '@material-ui/core';
import { FilterMenu } from './FilterMenu';

export function GlobalFilters() {
  const dispatch = useDispatch();

  const { data: groups } = useFetchGroups(tempTenantId);
  const { data: skills } = useFetchSkills(tempTenantId);

  const filters: any = useSelector(
    (state: { main: MainState }) => state.main.filters,
  );

  const channelOptions = [{ id: 'all', label: 'All Channels' }, ...channels];
  const directionOptions = [
    { id: 'all', label: 'All Directions' },
    ...directions,
  ];
  const groupOptions = [
    { id: 'all', label: 'All Groups' },
    ...(groups?.map((group: EntityData) => ({
      id: group.id,
      label: group.name,
    })) || []),
  ];
  const skillOptions = [
    { id: 'all', label: 'All Skills' },
    ...(skills?.map((skill: EntityData) => ({
      id: skill.id,
      label: skill.name,
    })) || []),
  ];

  const handleSelectOption = (filter: FilterTypes, id: string) => {
    dispatch(setGlobalFilter(filter, id));
  };

  return (
    <>
      {[
        { menu: 'channel', title: 'Channel', options: channelOptions },
        { menu: 'direction', title: 'Direction', options: directionOptions },
        { menu: 'groups', title: 'Group', options: groupOptions },
        { menu: 'skills', title: 'Skill', options: skillOptions },
      ].map(({ menu, title, options }: any) => (
        <Grid item key={menu}>
          <FilterMenu
            menu={menu}
            title={title}
            options={options}
            selected={filters[menu]}
            handleSelectOption={handleSelectOption}
          />
        </Grid>
      ))}
    </>
  );
}