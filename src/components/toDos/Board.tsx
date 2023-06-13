import { Droppable } from "@hello-pangea/dnd";
import React, { useRef } from "react";
import styled from "styled-components";
import DragabbleCard from "./DragabbleCard";
import { IToDo, todosState } from "../../Atoms/atoms";
import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import TodoCreate from "./TodoCreate";

interface IBoardProps {
  toDos: IToDo[];
  boardId: string;
}
interface IFrom {
  toDo: string;
}

const TodoList = styled.div`
  background-color: #dfe3e6;
  border-radius: 3px;
  min-width: 300px;
  max-width: 300px;
  max-height: 100%;
  padding: 5px;
  margin: 0 8px 0 0;
  display: flex;
  flex-direction: column;
  word-break: break-all;
  /* display: grid;
  width: 100%;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px; */
`;

const Wrapper = styled.div`
  /* background-color: #dfe3e6;
  border-radius: 3px;
  min-width: 300px;
  max-width: 300px;
  max-height: 300px;
  padding: 5px;
  margin: 0 8px 0 0;
  display: flex;
  flex-direction: column;
  word-break: break-all; */

  /* padding: 20px 10px;
  padding-top: 30px;
  background-color: ${(props) => props.theme.boardColor};
  border-radius: 5px;
  min-height: 200px; */
`;
const Form = styled.form`
  max-width: 331px;

  /* width: 100%;
  input {
    width: 100%;
  } */
`;
const TodoListHead = styled.div`
  width: 100%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const TodoListHeadTitle = styled.h1`
  width: 100%;
  height: 100%;
  padding: 13px 5px;
  word-break: break-all;
  /* text-align: center;
  font-weight: 600;
  margin-bottom: 10px;
  font-size: 18px; */
`;
const ButtonIcon = styled.button`
  outline: 0;
  border: 0;
  background-color: transparent;
  cursor: pointer;
  padding: calc(0.375rem - 3px) 12px;
  &:active {
    background-color: #c6c6c6;
  }
`;
const TodoListContent = styled.div`
  flex: 1 1 auto;
  padding: 0 5px;
  min-height: 10px;
  overflow-x: hidden;
  overflow-y: auto;
  margin-bottom: 0;
`;
export default function Board({ toDos, boardId }: IBoardProps) {
  const { register, setValue, handleSubmit } = useForm<IFrom>();
  const setToDos = useSetRecoilState(todosState);
  const innerRef = useRef<HTMLInputElement>(null);
  // const onClick = () => {
  //   innerRef.current?.focus();
  // };
  const inVaild = (data: IFrom) => {
    const newToDo = {
      id: Date.now(),
      text: data.toDo,
    };
    setToDos((oldToDos) => {
      return {
        ...oldToDos,
        [boardId]: [newToDo, ...oldToDos[boardId]],
      };
    });
    setValue("toDo", "");
  };
  return (
    <TodoList>
      {/* <input type="text" ref={innerRef} />
      <button onClick={onClick}>Click</button> */}
      {/* <Form onSubmit={handleSubmit(inVaild)}>
        <input
          {...register("toDo", { required: true })}
          type="text"
          placeholder={`Add task on ${boardId}`}
        />
        <button>Click</button>
      </Form> */}

      <TodoListHead>
        <TodoListHeadTitle>
          <div>{boardId}</div>
        </TodoListHeadTitle>
        <ButtonIcon>
          <FontAwesomeIcon icon={faTrash} color={"white"} size={"lg"} />
        </ButtonIcon>
      </TodoListHead>

      <Droppable droppableId={boardId} type="category" direction="horizontal">
        {(provided) => (
          <>
            <TodoListContent
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {toDos.map((toDo, index) => (
                <DragabbleCard
                  key={toDo.id}
                  index={index}
                  toDoId={toDo.id}
                  toDoText={toDo.text}
                />
              ))}
              {provided.placeholder}
            </TodoListContent>
            <TodoCreate />
          </>
        )}

        {/* <TodoCreate /> */}
      </Droppable>
    </TodoList>
  );
}
