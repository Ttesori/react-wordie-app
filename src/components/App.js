import { useState, useEffect } from "react";
import { words, words2, getOffset } from '../helper/words';
import Board from "./Board";
import Keyboard from "./Keyboard";
import Modal from "react-modal/lib/components/Modal";

function App() {
  const [guesses, updateGuesses] = useState([]);
  const [currentWord, updateWord] = useState([]);
  const [offset, setOffset] = useState(getOffset());
  const [letters, setLetters] = useState([]);
  const [isGameOver, setGameOver] = useState(false);
  const [modalIsOpen, setIsOpen] = useState(false);
  Modal.setAppElement('#root');

  const handleClick = key => {
    if (key === 'Enter') return handleEnter();
    if (key === '<<') return handleBackspace();
    if (currentWord.length < 6) {
      updateWord([...currentWord, key])
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

    // if word is correct, game over
    if (currentWord.join('') === x) return gameOver();
  }


  const gameOver = () => {
    console.log('Game over, you win!');
    setGameOver(true);
    setIsOpen(true);
  }

  const handleBackspace = () => {
    let newWord = currentWord.slice(0, currentWord.length - 1);
    updateWord(newWord);
  }

  const handleKeys = (e) => {
    const key = e.key;
    if (key === 'Enter') return handleEnter();
    if (key === 'Backspace') return handleBackspace();
    if (e.keyCode >= 65 && e.keyCode <= 90) handleClick(key.toUpperCase());
  }

  useEffect(() => {
    document.addEventListener('keydown', handleKeys)
    return () => {
      document.removeEventListener('keydown', handleKeys)
    }
  }, [currentWord])



  return (
    <div className="App">
      <header className="header">
        <h1 className="header__title">Wordie</h1>
      </header>

      <Board guesses={guesses} currentWord={currentWord}></Board>
      {!isGameOver && <Keyboard handleClick={(e) => handleClick(e.target.value)} letters={letters} ></Keyboard>}
      {modalIsOpen && <Modal isOpen={modalIsOpen} onRequestClose={() => setIsOpen(false)}>
        <button onClick={() => setIsOpen(false)}>close</button>
        <p>Game Over, you win!</p>
      </Modal>}
    </div>
  );
}

export default App;
