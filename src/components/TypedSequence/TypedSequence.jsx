import { useState, useEffect } from 'react';
import styled from 'styled-components';

function TypedSequence({ strings, delayMs }) {
  const [stringsIndex, setStringsIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [typing, setTyping] = useState(true);

  const completedStrings = strings.slice(0, stringsIndex);
  const currentText =
    stringsIndex < strings.length
      ? strings[stringsIndex].slice(0, charIndex + 1)
      : null;

  useEffect(() => {
    let timeout;
    if (stringsIndex < strings.length) {
      if (charIndex < strings[stringsIndex].length) {
        timeout = setTimeout(() => {
          setCharIndex((prev) => prev + 1);
        }, delayMs);
      } else {
        timeout = setTimeout(() => {
          setStringsIndex((prev) => prev + 1);
          setCharIndex(0);
        }, delayMs);
      }
    }
    if (stringsIndex === strings.length) {
      timeout = setTimeout(() => {
        setTyping(false);
      }, delayMs);
    }

    return () => clearTimeout(timeout);
  });

  return (
    <>
      {completedStrings.map((string, index) => (
        <Paragraph key={index}>{string}</Paragraph>
      ))}
      {currentText && (
        <Paragraph>
          {currentText}
          {typing && <Cursor>Q</Cursor>}
        </Paragraph>
      )}
    </>
  );
}

const Paragraph = styled.p`
  color: #0f380f;
`;

const Cursor = styled.span`
  color: transparent;
  background-color: #0f380f;
`;

export default TypedSequence;
