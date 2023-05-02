import React, { ReactElement } from "react";
import { useFirestore } from "../../hooks/useFirestore";
import { Transactions } from "../../types/types";
import styled from "@emotion/styled";

interface Props {
  transactions: Transactions;
}

export default function TransactionList({ transactions }: Props): ReactElement {
  const { deleteDocument } = useFirestore("transactions");

  return (
    <TransactionsContainer>
      {transactions.map((transaction) => {
        return (
          <li key={transaction.id}>
            <Name>{transaction.name}</Name>
            <Amount>${transaction.amount}</Amount>
            <button onClick={() => deleteDocument(transaction.id)}>x</button>
          </li>
        );
      })}
    </TransactionsContainer>
  );
}

const TransactionsContainer = styled.ul`
  li {
    margin: 30px auto;
    border: 1px solid #f2f2f2;
    box-shadow: 3px 3px 5px rgba(50, 50, 50, 0.1);
    padding: 20px;
    display: flex;
    align-items: center;
    position: relative;
    overflow: hidden;
    border-left: 4px solid #1f9751;
  }

  button {
    position: absolute;
    top: 0;
    right: 0;
    background: #ddd;
    color: #777;
    border: none;
    padding: 12px 8px;
    text-align: center;
    line-height: 0;
    font-size: 0.9em;
    cursor: pointer;
  }
`;

const Name = styled.p`
  color: #777;
  font-size: 1.4em;
`;

const Amount = styled.p`
  margin-left: auto;
  margin-right: 40px;
  color: #777;
  font-weight: bold;
  font-size: 1.6em;
`;
