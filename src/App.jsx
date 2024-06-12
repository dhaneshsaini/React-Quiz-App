import { useState } from "react"
import ques from "./data.json"


const questions = ques.sort(() => Math.random() - .5)

export default function App() {
  const [quesNum, setQuesNum] = useState(0)
  const [isQuizOver, setIsQuizOver] = useState(false)
  const [isWon, setIsWon] = useState(false)
  const [isRight, setIsRight] = useState(false)

  function handleClickonOption(index) {
    questions[quesNum].answer === index ? setIsRight(true) : setIsRight(false)

    setTimeout(() => {
      if (questions[quesNum].answer === index) {
        if (quesNum + 1 !== questions.length) {
          setQuesNum(quesNum + 1)
          setIsRight(false)
        } else {
          setIsWon(true)
        }
      }
      else {
        setIsQuizOver(true)
      }
    }, 1000)
  }

  return (
    <section className="relative max-w-md mx-auto min-h-screen bg-[#f0ece5] p-5">
      <div>
        <div>
          <h1 className="text-3xl text-center">Quiz</h1>
          <span className="text-xs">Question {quesNum + 1} of {questions.length}</span>
        </div>
        <div>
          <h2 className="text-xl font-medium mb-4 mt-2">{questions[quesNum].question}</h2>
          <ul className="grid gap-3">
            {questions[quesNum].options.map((item, i) =>
              <li className={`p-3 rounded-lg hover:bg-[#ddd9d6] cursor-pointer bg-white drop-shadow-md ${isRight && questions[quesNum].answer === i ? 'bg-emerald-500' : 'bg-white'}`} onClick={() => handleClickonOption(i)} key={i}>{item}</li>)}
          </ul>
        </div>
      </div>

      {isQuizOver ? <ShowResult heading="Quiz Over" emoji="🤡" text="Try again next time." /> : ''}

      {isWon ? <ShowResult heading="Congratulations!" emoji="🏆" text="You've completed the quiz." /> : ''}
    </section>
  )
}

function ShowResult({ heading, emoji, text }) {
  return (
    <div className="absolute z-auto top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center bg-white drop-shadow-md px-10 py-6 rounded-lg">
      <h3 className="text-3xl font-semibold leading-loose mb-4 text-red-500">{heading}</h3>
      <span className="text-7xl">{emoji}</span>
      <p className="font-semibold my-3">{text}</p>
      <button className="bg-[#31304d] text-white font-semibold px-6 py-2 rounded-md mt-2" onClick={() => location.reload()}>Replay</button>
    </div>
  )
}