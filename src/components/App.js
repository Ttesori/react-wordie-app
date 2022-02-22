import { useState, useEffect } from "react";
import { words, words2, getOffset } from '../helper/words';
import Board from "./Board";
import Keyboard from "./Keyboard";

function App() {
  const [guesses, updateGuesses] = useState([]);
  const [currentWord, updateWord] = useState('');
  const [offset, setOffset] = useState(getOffset());
  const [letters, setLetters] = useState([]);
  console.log(words2[offset]);


  const handleClick = e => {
    const key = e.target.value;
    console.log(key);
    if (key === 'Enter') return handleEnter();
    if (key === '<<') return handleBackspace();

    if (currentWord.length < 6) {
      updateWord([...currentWord, e.target.value])
      console.log('word updated');
    }

  }
  const handleEnter = () => {
    const wordToCheck = currentWord.join('').toLowerCase();
    const x = words2[offset].toUpperCase();
    // check if word is in dictionary
    if (words.indexOf(wordToCheck) === -1) {
      console.log('word not found');
      return false;
    }

    // if word is correct, game over
    if (currentWord.join('') === x) return gameOver();

    // build result
    let grade = [];
    let newLetters = {}
    currentWord.forEach((letter, i) => {
      if (letter === x[i]) {
        // letter is in correct spot
        grade[i] = 2;
        newLetters[letter] = 2;
      } else if (x.indexOf(letter) !== -1) {
        // right letter, wrong spot
        grade[i] = 1;
        newLetters[letter] = 1;
      } else {
        // wrong letter
        grade[i] = 0;
        newLetters[letter] = 0;
      }
    });
    setLetters({ ...letters, ...newLetters });
    updateGuesses([...guesses, {
      word: currentWord,
      grade: grade
    }]);
    updateWord('');
  }


  const gameOver = () => {
    console.log('Game over, you win!');
  }

  const handleBackspace = () => {
    let newWord = currentWord.slice(0, currentWord.length - 1);
    console.log('removing char', newWord);
    updateWord(newWord);
  }


  return (
    <div className="App">
      <h1>Wordie</h1>
      <Board guesses={guesses} currentWord={currentWord}></Board>
      <Keyboard handleClick={handleClick} letters={letters} ></Keyboard>
    </div>
  );
}

export default App;
