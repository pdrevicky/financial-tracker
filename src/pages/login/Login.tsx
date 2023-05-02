import { useState } from "react";
import { useLogin } from "../../hooks/useLogin";
import React from "react";
import styled from "@emotion/styled";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, error, isPending } = useLogin();

  const handleSubmit = (e: React.FormEvent) => {
    // preventDefault() prevents the default browser behavior for a given element.
    e.preventDefault();
    login(email, password);
  };

  return (
    <LoginForm onSubmit={handleSubmit}>
      <h2>Login</h2>
      <label>
        <span>email:</span>
        {/* This will set value of this to state and set value of input what is in state */}
        <input
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
      </label>
      <label>
        <span>password:</span>
        <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
      </label>
      {!isPending && <button className="btn">Login</button>}
      {isPending && (
        <button className="btn" disabled>
          Loading
        </button>
      )}
      {error && <p>{error}</p>}
    </LoginForm>
  );
}

const LoginForm = styled.form`
  max-width: 360px;
  margin: 60px auto;
  padding: 20px;
  label {
    display: block;
    margin: 30px auto;
  }
  span {
    display: block;
    margin-bottom: 6px;
  }
  input {
    padding: 8px 6px;
    font-size: 1em;
    color: #777;
    width: 100%;
  }
`;
