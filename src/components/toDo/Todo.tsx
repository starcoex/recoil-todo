import React from "react";

import { Outlet } from "react-router-dom";
import ToDoItemCreator from "./ToDoItemCreator";
import ToDoMain from "./ToDoMain";
import "./styles/todo.css";

export default function Todo() {
  return (
    <div>
      <h1>FCC ToDo</h1>

      <ToDoMain />
      <Outlet />
    </div>
  );
}
