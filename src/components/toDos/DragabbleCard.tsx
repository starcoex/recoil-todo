import { faEdit, faL, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Draggable } from "@hello-pangea/dnd";
import React, { useState } from "react";
import styled from "styled-components";

interface IDragabbleCardProps {
  toDoId: number;
  toDoText: string;
  index: number;
}
const TodoCard = styled.div`
  white-space: pre-wrap;
  max-width: 331px;
  min-height: 100px;
  border-radius: 5px;
  box-shadow: 0px 2px 1px -1px rgba(0, 0, 0, 0.2),
    0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 1px 3px 0px rgba(0, 0, 0, 0.12);
  margin-bottom: 10px;

  position: relative;
  /* border-radius: 5px;
  margin-bottom: 5px;
  padding: 10px 10px;
  background-color: ${(props) => props.theme.cardColor}; */
`;
const TodoCardButton = styled.button`
  position: absolute;
  top: -20px;
  right: 5px;
  /* display: none; */
  flex-direction: column;
`;
const TodoCardTitle = styled.div`
  width: 92%;
  min-height: 50px;
  line-height: 18px;
`;
const TodoCardMember = styled.div`
  /* display: block; */
  width: 100%;
  text-align: right;
  width: 28px;
  height: 28px;
  /* margin: 0 auto; */
  img {
    width: 28px;
    height: 28px;
    & + img {
      margin-left: 7px;
    }
  }
`;
const Avatar = styled.img``;

function DragabbleCard({ toDoId, index, toDoText }: IDragabbleCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [listTitle, setListTitle] = useState(toDoText);
  const handleFocus = () => {};
  const handleEditTitleList = () => {};
  const handleRemove = () => {};
  return (
    <Draggable draggableId={toDoId + ""} index={index}>
      {(provided) => (
        <TodoCard
          ref={provided.innerRef}
          {...provided.dragHandleProps}
          {...provided.draggableProps}
        >
          {toDoText}
          <TodoCard>
            <TodoCardButton>
              <FontAwesomeIcon icon={faEdit} color={"white"} size={"lg"} />
              <FontAwesomeIcon icon={faTrash} color={"white"} size={"lg"} />
            </TodoCardButton>
            <TodoCardTitle>{toDoText}</TodoCardTitle>
            <TodoCardMember>
              <Avatar src="./assets/images/starcoex.png" alt="avatar" />
            </TodoCardMember>
          </TodoCard>
        </TodoCard>
      )}
    </Draggable>
  );
}
export default React.memo(DragabbleCard);
