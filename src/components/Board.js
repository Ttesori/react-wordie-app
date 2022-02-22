import { useEffect, useState } from "react";
import Guess from "./Guess";

export default function Board({ currentWord, guesses }) {
  const [currentRow, updateRow] = useState(guesses.length);
  const [guessEls, updateGuessEls] = useState([]);

  useEffect(() => {
    console.log('updating board', currentWord, guesses)
    const newGuessEls = [];
    for (let i = 0; i < 6; i++) {
      if (guesses && guesses[i]) {
        newGuessEls.push(<Guess guess={guesses[i].word} grade={guesses[i].grade} key={i} />)
      } else if (i === guesses.length) {
        newGuessEls.push(<Guess guess={currentWord} key={i} />)
      } else {
        newGuessEls.push(<Guess key={i} />)
      }
    }
    updateGuessEls([...newGuessEls]);

  }, [currentWord, guesses])





  useEffect(() => {
    updateRow(guesses.length)

  }, [guesses])

  return (
    <div className="board">
      {guessEls}

    </div>
  )
}
