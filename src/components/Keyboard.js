import { useState, useEffect } from "react";
import Key from "./Key";

export default function Keyboard({ handleClick, letters }) {
  const [keysEls, setKeysEls] = useState([]);


  useEffect(() => {
    console.log('letters updated', letters)
    const keys = [
      [
        "Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"
      ],
      [
        "A", "S", "D", "F", "G", "H", "J", "K", "L"
      ],
      [
        "Z", "X", "C", "V", "B", "N", "M"
      ],
      [
        "Enter", "<<"
      ]
    ]
    const rows = []
    keys.forEach(row => {
      const keysEls = [];

      row.map((letter, i) => keysEls.push(<Key handleClick={handleClick} keyValue={letter} key={'key' + i} correct={letters[letter]} />));
      rows.push(keysEls);
    });
    setKeysEls(rows.map(row => <div className="row">{row}</div>));
  }, [letters, handleClick])

  return (
    <>
      {keysEls}
    </>

  )
}
