import { useReducer, useEffect, useState } from "react";
import { projectFirestore, timestamp } from "../firebese/config";
import {
  FirestoreReducerAction,
  FirestoreReducerEnum,
  StateProps,
} from "./useFirestoreTypes";

let initialState: StateProps = {
  document: {},
  isPendingState: false,
  error: "",
  success: false,
};

const firestoreReducer = (
  state: StateProps,
  action: FirestoreReducerAction
) => {
  switch (action.type) {
    case FirestoreReducerEnum.IS_PENDING:
      return {
        isPendingState: true,
        document: {},
        success: false,
        error: "",
      };
    case FirestoreReducerEnum.ADDED_DOCUMENT:
      return {
        isPendingState: false,
        document: action.payload,
        success: true,
        error: "",
      };
    case FirestoreReducerEnum.DELETED_DOCUMENT:
      return {
        isPendingState: false,
        document: {},
        success: true,
        error: "",
      };
    case FirestoreReducerEnum.ERROR:
      return {
        isPendingState: false,
        document: {},
        success: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const useFirestore = (collection: string) => {
  const [response, dispatch] = useReducer(firestoreReducer, initialState);
  const [isCancelled, setIsCancelled] = useState(false);

  // collection ref
  const ref = projectFirestore.collection(collection);

  // only dispatch if not cancelled
  const dispachIfNotCancelled = (action: FirestoreReducerAction) => {
    if (!isCancelled) {
      dispatch(action);
    }
  };

  // add a document
  const addDocuments = async (doc: object) => {
    dispatch({ type: FirestoreReducerEnum.IS_PENDING });

    try {
      const createdAt = timestamp.fromDate(new Date());
      const addedDocument = await ref.add({ ...doc, createdAt });
      // only update state when component mount
      dispachIfNotCancelled({
        type: FirestoreReducerEnum.ADDED_DOCUMENT,
        payload: addedDocument,
      });
    } catch (err: any) {
      dispachIfNotCancelled({
        type: FirestoreReducerEnum.ERROR,
        payload: err.message,
      });
    }
  };

  // delete a document
  const deleteDocument = async (id: string) => {
    dispatch({ type: FirestoreReducerEnum.IS_PENDING });
    console.log("id", id);
    try {
      await ref.doc(id).delete();
      dispachIfNotCancelled({
        type: FirestoreReducerEnum.DELETED_DOCUMENT,
      });
    } catch (err) {
      dispachIfNotCancelled({
        type: FirestoreReducerEnum.ERROR,
        payload: "could not delete",
      });
    }
  };

  useEffect(() => {
    return () => setIsCancelled(true);
  }, []);

  return { addDocuments, deleteDocument, response };
};
