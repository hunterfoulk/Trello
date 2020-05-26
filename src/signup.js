import React, { useState } from "react";
import { Link, Redirect, useHistory } from "react-router-dom";
import axios from "axios";

export default function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [registered, setRegistered] = useState(false);
  const history = useHistory();

  async function handleRegister(e) {
    e.preventDefault();
    await axios
      .post(
        "https://elegant-haibt-a61338.netlify.app/.netlify/functions/server/trello/signup",
        {
          username: username,
          password: password,
        }
      )
      .then(
        (res) =>
          console.log(res.data) & console.log("account created succesfully!"),
        console.log(username, password),
        setRegistered(true)
      )
      .catch((error) =>
        console.error("account not created succesfully:", error)
      );
  }

  const registeredReRoute = () => history.push("/");
  if (registered) {
    setTimeout(() => {
      registeredReRoute();
    }, 1500);
  }

  return (
    <div className="signup-main">
      <div className="bg"></div>
      <div className="signup-container">
        <h1>Sign up</h1>
        <div className="signup-form-container">
          <form onSubmit={handleRegister} className="signup-form">
            <span>Username</span>
            <input
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
                console.log(e.target.value);
              }}
              type="text"
            ></input>
            <span>Password</span>
            <input
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                console.log(e.target.value);
              }}
              type="password"
            ></input>
            <div>
              <button onClick={handleRegister} className="login-button">
                Sign up
              </button>
              <Link className="signup-span" to="/">
                <span>Already have an account? Log in!</span>
              </Link>
            </div>
            {registered && (
              <span className="signup-success">Account Created!</span>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
