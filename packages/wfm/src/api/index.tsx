import { CXAPI } from '@cx/cxapi';
import { store } from '../redux/store';
import { forecasting } from '../redux/reducers/forecasting';

const {
  setActiveTenant,
} = forecasting.actions;

const session = localStorage.getItem('LIVEOPS-SESSION-KEY') || '{}';
const preference = localStorage.getItem('LIVEOPS-PREFERENCE-KEY') || '{}';

const { token } = JSON.parse(session);
const { tenant: { tenantId } } = JSON.parse(preference);

store.dispatch(setActiveTenant(tenantId));

export const wfm = CXAPI(token);
