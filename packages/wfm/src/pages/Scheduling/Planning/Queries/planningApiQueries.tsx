import { wfm } from '../../../../api';
import { useQuery } from 'react-query';
import { store } from '../../../../redux/store';
import { planning } from '../../../../redux/reducers/planning';
const { setPlan } = planning.actions;

export const usePlans = (tenant_id: string) => useQuery<any, any>(
  ['Get Plans', tenant_id],
  () => wfm.planning.api.get_all_tenants_tenant_id_wfm_plans({
    pathParams: {
      tenant_id,
      includeDeleted: false,
    }
  }).then((data: any) => {
    // Choose a default plan in state if not yet selected
    if(store.getState().planning.plan === null) {
      const {name, id} = data?.[0];
      store.dispatch(setPlan({label: name, id }));
    }
    return data;
  }),
  {
    refetchOnWindowFocus: false,
    enabled: !!tenant_id
  }
);

export const usePeriods = (tenant_id: string) => useQuery<any, any>(
  ['Get Periods', tenant_id],
  () => wfm.planning.api.get_all_tenants_tenant_id_wfm_scheduleperiods({
    pathParams: {
      tenant_id,
    }
  }),
  {
    refetchOnWindowFocus: false,
    enabled: !!tenant_id
  }
);
