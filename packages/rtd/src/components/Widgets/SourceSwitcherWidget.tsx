import { Theme, Typography } from '@material-ui/core';
import { useFetchEntity } from 'queries/generalQueries';
import { tempTenantId } from 'utils/consts';
import { EntityData } from '@cx/types/api';
import { capitalize, getUserDisplay } from '@cx/utilities/string';
import { EntityTypes, FilterOptions, WidgetData } from 'settings/types';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { DashboardState } from 'redux/reducers/dashboard';
import { applyWidgetsFilter } from 'redux/thunks/dashboard';
import { FilterSelect } from 'components/Filters/FilterSelect';
import { MainState } from 'redux/reducers/main';

const Container = styled.div`
  width: 100%;
  height: 100%;
  border-bottom: 1px solid #ececec;
  display: flex;
  justify-content: space-between;
`;
const Label = styled(Typography)`
  font-weight: bold;
  ${({ theme }: { theme: Theme }) => `
    margin: ${theme.spacing(2, 0)};
  `};
`;

const defaultPrepareData = (data: EntityData[]) => data;
const prepareData = (data: EntityData[]) => data.filter((item: EntityData) => item.active);

export interface EntityMap {
  [key: string]: {
    name: EntityTypes;
    prepare(data: EntityData[]): EntityData[];
  };
}
const entityMap: EntityMap = {
  user: { name: 'users', prepare: defaultPrepareData },
  agent: { name: 'users', prepare: defaultPrepareData },
  resource: { name: 'users', prepare: defaultPrepareData },
  queue: { name: 'queues', prepare: prepareData },
  skill: { name: 'skills', prepare: prepareData },
  group: { name: 'groups', prepare: prepareData },
};

export function SourceSwitcherWidget({ widget }: { widget: WidgetData }) {
  const dispatch = useDispatch();

  const dashboardId: string = useSelector(
    (state: { main: MainState }) => state.main.dashboard?.id ?? '',
  );
  const filter: string | number = useSelector(
    (state: { dashboard: DashboardState }) => state.dashboard.filters[dashboardId]?.[widget.id] ?? 'all',
  );

  const entity: EntityTypes = entityMap[widget.entity ?? '']?.name;

  const { data } = useFetchEntity(tempTenantId, entity);

  const preparedData = entityMap[widget.entity ?? '']?.prepare(data || []);

  const title = capitalize(entity);

  const options: FilterOptions[] = [
    { id: 'all', label: `All ${title}` },
    ...(preparedData?.map((item: EntityData) => ({
      id: item.id,
      label: item.name || getUserDisplay(item),
    })) || []),
  ];

  const handleChange = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
  ) => {
    dispatch(applyWidgetsFilter(dashboardId, widget.id, event.target.value));
  };

  return (
    <Container>
      {widget.presentation?.title?.show && (
        <Label variant="h5" color="textSecondary">
          {widget.presentation.title.text}
        </Label>
      )}
      <FilterSelect
        name={widget.id}
        label={title}
        value={filter}
        onChange={handleChange}
        options={options}
      />
    </Container>
  );
}
