import React from 'react';
import styled, { keyframes } from 'styled-components';

function Pokeball() {
  return (
    <Wrapper>
      <Top></Top>
      <Bottom></Bottom>
      <Center></Center>
    </Wrapper>
  );
}

const rock = keyframes`
  0% {
    transform: rotate(0);
  }
  25% {
    transform: rotate(-40deg)
  }
  50% {
    transform: rotate(40deg);
  }
  75%, 100% {
    transform: rotate(0);
  }
`;

const Wrapper = styled.div`
  --width: 26px;
  --height: 13px;
  position: relative;
  align-self: center;

  animation: 1s ease-in 2s infinite ${rock};
`;

const Top = styled.div`
  --radius: 20px;
  width: var(--width);
  height: var(--height);
  border-top-left-radius: var(--radius);
  border-top-right-radius: var(--radius);
  background-color: #306230;
  border: 1px solid #0f380f;
`;

const Bottom = styled.div`
  --radius: 20px;
  width: var(--width);
  height: var(--height);
  border-bottom-left-radius: var(--radius);
  border-bottom-right-radius: var(--radius);
  background-color: #9bbc0f;
  border: 1px solid #0f380f;
`;

const Center = styled.div`
  --dimensions: calc(var(--width) * 0.3);

  position: absolute;
  top: 50%;
  left: 50%;
  width: var(--dimensions);
  height: var(--dimensions);
  border-radius: 50%;
  border: 1px solid #0f380f;
  background-color: #9bbc0f;
  transform: translate(-50%, -40%);
`;

export default Pokeball;
