import React from 'react';
import styled from 'styled-components';
import Pokemon from '../Pokemon/Pokemon';

const empty = [152, 153, 154, 155, 156, 157, 158, 159];

function DexButtons({ pokemon, shuffling, current, ok, fail }) {
  if (pokemon.length === 0) {
    return (
      <Buttons>
        {empty.map((num, index) => {
          const delay = 0.01 + index / 60;
          return <Pokemon key={num} blinking={true} delay={delay} />;
        })}
      </Buttons>
    );
  }

  return (
    <Buttons>
      {pokemon.map((data, index) => {
        const delay = 0.1 + index / 10;
        return (
          <Pokemon
            key={data.id}
            data={data}
            blinking={shuffling}
            delay={delay}
            ok={() => ok(data)}
            fail={fail}
            selected={data.id === current?.id}
          />
        );
      })}
    </Buttons>
  );
}

const Buttons = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  align-content: center;
  flex-wrap: wrap;
  max-width: 418px;
`;

export default DexButtons;
