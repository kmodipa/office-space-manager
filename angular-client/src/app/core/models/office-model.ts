import {BaseModel} from "./base-model";

export interface OfficeModel extends BaseModel{
  name: string,
  address: string,
  email: string,
  phone: string,
  capacity: number,
  hexcolor: string,
  officeId: string
}
