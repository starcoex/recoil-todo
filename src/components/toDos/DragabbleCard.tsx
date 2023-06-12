import { Draggable } from "@hello-pangea/dnd";
import React from "react";
import styled from "styled-components";

interface IDragabbleCardProps {
  toDoId: number;
  toDoText: string;
  index: number;
}
const Card = styled.div`
  border-radius: 5px;
  margin-bottom: 5px;
  padding: 10px 10px;
  background-color: ${(props) => props.theme.cardColor};
`;
function DragabbleCard({ toDoId, index, toDoText }: IDragabbleCardProps) {
  return (
    <Draggable draggableId={toDoId + ""} index={index}>
      {(provided) => (
        <Card
          ref={provided.innerRef}
          {...provided.dragHandleProps}
          {...provided.draggableProps}
        >
          {toDoText}
        </Card>
      )}
    </Draggable>
  );
}
export default React.memo(DragabbleCard);
