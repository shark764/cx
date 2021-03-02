import { handleError } from '@cx/utilities/error';

export async function apiCall(promise: Promise<any>): Promise<any> {
  try {
    const { data } = await promise;
    return data;
  } catch (e) {
    handleError(e);
    throw e;
  }
}
