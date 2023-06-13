import { useRecoilState } from "recoil";
import styled from "styled-components";
import {
  DragDropContext,
  Draggable,
  DropResult,
  Droppable,
} from "@hello-pangea/dnd";
import { todosState } from "../../Atoms/atoms";
import Board from "./Board";

const Todo = styled.div`
  width: 100%;
  height: calc(100vh - 70px);
  padding: 10px;
  position: relative;
`;

const TodoContainer = styled.div`
  display: flex;
  align-items: flex-start;
  flex-direction: row;
  white-space: nowrap;
  height: 100%;
  margin-top: 45px;
  /* display: flex;
  max-width: 480px;
  width: 100%;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  height: 100vh; */
`;

const List = styled.div`
  background-color: #dfe3e6;
  border-radius: 8px;
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

export default function Home() {
  const [toDos, setTodo] = useRecoilState(todosState);
  const onDragEnd = (args: DropResult) => {
    console.log("args", args);
    const { draggableId, destination, source, type } = args;
    if (type === "category") {
      setTodo((oldToDos) => {
        const entries = Object.entries(oldToDos);
        console.log("entries", entries);
        const temp = entries.splice(source.index, 1);
        console.log(temp);
        return {
          ...oldToDos,
        };
      });
    }
    if (!destination) return;
    if (destination?.droppableId === source.droppableId) {
      setTodo((oldToDos) => {
        // console.log(oldToDos);
        // const newtoDos = Object.keys(oldToDos).map((toDo) => oldToDos[toDo]);
        // console.log("old", newtoDos);
        // newtoDos.splice(source.index, 1);
        // console.log("new", newtoDos);
        // newtoDos.splice(destination.index, 0, );
        const boardCopy = [...oldToDos[source.droppableId]];
        console.log("boadrCopy", boardCopy);
        const taskObj = boardCopy[source.index];
        console.log("taskObj", taskObj);
        boardCopy.splice(source.index, 1);
        boardCopy.splice(destination.index, 0, taskObj);
        return {
          ...oldToDos,
          [source.droppableId]: boardCopy,
        };
      });
    }
    if (destination.droppableId !== source.droppableId) {
      setTodo((oldToDos) => {
        const sourceBoard = [...oldToDos[source.droppableId]];
        const taskObj = sourceBoard[source.index];

        sourceBoard.splice(source.index, 1);
        const destinationBoard = [...oldToDos[destination.droppableId]];
        destinationBoard.splice(destination?.index, 0, taskObj);
        return {
          ...oldToDos,
          [source.droppableId]: sourceBoard,
          [destination.droppableId]: destinationBoard,
        };
      });
    }
  };
  return (
    <Todo>
      <DragDropContext onDragEnd={onDragEnd}>
        <TodoContainer>
          {Object.keys(toDos).map((boardId) => (
            <Board boardId={boardId} key={boardId} toDos={toDos[boardId]} />
          ))}
        </TodoContainer>
      </DragDropContext>
    </Todo>
  );
}
