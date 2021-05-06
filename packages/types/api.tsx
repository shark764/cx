export interface IPayload {
  id?: string | number;
  ids?: Array<string | number>;
  payload: any;
}

export interface EntityData {
  id: string;
  name?: string;
  active: boolean;
  tenantId: string;
}
