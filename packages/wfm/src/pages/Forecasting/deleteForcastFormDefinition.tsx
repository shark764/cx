import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

export const useScenariosFromState = () => {
  return useSelector((state: RootState) => state.forecasting.scenarios).map(
    ({startDate, endDate, forecastScenarioId}) => ({
      label: `${startDate} - ${endDate}`,
      startDate,
      endDate,
      id: forecastScenarioId
    })
  );
};

export const deleteForcastFormDefinition = [
  {
    sectionTitle: 'Deletion Date Range',
    collapsable: false,
    fields: [
      {
        label: '',
        name: 'forecastScenarioId',
        type: 'typeahead',
        choices: useScenariosFromState,
        constraints: [{required: true}],
      },
    ]
  }
];
