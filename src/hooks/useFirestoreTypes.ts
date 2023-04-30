export interface StateProps {
  document: payloadType;
  isPendingState: boolean;
  error: payloadType;
  success: boolean;
}

export enum FirestoreReducerEnum {
  IS_PENDING = "IS_PENDING",
  ADDED_DOCUMENT = "ADDED_DOCUMENT",
  DELETED_DOCUMENT = "DELETED_DOCUMENT",
  ERROR = "ERROR",
}

export interface FirestoreReducerAction {
  type: FirestoreReducerEnum;
  payload?: payloadType;
}

type payloadType = object | string | undefined;
