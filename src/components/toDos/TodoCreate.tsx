import { faAdd } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import styled from "styled-components";

const Form = styled.form``;
const TodoFormButton = styled.button`
  margin-top: 10px;
  display: flex;
  align-items: center;
`;
const TodoCreateButton = styled.button`
  cursor: pointer;
  display: flex;
  align-items: center;
`;
export default function TodoCreate() {
  return (
    <Form>
      <TodoFormButton>Save</TodoFormButton>
      <TodoCreateButton>
        <FontAwesomeIcon icon={faAdd} color={"white"} size={"lg"} />
      </TodoCreateButton>
    </Form>
  );
}
