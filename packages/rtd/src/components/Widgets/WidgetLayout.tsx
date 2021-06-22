import { Responsive, WidthProvider } from 'react-grid-layout';
import { CircularProgress, Grid } from '@material-ui/core';
import { DashboardResponse, WidgetData, WidgetGrid } from 'settings/types';
import { getWidgetComponent } from 'components/Widgets';
import { getWidgetPollData } from 'settings/settings';
import { BoxWrapper } from 'components/Styled';

const ResponsiveGridLayout = WidthProvider(Responsive);

interface WidgetLayoutProps {
  settings: { [key: string]: any };
  layouts: { lg: WidgetGrid[]; md: WidgetGrid[] };
  widgets: WidgetData[];
  data: DashboardResponse;
  loading: boolean;
  layoutLoading?: boolean;
}
export function WidgetLayout({
  settings,
  layouts,
  widgets,
  data,
  loading = false,
  layoutLoading = false,
}: WidgetLayoutProps) {
  return (
    <BoxWrapper>
      {layoutLoading ? (
        <Grid
          container
          justifyContent="center"
          alignContent="center"
          alignItems="center"
          height={100}
        >
          <Grid item>
            <CircularProgress color="secondary" size={50} />
          </Grid>
        </Grid>
      ) : (
        <ResponsiveGridLayout {...settings} layouts={layouts}>
          {widgets.map((widget: WidgetData) => {
            const Widget = getWidgetComponent(widget.type);
            const pollData = getWidgetPollData(data, widget.id);
            if (!Widget) {
              return null;
            }
            return (
              // Using a div to avoid error:
              // "Function components cannot be given refs"
              <div key={widget.id}>
                <Widget
                  key={widget.id}
                  widget={widget}
                  data={pollData}
                  loading={loading}
                />
              </div>
            );
          })}
        </ResponsiveGridLayout>
      )}
    </BoxWrapper>
  );
}
