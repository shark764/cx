import { channels, directions, tempTenantId } from 'utils/consts';
import { useFetchEntity } from 'queries/generalQueries';
import { useDispatch, useSelector } from 'react-redux';
import { applyGlobalFilter } from 'redux/thunks/main';
import { MainState } from 'redux/reducers/main';
import { FilterOptions, FilterTypes, GlobalFilters } from 'settings/types';
import { EntityData } from '@cx/types/api';
import { Grid } from '@material-ui/core';
import { FilterSelect } from './FilterSelect';

interface FilterMenu {
  menu: FilterTypes;
  title: string;
  options: FilterOptions[];
}

export function GlobalFiltersBar() {
  const dispatch = useDispatch();

  const { data: groups } = useFetchEntity(tempTenantId, 'groups');
  const { data: skills } = useFetchEntity(tempTenantId, 'skills');

  const filters: GlobalFilters = useSelector(
    (state: { main: MainState }) => state.main.filters,
  );

  const channelOptions: FilterOptions[] = [
    { id: 'all', label: 'All Channels' },
    ...channels,
  ];
  const directionOptions: FilterOptions[] = [
    { id: 'all', label: 'All Directions' },
    ...directions,
  ];
  const groupOptions: FilterOptions[] = [
    { id: 'all', label: 'All Groups' },
    ...(groups?.map((group: EntityData) => ({
      id: group.id,
      label: group.name ?? '--',
    })) || []),
  ];
  const skillOptions: FilterOptions[] = [
    { id: 'all', label: 'All Skills' },
    ...(skills?.map((skill: EntityData) => ({
      id: skill.id,
      label: skill.name ?? '--',
    })) || []),
  ];

  const handleChange = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
  ) => {
    dispatch(
      applyGlobalFilter(event.target.name as FilterTypes, event.target.value),
    );
  };

  return (
    <Grid
      container
      item
      xs={12}
      sm={12}
      lg={12}
      xl={12}
      spacing={4}
      justifyContent="flex-end"
    >
      {([
        { menu: 'channelType', title: 'Channel', options: channelOptions },
        { menu: 'direction', title: 'Direction', options: directionOptions },
        { menu: 'group-id', title: 'Group', options: groupOptions },
        { menu: 'skill-id', title: 'Skill', options: skillOptions },
      ] as FilterMenu[]).map(({ menu, title, options }: FilterMenu) => (
        <Grid item key={menu}>
          <FilterSelect
            name={menu}
            label={title}
            value={filters[menu]}
            onChange={handleChange}
            options={options}
          />
        </Grid>
      ))}
    </Grid>
  );
}
