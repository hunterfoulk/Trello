import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { StateProvider } from "./state";

function Index() {
  const initialState = {
    auth: {
      isAuthenticated: false,
      token: "",
      user: {},
    },
  };

  const user = localStorage.getItem("user");
  const icon = localStorage.getItem("icon");

  if (user) {
    initialState.auth.isAuthenticated = true;
    initialState.auth.user = JSON.parse(user);
    // initialState.auth.user.icon = icon;
  }

  console.log("this is index", initialState.auth.user);

  const reducer = (state, action) => {
    switch (action.type) {
      case "login":
        return {
          ...state,
          auth: action.auth,
        };
      case "logout":
        return {
          ...state,
          auth: {
            isAuthenticated: false,
            user: {},
          },
        };

      default:
        return state;
    }
  };

  return (
    <StateProvider initialState={initialState} reducer={reducer}>
      <App />
    </StateProvider>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <Index />
  </React.StrictMode>,
  document.getElementById("root")
);
