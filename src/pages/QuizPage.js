import { useState, useEffect } from 'react';
import getQuestions from '../app/questions';

function QuizPage() {
    const questions = getQuestions();
    const totalScore = questions.reduce((partialTotalScore, question) => partialTotalScore + question.weight, 0);
    const statusBarWidth = 100 / questions.length;

    const [quizActive, setQuizActive] = useState(false);
    const [quizStarted, setQuizStarted] = useState(false);
    const [currentQuestion, setCurrentQuestion] = useState(null);
    const [statusWidth, setStatusWidth] = useState(statusBarWidth);
    const [circ, setCirc] = useState(0);
    const [score, setScore] = useState(0);
    const [rightAnswers, setRightAnswers] = useState(0);
    const [time, setTime] = useState('');
    const [timeOut, setTimeOut] = useState(100);
    const [tipUsed, setTipUsed] = useState(false);

    useEffect(() => {
        if (currentQuestion !== null) {
            let timerBorder = 0;
            setCirc(timerBorder);
            let timerCounter = 10;
            setTime(timerCounter);
            const timerInterval = setInterval(() => {
                setTime(--timerCounter);
                timerBorder += 11.5;
                setCirc(timerBorder);
            }, 1000);
            const timer = setTimeout(() => saveAnswer(), timeOut * 1000);
            return () => {
                clearTimeout(timer);
                clearInterval(timerInterval);
            };
        }
    }, [currentQuestion]);

    function saveAnswer(index = false) {
        const answer = index;
        if (answer === questions[currentQuestion].correct) {
            if (tipUsed) {
                setScore(score + questions[currentQuestion].weight * 0.5);
            } else {
                setScore(score + questions[currentQuestion].weight);
            }
            setRightAnswers(rightAnswers + 1);
        } else {
            console.log('incorrect');
        }
        if (currentQuestion + 1 === questions.length) {
            setQuizActive(false);
            setStatusWidth(statusBarWidth);
            return;
        }
        setTipUsed(false);
        setCurrentQuestion(currentQuestion + 1);
        setStatusWidth(statusWidth + statusBarWidth);
    }

    return (
        <div className='quiz'>
            {console.log('render')}
            {(quizActive) ?
                <div className='question'>
                    <div>
                        <h1>Quiz</h1>
                        <p> Час на виконання кожного завдання - {timeOut} секунд</p>
                        <p>Використання підказки зменшує кількість балів за питання на 50%</p>
                    </div>
                    <div className='question-info'>
                        <div className='status-bar {' style={{ width: statusWidth + '%' }}></div>
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
                                onClick={() => setTipUsed(true)}
                                style={(tipUsed) ? { display: 'none' } : {}}>
                                Використати підказку
                            </button>
                            {
                                (tipUsed) ?
                                    <div>
                                        <h6>Підказка:</h6>
                                        <p>
                                            {questions[currentQuestion].tip}
                                        </p>
                                    </div>
                                    : null
                            }
                        </div>
                        <div id="countdown">
                            <div id="countdown-number">{time}</div>
                            <svg>
                                <circle style={{ strokeDashoffset: circ + 'px' }} r="18" cx="20" cy="20"></circle>
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
                    <div>
                        <button onClick={() => {setCurrentQuestion(questions.length)}}>

                        </button>
                    </div>
                </div>
                : (quizStarted) ?
                    <div>
                        <h2>
                            Ваш результат: {score} з {totalScore} балів
                        </h2>
                        <h3>
                            Правильних відповідей: {rightAnswers} з {questions.length}
                        </h3>
                        <div className='results-control'>
                            <button onClick={() => {
                                setTipUsed(false);
                                setScore(0);
                                setRightAnswers(0);
                                setCurrentQuestion(0);
                                setQuizActive(true);
                            }}>
                                Почати квіз заново
                            </button>
                            <button onClick={() => {
                                setTipUsed(false);
                                setScore(0);
                                setRightAnswers(0);
                                setCurrentQuestion(null);
                                setQuizStarted(false);
                                setQuizActive(false);

                            }}>
                                До списку квізів
                            </button>
                        </div>
                    </div>
                    :
                    <div>
                        <h1>Список квізів</h1>
                        <div>
                            <h2>Квіз 1</h2>
                            <button
                                onClick={() => {
                                    setCurrentQuestion(0);
                                    setQuizStarted(true);
                                    setQuizActive(true);
                                }}>
                                Почати квіз
                            </button>
                        </div>
                        <div>
                            <h2>Квіз 1</h2>
                            <button
                                onClick={() => {
                                    setCurrentQuestion(0);
                                    setQuizStarted(true);
                                    setQuizActive(true);
                                }}>
                                Почати квіз
                            </button>
                        </div>
                    </div>
            }
        </div>
    )
}

export default QuizPage;