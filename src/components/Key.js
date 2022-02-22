import { useEffect, useState } from "react";

export default function Key({ keyValue, handleClick, correct }) {
  const [buttonEl, setButtonEl] = useState([]);
  useEffect(() => {
    console.log('classname', correct)
    setButtonEl(<button className={"key key--correct-" + correct} onClick={handleClick} value={keyValue}>{keyValue}</button>)


  }, [correct, handleClick, keyValue])

  return (
    <>
      {buttonEl}
    </>
  )
}
