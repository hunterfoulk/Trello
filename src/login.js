import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import { useStateValue } from "./state";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loggedin, setLoggedIn] = useState(false);
  const [{ auth }, dispatch] = useStateValue();
  const history = useHistory();

  async function handleLogin(e) {
    e.preventDefault();
    await axios
      .post(
        "https://elegant-haibt-a61338.netlify.app/.netlify/functions/server/trello/login",
        {
          username: username,
          password: password,
        }
      )
      .then((res) => {
        const user = res.data.payload;
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(user));
        // localStorage.setItem("icon", JSON.stringify(user.icon));

        console.log("logged in succesfully");
        console.log("response", res);
        console.log("user", user);

        setLoggedIn(true);
        dispatch({
          type: "login",
          auth: {
            isAuthenticated: true,
            token: res.data.token,
            user: user,
          },
        });
      })
      .catch((error) => console.error("Log in was not succesful:", error));
  }

  const loginReRoute = () => history.push("/board");

  if (loggedin) {
    loginReRoute();
  }

  return (
    <div className="signup-main">
      <div className="bg"></div>
      <div className="signup-container">
        <h1>Log in </h1>
        <div className="signup-form-container">
          <form onSubmit={handleLogin} className="signup-form">
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
              <button onClick={handleLogin} className="login-button">
                Log in
              </button>
              <Link className="signup-span" to="/signup">
                <span>Dont have an account? Sign up!</span>
              </Link>
            </div>
            {loggedin && (
              <span className="signup-success">Log in successful</span>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
