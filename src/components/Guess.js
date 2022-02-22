import Letter from './Letter';
import { useState, useEffect } from 'react';

export default function Guess({ guess, grade }) {
  const [lettersEl, updateLettersEl] = useState([]);


  useEffect(() => {
    console.log('updating guess', guess)
    const newLettersEl = [];
    for (let i = 0; i < 6; i++) {
      if (guess && guess[i]) {
        newLettersEl.push(<Letter key={i} letter={guess[i]} grade={grade && grade[i]} />)
      } else {
        newLettersEl.push(<Letter key={i} isEmpty={true} />)
      }
    }
    updateLettersEl([...newLettersEl])

  }, [guess, grade])

  return (
    <div className="board__guess">
      {lettersEl}
    </div>
  )
}
