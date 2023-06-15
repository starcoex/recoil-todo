import React from "react";
import ToDoItemCreator from "./ToDoItemCreator";
import { useRecoilValue } from "recoil";
import { todoListAtom } from "./Atoms/atoms";
import TodoCreate from "../toDos/TodoCreate";
import TodoItem from "./TodoItem";
import { totalmem } from "os";

export default function ToDoMain() {
  const todoList = useRecoilValue(todoListAtom);
  return (
    <div>
      <ToDoItemCreator />
      {todoList.length > 0 && (
        <div>
          {todoList.map((todoItem) => (
            <TodoItem
              key={todoItem.id}
              id={todoItem.id}
              text={todoItem.text}
              completed={todoItem.completed}
            />
          ))}
        </div>
      )}
    </div>
  );
}
