// global types

import { Timestamp } from "@firebase/firestore-types";

export type Transactions = {
  id: string;
  createAt?: Timestamp;
  amount?: string;
  uid?: string;
  name?: string;
}[];
