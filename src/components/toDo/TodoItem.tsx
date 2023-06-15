import React from "react";
import { IToDo, todoListAtom } from "./Atoms/atoms";
import { useForm } from "react-hook-form";
import { useRecoilState } from "recoil";
import "./styles/todo.css";

interface ITodoProps {
  id: number;
  text: string;
  completed: boolean;
}

export default function TodoItem({ text, completed, id }: ITodoProps) {
  const { register, watch, handleSubmit, formState, setValue } = useForm();
  const [todoList, setTodoList] = useRecoilState(todoListAtom);
  console.log(watch("todoText"));
  const index = todoList.findIndex((todo) => todo.id === id);
  const editItemText = () => {
    const newList = relatItemAtIndex(todoList, index, {
      id,
      text,
      completed: false,
    });
    setTodoList(newList);
  };
  const toggleItemCompletion = () => {
    const newList = relatItemAtIndex(todoList, index, {
      id,
      text,
      completed: !completed,
    });
    setTodoList(newList);
  };
  const deleteItem = () => {
    const newList = removeItemAtIndex(todoList, index);
    setTodoList(newList);
  };
  return (
    <form>
      <input
        className={completed ? "done-task" : "do-task"}
        {...(register("todoText"), { onChange: editItemText, value: text })}
        type="text"
      />
      <input
        {...(register("todoCheck"),
        { onChange: toggleItemCompletion, checked: completed })}
        type="checkbox"
      />
      <button onClick={deleteItem}>X</button>
    </form>
  );
}
const relatItemAtIndex = (arr: IToDo[], index: number, newValue: IToDo) => {
  return [...arr.slice(0, index), newValue, ...arr.slice(index + 1)];
};
const removeItemAtIndex = (arr: IToDo[], index: number) => {
  return [...arr.slice(0, index), ...arr.slice(index + 1)];
};
