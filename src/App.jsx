import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { getDetails } from './utils';

import DexButtons from './components/DexButtons/DexButtons';
import TypedSequence from './components/TypedSequence/TypedSequence';
import Pokeball from './components/Pokeball/Pokeball';

function App() {
  const [pokemon, setPokemon] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentSelection, setCurrentSelection] = useState(null);
  const [currentStreak, setCurrentStreak] = useState(0);
  const [shuffling, setShuffling] = useState(false);

  const displayLanding = pokemon.length === 0 && !loading;
  const displaySelected = !!currentSelection;
  const displayShuffle = !!shuffling;
  const end = currentStreak === 8;
  const displayChoose =
    !displayLanding && !displaySelected && !displayShuffle && !end;

  async function getRandomPokemonSet(amount) {
    setLoading(true);
    const set = [];
    let tries = 0;
    while (set.length < amount && tries < 30) {
      const id = Math.ceil(Math.random() * 151);
      if (set.some((element) => element.id === id)) continue;
      try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        const data = await response.json();
        set.push(data);
      } catch (error) {
        console.log(error);
      }
      tries++;
    }
    console.log(set);
    setPokemon(set);
    setLoading(false);
  }

  useEffect(() => {
    if (!currentSelection) return;

    const timeout = setTimeout(() => {
      setShuffling(true);
      setCurrentSelection(null);
    }, 3000);

    return () => {
      if (timeout) {
        clearTimeout(timeout);
      }
    };
  }, [currentSelection]);

  useEffect(() => {
    if (!shuffling) return;

    pokemon.sort(() => 0.5 - Math.random());

    const timeout = setTimeout(() => {
      setShuffling(false);
    }, 2000);

    return () => {
      if (timeout) {
        clearTimeout(timeout);
      }
    };
  }, [shuffling, pokemon]);

  function handleOk(data) {
    setCurrentSelection(data);
    setCurrentStreak((prev) => prev + 1);
  }

  function handleRepeat() {
    setCurrentStreak(0);
    setCurrentSelection(null);
    setPokemon([]);
  }

  return (
    <Wrapper>
      <MainDisplay>
        <Content>
          {loading && <p>Loading...</p>}
          {displayLanding && (
            <>
              <TypedSequence
                strings={[
                  '// ERROR: Pokemon data corrupted',
                  'Entering diagnostic mode...',
                  'Tracking unique selections...',
                  'Please try again.',
                ]}
                delayMs={20}
              />
              <Button onClick={() => getRandomPokemonSet(8)}>
                Upload New Pokemon
              </Button>
            </>
          )}
          {displaySelected && (
            <TypedSequence
              strings={getDetails(currentSelection)}
              delayMs={20}
            />
          )}
          {displayShuffle && (
            <TypedSequence
              strings={[
                '~/Connection interrupted',
                'Retrieving session data...',
              ]}
              delayMs={20}
            />
          )}
          {displayChoose && (
            <>
              <TypedSequence
                strings={['Choose next unique pokemon to analyze.']}
                delayMs={30}
              />
              <Pokeball />
            </>
          )}
          {end && (
            <>
              <TypedSequence
                strings={[
                  'Pokemon successfully logged.',
                  'Detected need for further diagnostics.',
                  'Awaiting new data...',
                ]}
              />
              <Button onClick={() => getRandomPokemonSet(8)}>
                Upload New Pokemon
              </Button>
            </>
          )}
        </Content>
        <Streak>Streak: {currentStreak}</Streak>
      </MainDisplay>
      <DexButtons
        pokemon={pokemon}
        shuffling={shuffling}
        current={currentSelection}
        ok={handleOk}
        fail={handleRepeat}
      />
    </Wrapper>
  );
}

const Wrapper = styled.main`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 3rem;
  padding: 2rem;

  @media (max-width: 778px) {
    flex-direction: column;
    align-items: center;
  }
`;

const MainDisplay = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40dvh;
  height: 40dvh;
  border: 6px inset crimson;
  padding: 3rem;
  background-color: #9bbc0f;
  border-radius: 8px;
`;

const Content = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
`;

const Button = styled.button`
  width: max-content;
  margin-top: 1.5rem;
  align-self: center;
  background-color: #0f380f;
  color: #9bbc0f;
  border: none;
  border-radius: 6px;
  padding: 0.5rem;
  padding-bottom: 0.3rem;
`;

const Streak = styled.p`
  position: absolute;
  color: #0f380f;
  top: 0.5rem;
  right: 0.5rem;
`;

export default App;
