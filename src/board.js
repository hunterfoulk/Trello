import React, { useEffect, useState } from "react";
import "./app.scss";
import { useStateValue } from "./state";
import { BsPlusCircle } from "react-icons/bs";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import axios from "axios";
import "react-tippy/dist/tippy.css";
import { Tooltip } from "react-tippy";

export default function Board({ getTasks, setTasks, tasks }) {
  const [{ auth }, dispatch] = useStateValue();
  const [fixed, setFixed] = useState(false);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getTasks(setTasks);
  }, []);

  const setFixedBoolean = (task, index) => {
    tasks.forEach((task) => {
      task.fixed = false;
    });
    task.fixed = true;
    setFixed(true);
    console.log("fixed", task);

    const id = task.task_id;
    axios
      .post(
        "https://elegant-haibt-a61338.netlify.app/.netlify/functions/server/trello/updatetasks",
        {
          task_id: id,
        }
      )
      .then((res) => console.log(res.data) & console.log("task updated!"))
      .catch((error) => console.error("task not updated succesfully", error));
  };

  const addNewUser = (task, index) => {
    let task_id = parseFloat(task.task_id);

    const queryParams = { params: { task_id, user: auth.user } };

    axios
      .get(
        "https://elegant-haibt-a61338.netlify.app/.netlify/functions/server/trello/updateTask",
        queryParams
      )
      .then((res) => {
        console.log("data", res.data);

        setUsers(res.data);
        getTasks();
      })
      .catch((error) => console.error("task not updated succesfully", error));
  };

  return (
    <div className="board-main">
      <div className="bg"></div>
      <h1>Weekly Board</h1>
      <div className="task-container">
        {tasks.map((task, index) => (
          <>
            <div key={index} className="tasks">
              <div className="task-header">
                {(() => {
                  if (task.active === false) {
                    return <span className="fixed-boolean">Completed</span>;
                  } else if (fixed && task.fixed == true) {
                    return <span className="fixed-boolean">Completed</span>;
                  } else {
                    return <span className="active-boolean">Active</span>;
                  }
                })()}
                <IoIosCheckmarkCircleOutline
                  onClick={() => setFixedBoolean(task, index)}
                  className="dots"
                />
              </div>

              <div className="task-text-container">
                <p>{task.task}</p>
              </div>
              <div className="board-icons-container">
                <BsPlusCircle
                  onClick={() => addNewUser(task, index)}
                  className="card-plus"
                />

                {task.users.map((user) => {
                  const userIcons = `https://avatars.dicebear.com/v2/jdenticon/${user.icon}.svg`;

                  return (
                    <Tooltip
                      title={user.username}
                      position="bottom"
                      trigger="mouseenter"
                      animation="fade"
                    >
                      <img className="board-icons" src={userIcons}></img>
                    </Tooltip>
                  );
                })}
              </div>
            </div>
          </>
        ))}
      </div>
    </div>
  );
}
