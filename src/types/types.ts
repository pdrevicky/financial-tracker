// global types

import { Timestamp } from "@firebase/firestore-types";

export type Transactions = {
  id: string;
  createAt?: Timestamp;
  amount?: string;
  uid?: string;
  name?: string;
}[];

export enum AuthActionTypeEnum {
  LOGIN = "LOGIN",
  LOGOUT = "LOGOUT",
  AUTH_IS_READY = "AUTH_IS_READY",
}
