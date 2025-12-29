import { useState } from 'react';
import styled, { keyframes } from 'styled-components';

function Pokemon({ data, ok, fail, selected, blinking, delay }) {
  const [clicked, setClicked] = useState(false);

  function handleClick() {
    if (clicked) {
      fail();
      return;
    }
    setClicked(true);
    ok();
  }

  if (blinking) {
    return <BlinkingButton $delay={delay}></BlinkingButton>;
  }

  return (
    <Button $selected={selected} onClick={handleClick}>
      <img src={data.sprites.front_default} />
    </Button>
  );
}

const blink = keyframes`
  from {
    background-color: deepskyblue;
  }

  to {
    background-color: orangered;
  }
`;

const Button = styled.button`
  min-width: 104px;
  height: 104px;
  background-color: ${(props) => (props.$selected ? 'lime' : 'deepskyblue')};
  border: 4px outset midnightblue;
  padding: 0;
  cursor: pointer;
`;

const BlinkingButton = styled(Button)`
  animation: 1s linear ${(props) => props.$delay}s infinite alternate ${blink};
`;

export default Pokemon;
