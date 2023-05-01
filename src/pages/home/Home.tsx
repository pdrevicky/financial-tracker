import { useAuthContext } from "../../hooks/useAuthContext";
import { useCollection } from "../../hooks/useCollection";
import TransactionList from "./TransactionList";
import React from "react";
// styles
import styles from "./Home.module.css";

// components
import TransactionForm from "./TransactionForm";
import { ReactElement } from "react";

export default function Home(): ReactElement {
  const { user } = useAuthContext();
  const { documents, error } = useCollection(
    "transactions",
    ["uid", "==", user?.uid],
    ["createdAt", "desc"]
  );

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        {error && <p>{error}</p>}
        {documents && <TransactionList transactions={documents} />}
      </div>
      <div className={styles.sidebar}>
        <TransactionForm uid={user?.uid ?? ""} />
      </div>
    </div>
  );
}
