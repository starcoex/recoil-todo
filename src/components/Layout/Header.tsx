import React from "react";
import styled from "styled-components";
import { StyledAvatar } from "../toDos/styledComponents/StyledComponents";

const Containes = styled.div`
  background-color: #026aa7;
  display: flex;
  min-height: 40px;
  max-height: 40px;
  position: fixed;
  width: 100%;
`;
const Logo = styled.div`
  background: url("/assets/images/logo.png") no-repeat 100% 0 / cover;
  height: 30px;
  width: 80px;
  display: block;
  position: absolute;
  left: 50%;
  top: 5px;
  transform: translateX(-50%);
  opacity: 0.5;
  background-color: tomato;
`;
const Right = styled.div`
  display: flex;
  justify-content: flex-end;
  background-color: tomato;
  flex-grow: 1;
`;
const HeaderAvatar = styled.div`
  img {
    display: block;
    position: absolute;
    left: 99%;
    top: 5px;
    transform: translateX(-50%);
    opacity: 1;
    width: 32px;
    height: 32px;
  }
`;

export default function Header() {
  return (
    <div>
      <Containes>
        <Logo />
        <Right>
          <HeaderAvatar>
            <StyledAvatar src="./assets/images/starcoex.png" />
          </HeaderAvatar>
        </Right>
      </Containes>
    </div>
  );
}
