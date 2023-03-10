import React from 'react';

export default function QuizResults({score, totalScore, answers, rightAnswersAmount, startAgain, toQuizList}) {
    return (
        <div className='quiz-results'>
            <h2>
                Ваш результат
                <span>
                    {score}
                </span>
                <span>
                    з {totalScore} балів
                </span>
            </h2>
            <h3>
                Правильних відповідей: {rightAnswersAmount} з {answers}
            </h3>
            <div className='results-control'>
                <button onClick={startAgain}>
                    Почати квіз заново
                </button>
                <button onClick={toQuizList}>
                    До списку квізів
                </button>
            </div>
        </div>
    );
}