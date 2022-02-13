import {BaseModel} from "./base-model";

export interface OfficeWorkerModel extends BaseModel {
  firstName: string,
  lastName: string,
  avatarUrl: string,
  officeId: string,
  officeWorkerId: string,
}
