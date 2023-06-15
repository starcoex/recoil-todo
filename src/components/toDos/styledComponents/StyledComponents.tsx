import styled from "styled-components";

export const StyledButton = styled.button`
  outline: 0;
  border: 0;
  background-color: transparent;
  cursor: pointer;
  padding: calc(0.375rem - 3px) 12px;
  svg {
    width: 16px;
    height: 16px;
  }
  &:active {
    background-color: #c6c6c6;
  }
`;

export const StyledAvatar = styled.img`
  vertical-align: middle;
  width: 100%;
  border-radius: 50%;
`;
