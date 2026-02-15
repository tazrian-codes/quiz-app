import { useState } from 'react'
import './App.css'
import { questions } from './assets/questions.js'

function App() {
  const [currentQues, setCurrentQues] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showScore, setShowScore] = useState(false);

  const nextQues = () => {
    if (currentQues + 1 < questions.length){
      setCurrentQues(currentQues + 1);
      setAnswered(false);
      setSelectedOption(null);
    } else {
      setShowScore(true);
    }
  };

  const handleOptClick = (option) => {
    setSelectedOption(option);
    setAnswered(true);

    if (option.isCorrect) {
      setScore(score+1);
    }
  };

   if (showScore) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="bg-white p-6 rounded shadow text-center">
          <h2 className="text-xl font-bold">
            Your Score: {score} / {questions.length}
          </h2>
        </div>
      </div>
    );
  }

  return (
    <div className='flex items-center justify-center h-screen bg-[rgb(242,255,255)]'>
      
        <div className="w-10/12 md:7/12 max-w-96 border border-gray-600 rounded-md
          shadow-[0px_0px_10px_rgba(0,0,0,0.3)]">

          <div className="bg-[#087e79] text-white p-2 mb-5
              text-center rounded-t">
              Quiz App
          </div>

          <div className='flex justify-start p-4 font-semibold'>
            <h3 className="md:text-xl text-[#05534f]">
               { questions[currentQues].question } 
            </h3>
          </div>

          <div className="flex flex-col items-center gap-4">
            { questions[currentQues].options.map((option, id) => {
              return(
                <button className={`w-11/12 border border-gray-500 p-2 transition-shadow
                  ${
                    answered
                      ? option.isCorrect
                          ? 'bg-[rgba(34,197,94,0.25)]'
                          : selectedOption === option 
                          ? 'bg-[rgba(239,68,68,0.25)]'
                          : ''
                      :'cursor-pointer hover:border-[#087e79] hover:shadow-[0px_0px_3px_rgba(7,153,146,1.0)]'
                  }`}
                  onClick={() => handleOptClick(option)}
                  disabled = { answered }>
                  { option.text } 
                </button>
              )
            })}
          </div>
          <button className={`text-white w-11/12 p-2 mt-5 mb-2
            hover:shadow-[0px_2px_5px_rgba(0,0,0,0.3)] 
            transition-all
            ${
              answered
                ? "bg-[#087e79] cursor-pointer"
                : "bg-gray-400 cursor-not-allowed"
            }`
            } onClick={nextQues} disabled = {!answered}>
            Next Question
          </button>
          <p className='mb-2 text-sm text-gray-400'> Question {currentQues + 1} of { questions.length }</p>
        </div>
      
    </div>
  )
}

export default App
