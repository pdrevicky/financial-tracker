import React, { ReactElement, useEffect, useState } from "react";
import { useFirestore } from "../../hooks/useFirestore";

interface Props {
  uid: string;
}

export default function TransactionForm({ uid }: Props): ReactElement {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");

  const { addDocuments, response } = useFirestore("transactions");

  const handleSubmit = (e: React.FormEvent): void => {
    // submitting a form will automaticly reload the page this will cancle that
    e.preventDefault();
    addDocuments({ uid, name, amount });
  };

  // reset the form field
  useEffect(() => {
    if (response.success) {
      setName("");
      setAmount("");
    }
  }, [response.success]);

  return (
    <>
      <h3>Add a Transaction</h3>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Transaction name:</span>
          <input
            type="text"
            required
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
        </label>
        <label>
          <span>Amount ($):</span>
          <input
            type="number"
            required
            onChange={(e) => setAmount(e.target.value)}
            value={amount}
          />
        </label>
        <button>Add Transaction</button>
      </form>
    </>
  );
}
