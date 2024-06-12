import { useState } from "react"
import ques from "./data.json"


const questions = ques.sort(() => Math.random() - .5)

export default function App() {
  const [quesNum, setQuesNum] = useState(0)
  const [isQuizOver, setIsQuizOver] = useState(false)
  const [isWon, setIsWon] = useState(false)

  function handleClickonOption(index) {
    setTimeout(() => {
      if (questions[quesNum].answer === index) {
        if (quesNum + 1 !== questions.length) {
          setQuesNum(quesNum + 1)
        }
        else {
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
        <div className="text-center">
          <h1 className="text-3xl">Quiz</h1>
        </div>
        <div>
          <span className="text-xs">Question {quesNum + 1} of {questions.length}</span>
        </div>
        <div>
          <h1 className="text-xl font-medium mb-4 mt-2">{questions[quesNum].question}</h1>
          <ul className="grid gap-3">
            {questions[quesNum].options.map((item, i) =>
              <li className="p-3 rounded-lg hover:bg-[#ddd9d6] cursor-pointer bg-white drop-shadow-md" onClick={() => handleClickonOption(i)} key={i}>{item}</li>)}
          </ul>
        </div>
      </div>


      {isWon ? <div className="absolute z-auto top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center bg-white drop-shadow-md px-10 py-6 rounded-lg">
        <div>
          <h1 className="text-3xl font-semibold leading-loose mb-4 text-emerald-500">Congratulations</h1>
          <span className="text-7xl">🏆</span>
          <p className="text-lg font-semibold mt-3">You've completed the quiz</p>

          <button className="bg-[#31304d] text-white font-semibold px-6 py-2 rounded-md mt-2" onClick={() => location.reload()}>Replay</button>
        </div>
      </div> : ''}

      {isQuizOver ? <div className="absolute z-auto top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center bg-white drop-shadow-md px-10 py-6 rounded-lg">
        <div>
          <h1 className="text-3xl font-semibold leading-loose mb-4 text-red-500">Quiz Over</h1>
          <span className="text-7xl">🤡</span>
          <p className="font-semibold my-3">Try again next time.</p>

          <button className="bg-[#31304d] text-white font-semibold px-6 py-2 rounded-md mt-2" onClick={() => location.reload()}>Replay</button>
        </div>
      </div> : ''}
    </section>
  )
}