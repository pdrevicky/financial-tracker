import { useAuthContext } from "../../hooks/useAuthContext";
import { useCollection } from "../../hooks/useCollection";
import TransactionList from "./TransactionList";
import React from "react";
import styled from "@emotion/styled";

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
    <Container>
      <Content>
        {error && <p>{error}</p>}
        {documents && <TransactionList transactions={documents} />}
      </Content>
      <Sidebar>
        <TransactionForm uid={user?.uid ?? ""} />
      </Sidebar>
    </Container>
  );
}

const Container = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  max-width: 960px;
  margin: 60px auto;
`;

const Content = styled.div`
  padding-right: 30px;
`;

const Sidebar = styled.div`
  padding-left: 30px;
  form {
    padding: 20px;
    background: #1f9751;
    border-radius: 10px;
  }
  input,
  select {
    display: block;
    width: 100%;
    padding: 10px;
    margin-top: 8px;
    box-sizing: border-box;
    border: 0;
    border-radius: 4px;
    color: #555;
    font-size: 1em;
  }
  label {
    margin: 0 auto 20px;
    display: block;
    color: #fff;
  }
  button {
    color: #fff;
    border: 2px solid #fff;
    padding: 6px 12px;
    background-color: transparent;
    font-size: 1em;
    border-radius: 4px;
    cursor: pointer;
    display: block;
    width: 100%;
  }
  h3 {
    color: #1f9751;
    margin-bottom: 20px;
  }
  aside {
    margin-top: 40px;
    color: #555;
  }
  aside li {
    margin: 10px;
  }
`;
