import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./app.scss";
import Navbar from "./navbar";
import Signup from "./signup";
import Login from "./login";
import Board from "./board";

export default function App() {
  const [tasks, setTasks] = useState([]);

  const getTasks = async () => {
    try {
      const response = await fetch(
        "https://elegant-haibt-a61338.netlify.app/.netlify/functions/server/trello/tasks"
      );
      const jsonData = await response.json();
      jsonData.forEach((task) => {
        task.fixed = false;
      });
      setTasks(jsonData);
      console.log("tasks", jsonData);
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <Router>
      <Navbar getTasks={getTasks} tasks={tasks} setTasks={setTasks} />

      <Route
        exact
        path="/"
        render={() => (
          <>
            <Login />
          </>
        )}
      ></Route>
      <Route
        path="/signup"
        render={() => (
          <>
            <Signup />
          </>
        )}
      ></Route>
      <Route
        path="/board"
        render={() => (
          <>
            <Board getTasks={getTasks} tasks={tasks} setTasks={setTasks} />
          </>
        )}
      ></Route>
    </Router>
  );
}
