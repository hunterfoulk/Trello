import React, { useState, useEffect } from "react";
import "./app.scss";
import { BsFillPlusSquareFill } from "react-icons/bs";
import { Link, Redirect, useHistory } from "react-router-dom";
import { useStateValue } from "./state";
import Modal from "godspeed/build/Modal";
import axios from "axios";

export default function Navbar({ getTasks, setTasks, tasks }) {
  const [navDropdown, setNavDropdown] = useState(false);
  const [comment, setComment] = useState(false);
  const [task, setTask] = useState("");
  const [{ auth }, dispatch] = useStateValue();
  const url = `https://avatars.dicebear.com/v2/jdenticon/${auth.user.icon}.svg`;

  const history = useHistory();

  const logoutReRoute = () => history.push("/");

  const handleLogout = () => {
    localStorage.clear();

    setTimeout(() => {
      dispatch({
        type: "logout",
      });
      logoutReRoute();
    }, 400);
    setNavDropdown(false);
  };

  //post new task
  const addTask = async (e) => {
    e.preventDefault();

    const starter = auth.user;
    const users = [];
    users.push(starter);
    console.log(users);

    await axios
      .post("http://localhost:5000/trello/tasks", {
        starter,
        users,
        task: task,
      })
      .then((res) => {
        console.log("response", res);
        console.log("task sent to database");

        getTasks();
      })
      .catch((error) =>
        console.error("new task post was not succesfull:", error)
      );
    console.log("starters", starter);
    console.log("task.users", users);

    setTask("");
    setComment(false);
  };

  return (
    <div className="navbar">
      <div className="nav-left">
        <span>Trello</span>
      </div>

      {auth.isAuthenticated ? (
        <>
          <div className="nav-right">
            <BsFillPlusSquareFill
              onClick={() => setComment(true)}
              className="post-icon"
            />
            <img
              className="icon-image"
              onClick={() => setNavDropdown(!navDropdown)}
              src={url}
            ></img>
          </div>
        </>
      ) : (
        <></>
      )}

      <Modal
        padding="0px"
        radius="20px"
        onClick={() => setComment(false)}
        open={comment}
      >
        <div className="task-modal">
          <h1>New Task</h1>
          <div className="test-form"></div>
          <form onSubmit={addTask}>
            <textarea
              value={task}
              onChange={(e) => {
                setTask(e.target.value);
                console.log(e.target.value);
              }}
              className="task-input"
              rows="4"
              cols="50"
            ></textarea>
          </form>
          <button onClick={addTask}>Submit</button>
        </div>
      </Modal>
      {navDropdown && (
        <div className="nav-dropdown">
          <span onClick={handleLogout}>Log out</span>
        </div>
      )}
    </div>
  );
}
