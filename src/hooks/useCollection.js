import { useEffect, useRef, useState } from "react";
import { projectFirestore } from "../firebese/config";

export const useCollection = (collection, _query, _orderBy) => {
  const [documents, setDocuments] = useState(null);
  const [error, setError] = useState(null);

  // if we dont use a ref --> infinite loop in useEffect
  // _query is an array(reference type) and is "diffrent" on every function call
  const query = useRef(_query).current;
  const orderBy = useRef(_orderBy).current;

  useEffect(() => {
    let ref = projectFirestore.collection(collection);

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

    // everytime snapshot update it will
    const unsubscribe = ref.onSnapshot(
      (snapshot) => {
        let results = [];
        // snapshot.docs is collection of data from database an start listen for them
        snapshot.docs.forEach((doc) => {
          // name ,amount, uid --- doc.id is id of document not a user
          results.push({ ...doc.data(), id: doc.id });
        });

        // update state
        setDocuments(results);
        setError(null);
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
