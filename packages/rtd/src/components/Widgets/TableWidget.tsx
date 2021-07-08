import * as React from 'react';
import {
  DashboardResults,
  DashboardTableField,
  WidgetData,
} from 'settings/types';
import { Table } from '@cx/components/Table';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { MainState } from 'redux/reducers/main';
import { DashboardState } from 'redux/reducers/dashboard';
import { setWidgetHiddenColumns } from 'redux/thunks/dashboard';

const Container = styled.div`
  width: 100%;
  height: 100%;
`;

const filterField = (field: DashboardTableField) => field.name !== 'action' && field.name !== 'customAttributes';
const getName = (field: DashboardTableField) => field.name ?? '';

export function TableWidget({
  widget,
  data,
  loading = false,
}: {
  widget: WidgetData;
  data: DashboardResults;
  loading: boolean;
}) {
  const dispatch = useDispatch();
  const dashboardId: string = useSelector(
    (state: { main: MainState }) => state.main.dashboard?.id ?? '',
  );
  const hiddenColumns: string[] = useSelector(
    (state: { dashboard: DashboardState }) => state.dashboard.hiddenColumns[dashboardId]?.[widget.id],
  );

  const tableData: any = data?.body?.results[widget?.query?.responseKey ?? ''];
  const columns: string[] = widget.presentation.tableConfig?.fields.filter(filterField).map(getName)
    ?? [];
  const wgHiddenColumns: string[] = hiddenColumns
    ?? widget.presentation.tableConfig?.fields
      .filter(filterField)
      .filter((field: DashboardTableField) => field.checked === false)
      .map(getName)
    ?? [];

  const onToggleHideColumn = (toggledColumns: string[]) => {
    dispatch(setWidgetHiddenColumns(dashboardId, widget.id, toggledColumns));
  };

  return (
    <Container key={widget.id}>
      <Table
        columnDefinitions={columns}
        tableData={tableData}
        loading={loading}
        themeVariant="realtime"
        showPagination
        showColumnSwitcher
        hiddenColumns={wgHiddenColumns}
        onToggleHideColumn={onToggleHideColumn}
      />
    </Container>
  );
}
