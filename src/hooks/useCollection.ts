import { useEffect, useRef, useState } from "react";
import { projectFirestore } from "../firebase/config";
import {
  WhereFilterOp,
  FieldPath,
  OrderByDirection,
  DocumentData,
  Query,
} from "@firebase/firestore-types";
import { Transactions } from "../types/types";

type firebaseQueryType = [string | FieldPath, WhereFilterOp, any];
type firebaseOrderByType = [string | FieldPath, OrderByDirection];

export const useCollection = (
  collection: string,
  _query: firebaseQueryType,
  _orderBy: firebaseOrderByType
) => {
  const [documents, setDocuments] = useState<Transactions>([]);
  const [error, setError] = useState<string>("");

  // if we dont use a ref --> infinite loop in useEffect
  // _query is an array(reference type) and is "diffrent" on every function call
  const query = useRef(_query).current;
  const orderBy = useRef(_orderBy).current;

  useEffect(() => {
    let ref: Query<DocumentData> = projectFirestore.collection(collection);

    // use this only if we have query
    if (query) {
      // firestore query arguments are in documentation
      // where method will filter based on argument passed to it
      ref = ref.where(...query);
    }
    if (orderBy) {
      // ref.orderBy is a method that can be called on ref(which is firebase object now)
      ref = ref.orderBy(...orderBy);
    }

    // everytime snapshot update it will be called
    const unsubscribe = ref.onSnapshot(
      (snapshot) => {
        let results: Transactions = [];
        // snapshot.docs is collection of data from database an start listen for them
        snapshot.docs.forEach((doc) => {
          // name ,amount, uid --- doc.id is id of document not a user
          results.push({ ...doc.data(), id: doc.id });
        });

        // update state
        setDocuments(results);
        setError("");
      },
      (error) => {
        console.log(error);
        setError("could not fetch the data");
      }
    );

    // unsubscribe on unmount
    // if we move awat from this page we will no longer listen for snapshot events
    return () => unsubscribe();
  }, [collection, query, orderBy]);

  return { documents, error };
};
