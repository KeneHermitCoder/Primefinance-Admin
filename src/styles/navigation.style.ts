import styled from "styled-components";
import { NavLink } from "react-router-dom";

export const Navigation = styled.div`
  background: #100f0e;
  overflow-y: scroll;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }

  -ms-overflow-style: none;
`;

export const Accordion = styled.div`
  margin: ${(props) => `${props.ww(4)}rem`} auto;
  display: flex;
  flex-direction: column;
  width: ${(props) => `${props.ww(28)}rem`};
  gap: ${(props) => `${props.ww(2.5)}rem`};
`;

export const AccordionContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${(props) => `${props.ww(2)}rem`};
`;

export const AccordionItem = styled.button`
  height: ${(props) => `${props.ww(4.8)}rem`};
  padding: ${(props) => `${props.ww(1.2)}rem`};
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: none;
  color: #8993a8;
  border: none;
  transition: all 0.3s;
  cursor: pointer;
  font-size: ${(props) => `${props.ww(1.5)}rem`};
  font-weight: 400;

  &:hover,
  &:active {
    background: #c3ad60;
    border-radius: 4px;
    color: #000;
  }
`;

export const AccordionLink = styled(NavLink)`
  height: ${(props) => `${props.ww(4.8)}rem`};
  padding: ${(props) => `${props.ww(1.2)}rem`};
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: none;
  color: #8993a8;
  border: none;
  transition: all 0.3s;
  cursor: pointer;
  font-size: ${(props) => `${props.ww(1.5)}rem`};
  font-weight: 400;
  border-radius: 4px;

  &:hover,
  &:active {
    background: #c3ad60;
    border-radius: 4px;
    color: #000;
  }
`;

export const AccordionDrop = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${(props) => `${props.ww(1)}rem`};
`;

export const DropBtn = styled(NavLink)`
  display: flex;
  align-items: center;
  background: none;
  border: none;
  width: ${(props) => `${props.ww(28)}rem`};
  height: ${(props) => `${props.ww(4.6)}rem`};
  padding-left: ${(props) => `${props.ww(4)}rem`};
  cursor: pointer;
  color: #8993a8;
  font-size: ${(props) => `${props.ww(1.5)}rem`};
  font-weight: 400;
  border-radius: 4px;
`;