import { CXAPI } from '@cx/cxapi';
import { store } from '../redux/store';
import { forecasting } from '../redux/reducers/forecasting';

const {
  setActiveTenant,
} = forecasting.actions;
const noSession = JSON.stringify({})
const noPreference = JSON.stringify({ tenant: { tenandId: '' } });

const session = localStorage.getItem('LIVEOPS-SESSION-KEY') || noSession;
const preference = localStorage.getItem('LIVEOPS-PREFERENCE-KEY') || noPreference;

const { token } = JSON.parse(session);
const { tenant: { tenantId } } = JSON.parse(preference);

store.dispatch(setActiveTenant(tenantId));

export const wfm = CXAPI(token);
