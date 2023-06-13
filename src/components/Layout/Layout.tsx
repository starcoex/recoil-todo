import React from "react";
import Header from "./Header";
import Todo from "../toDos/Todo";
import { Outlet } from "react-router-dom";

type MyComponentProps = {
  children: React.ReactNode;
};

export default function Layout() {
  return (
    <div>
      <Header />
      <Todo />
      <Outlet />
    </div>
  );
}
