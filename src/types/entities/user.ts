import { TCompany } from "./company";
import { TRole } from "./role";

export type TUser = {
  id: string;
  fullname: string;
  email: string;
  company: TCompany;
  role: TRole;
  phone_number: string;
  account_quota: null | number;
};
