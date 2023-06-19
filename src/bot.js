import React, { useState } from 'react';
import './Bot.css'; // Import the CSS file for styling (Bot.css)

const questions = [
  {
    question: 'What is the capital of France?',
    answer: 'Paris',
  },
  {
    question: 'Who painted the Mona Lisa?',
    answer: 'Leonardo da Vinci',
  },
  {
    question: 'What is the largest planet in our solar system?',
    answer: 'Jupiter',
  },
  {
    question: 'What is the capital city of Tanzania?',
    answer: 'Dodoma',
  },
  {
    question: 'What is the largest country in East Africa?',
    answer: 'Tanzania',
  },
];

const Bot = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [isAnswerCorrect, setIsAnswerCorrect] = useState(null);
  const [wrongTries, setWrongTries] = useState(0);

  const handleAnswerChange = (event) => {
    setUserAnswer(event.target.value);
  };

  const handleAnswerSubmit = () => {
    const currentQuestion = questions[currentQuestionIndex];
    const isCorrect = userAnswer.toLowerCase() === currentQuestion.answer.toLowerCase();

    if (isCorrect) {
      setIsAnswerCorrect(true);
      setWrongTries(0);
      setTimeout(() => {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setUserAnswer('');
        setIsAnswerCorrect(null);
      }, 2000);
    } else {
      setWrongTries(wrongTries + 1);

      if (wrongTries === 1) {
        setIsAnswerCorrect(false);
        setTimeout(() => {
          setIsAnswerCorrect(null);
        }, 2000);
      }
    }
  };

  if (currentQuestionIndex >= questions.length) {
    return (
      <div className="phone-container">
        <div className="phone-content">
          <h3>All questions answered!</h3>
          <p>Thank you for playing.</p>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="phone-container">
      <div className="phone-content">
        <h3>Question {currentQuestionIndex + 1}</h3>
        <p>{currentQuestion.question}</p>

        <input
          type="text"
          value={userAnswer}
          onChange={handleAnswerChange}
          placeholder="Type your answer..."
        />

        <button onClick={handleAnswerSubmit}>Submit</button>

        {isAnswerCorrect !== null && (
          <p className={isAnswerCorrect ? 'answer-correct' : 'answer-wrong'}>
            {isAnswerCorrect ? 'Correct!' : 'Wrong!'}
          </p>
        )}

        {wrongTries === 1 && (
          <p className="answer-correct">
            The correct answer is: {currentQuestion.answer}
          </p>
        )}
      </div>
    </div>
  );
};

export default Bot;
