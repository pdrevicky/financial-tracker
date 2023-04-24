import { useReducer, useEffect, useState } from "react";
import { projectFirestore, timestamp } from "../firebese/config";

let initialState = {
  document: null,
  isPendingState: false,
  error: null,
  success: null,
};

const firestoreReducer = (state, action) => {
  switch (action.type) {
    case "IS_PENDING":
      return {
        isPendingState: true,
        document: null,
        success: false,
        error: null,
      };
    case "ADDED_DOCUMENT":
      return {
        isPendingState: false,
        document: action.payload,
        success: true,
        error: null,
      };
    case "DELETED_DOCUMENT":
      return {
        isPendingState: false,
        document: null,
        success: true,
        error: null,
      };
    case "ERROR":
      return {
        isPendingState: false,
        document: null,
        success: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const useFirestore = (collection) => {
  const [response, dispatch] = useReducer(firestoreReducer, initialState);
  const [isCancelled, setIsCancelled] = useState(false);

  // collection ref
  const ref = projectFirestore.collection(collection);

  // only dispatch if not cancelled
  const dispachIfNotCancelled = (action) => {
    if (!isCancelled) {
      dispatch(action);
    }
  };

  // add a document
  const addDocuments = async (doc) => {
    dispatch({ type: "IS_PENDING" });

    try {
      const createdAt = timestamp.fromDate(new Date());
      const addedDocument = await ref.add({ ...doc, createdAt });
      // only update state when component mount
      dispachIfNotCancelled({ type: "ADDED_DOCUMENT", payload: addedDocument });
    } catch (err) {
      dispachIfNotCancelled({ type: "ERROR", payload: err.message });
    }
  };

  // delete a document
  const deleteDocument = async (id) => {
    dispatch({ type: "IS_PENDING" });
    console.log("id", id);
    try {
      await ref.doc(id).delete();
      dispachIfNotCancelled({
        type: "DELETED_DOCUMENT",
      });
    } catch (err) {
      dispachIfNotCancelled({ type: "ERROR", payload: "could not delete" });
    }
  };

  useEffect(() => {
    return () => setIsCancelled(true);
  }, []);

  return { addDocuments, deleteDocument, response };
};
