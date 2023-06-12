import { Droppable } from "@hello-pangea/dnd";
import React, { useRef } from "react";
import styled from "styled-components";
import DragabbleCard from "./DragabbleCard";
import { IToDo, todosState } from "../../Atoms/atoms";
import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";

interface IBoardProps {
  toDos: IToDo[];
  boardId: string;
}
interface IFrom {
  toDo: string;
}
const Wrapper = styled.div`
  padding: 20px 10px;
  padding-top: 30px;
  background-color: ${(props) => props.theme.boardColor};
  border-radius: 5px;
  min-height: 200px;
`;
const Form = styled.form`
  width: 100%;
  input {
    width: 100%;
  }
`;
const Title = styled.h1`
  text-align: center;
  font-weight: 600;
  margin-bottom: 10px;
  font-size: 18px;
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
    <Wrapper>
      {/* <input type="text" ref={innerRef} />
      <button onClick={onClick}>Click</button> */}
      <Form onSubmit={handleSubmit(inVaild)}>
        <input
          {...register("toDo", { required: true })}
          type="text"
          placeholder={`Add task on ${boardId}`}
        />
        <button>Click</button>
      </Form>
      <Title>{boardId}</Title>
      <Droppable droppableId={boardId}>
        {(provided) => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            {toDos.map((toDo, index) => (
              <DragabbleCard
                key={toDo.id}
                index={index}
                toDoId={toDo.id}
                toDoText={toDo.text}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </Wrapper>
  );
}
