export default function Letter({ letter, isEmpty, grade }) {
  return (
    <div className={"guess__letter guess__letter-" + grade}>{!isEmpty && letter}</div>
  )
}
