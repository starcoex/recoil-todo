import { useRecoilState } from "recoil";
import styled from "styled-components";
import { todosState } from "../Atoms/atoms";
import {
  DragDropContext,
  Draggable,
  DropResult,
  Droppable,
} from "@hello-pangea/dnd";
import DragabbleCard from "../components/toDos/DragabbleCard";
import Board from "../components/toDos/Board";

const Wrapper = styled.div`
  display: flex;
  max-width: 480px;
  width: 100%;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Boards = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
`;

export default function Home() {
  const [toDos, setTodo] = useRecoilState(todosState);
  const onDragEnd = (args: DropResult) => {
    console.log("args", args);
    const { draggableId, destination, source } = args;
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
    <DragDropContext onDragEnd={onDragEnd}>
      <Wrapper>
        <Boards>
          {Object.keys(toDos).map((boardId) => (
            <Board boardId={boardId} key={boardId} toDos={toDos[boardId]} />
          ))}
        </Boards>
      </Wrapper>
    </DragDropContext>
  );
}
