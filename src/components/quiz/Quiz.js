import React, {useState, useEffect} from 'react';

export default function Quiz({quizName, questions, currentQuestion, timer, timeOut, tipHandler, tipUsed, saveAnswer, endQuiz}) {
    const [countdownStroke, setCountdownStroke] = useState(0);

    useEffect(() => {
        let timerBorder = 0;
        setCountdownStroke(timerBorder);
        const timerInterval = setInterval(() => {
            timerBorder += 151 / timeOut / 10;
            setCountdownStroke(timerBorder);
        }, 100);

        return () => clearInterval(timerInterval);
    }, [currentQuestion])

    return (
        <div className='question'>
            <div>
                <h1>
                    {quizName}
                </h1>
                <p>
                    Час на виконання кожного завдання - {timeOut} секунд
                </p>
                <p>
                    Використання підказки зменшує кількість балів за питання на 50%
                </p>
            </div>
            <div className='question-bubbles'>
                {
                    questions.map((question, index) => {
                        return <span key={index} className={(currentQuestion === index) ? 'active' : ''}>
                            {index + 1}
                        </span>
                    })
                }
            </div>
            <div className='question-info'>
                <h2>
                    Питання {questions[currentQuestion].number} з {questions.length}
                </h2>
                <h4>
                    Балів за питання: {questions[currentQuestion].weight}
                </h4>
                <p className='question-text'>
                    {questions[currentQuestion].text}
                </p>
                <div className='tip'>
                    <button
                        onClick={tipHandler}
                        style={(tipUsed) ? { display: 'none' } : {}}>
                        Використати підказку
                    </button>
                    {tipUsed 
                        ? <div>
                            <h6>Підказка:</h6>
                            <p>{questions[currentQuestion].tip}</p>
                        </div>
                        : null
                    }
                </div>
                <div className='countdown'>
                    <div className='countdown-number'>
                        {timer}
                    </div>
                    <svg>
                        <circle style={{ strokeDashoffset: countdownStroke + 'px' }} r="24" cx="25" cy="25"></circle>
                    </svg>
                </div>
            </div>
            <div className='answers'>
                {questions[currentQuestion].answers.map((answer, index) => {
                    return (
                        <button key={index} data-index={index} onClick={() => saveAnswer(index)}>{answer}</button>
                    )
                })}
            </div>
            <div className='quiz-end'>
                <button onClick={endQuiz}>Завершити квіз</button>
            </div>
        </div>
    );
}