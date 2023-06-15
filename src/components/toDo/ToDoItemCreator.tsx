import React from "react";
import { useForm } from "react-hook-form";
import { IToDo, IToDoFormState, todoListAtom } from "./Atoms/atoms";
import { useRecoilState } from "recoil";

interface IForm {
  todo: string;
}

export default function ToDoItemCreator() {
  const [todoList, setTodoList] = useRecoilState<IToDo[]>(todoListAtom);
  const { register, setValue, handleSubmit, formState, watch, getValues } =
    useForm<IForm>();
  // console.log(watch());
  // console.log(getValues("todo"));
  const onVaild = (data: IForm) => {
    setTodoList((oldToDoList) => [
      ...oldToDoList,
      {
        id: Date.now(),
        text: data.todo,
        completed: false,
      },
    ]);
    setValue("todo", "");
    return;
  };
  console.log(todoList);
  return (
    <div>
      <form onSubmit={handleSubmit(onVaild)}>
        <input
          {...register("todo", { required: true })}
          type="text"
          placeholder="ToDo Input"
        />
        <button>Add Task</button>
      </form>
    </div>
  );
}
