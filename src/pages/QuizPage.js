import { useState, useEffect } from 'react';

import Header from '../components/Header';

import getQuestions from '../app/questions';

export default function QuizPage() {
    const [questions, setQuestions] = useState(getQuestions(5));

    const totalScore = questions.reduce((partialTotalScore, question) => partialTotalScore + question.weight, 0);

    const [quizActive, setQuizActive] = useState(false);
    const [quizStarted, setQuizStarted] = useState(false);
    const [quizName, setQuizName] = useState('Quiz');
    const [currentQuestion, setCurrentQuestion] = useState(null);
    const [circ, setCirc] = useState(0);
    const [score, setScore] = useState(0);
    const [rightAnswers, setRightAnswers] = useState(0);
    const [time, setTime] = useState('');
    const [timeOut, setTimeOut] = useState(20);
    const [tipUsed, setTipUsed] = useState(false);

    useEffect(() => {
        if (currentQuestion !== null) {
            // let timerBorder = 0;
            // setCirc(timerBorder);
            let timerCounter = timeOut;
            setTime(timerCounter);
            const timerInterval = setInterval(() => {
                setTime(--timerCounter);
                // timerBorder += 150.796416 / (timeOut - 1);
                // setCirc(timerBorder);
            }, 1000);
            const timer = setTimeout(() => saveAnswer(), timeOut * 1000);
            return () => {
                clearTimeout(timer);
                clearInterval(timerInterval);
            };
        }
    }, [currentQuestion]);

    useEffect(() => {
        let timerBorder = 0;
        setCirc(timerBorder);
        const timerInterval = setInterval(() => {
            timerBorder += 151 / timeOut / 10;
            setCirc(timerBorder);
        }, 100);
        return () => {
            clearInterval(timerInterval);
        };
    }, [currentQuestion])

    function saveAnswer(index = false) {
        const answer = index;
        if (answer === questions[currentQuestion].correct) {
            if (tipUsed) {
                setScore(score + questions[currentQuestion].weight * 0.5);
            } else {
                setScore(score + questions[currentQuestion].weight);
            }
            setRightAnswers(rightAnswers + 1);
        }
        
        if (currentQuestion + 1 === questions.length) {
            setQuizActive(false);
            return;
        }
        setTipUsed(false);
        setCurrentQuestion(currentQuestion + 1);
    }

    return (
        <>
            <Header
                title='Bubble Quiz'
                bgColor='#66666661'
                color='#fff' />

            <div
                className='quiz'
                style={{ backgroundImage: 'url("/images/quiz-background.jpg")' }}>
                {(quizActive) ?
                    <div className='question'>
                        <div>
                            <h1>{quizName}</h1>
                            <p> Час на виконання кожного завдання - {timeOut} секунд</p>
                            <p>Використання підказки зменшує кількість балів за питання на 50%</p>
                        </div>
                        <div className='question-bubbles'>
                            {
                                questions.map((question, index) => {
                                    return <span className={currentQuestion !== index || 'active'}>
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
                            <div className='countdown'>
                                <div className='countdown-number'>{time}</div>
                                <svg>
                                    <circle style={{ strokeDashoffset: circ + 'px' }} r="24" cx="25" cy="25"></circle>
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
                            <button onClick={() => {
                                setQuizActive(false)
                            }}>
                                Завершити квіз
                            </button>
                        </div>
                    </div>
                    : (quizStarted) ?
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
                        <div className='quiz-menu'>
                            <h1>Список квізів</h1>
                            <div>
                                <h2>Квіз #1</h2>
                                <p>5 питань, 20 секунд на питання</p>
                                <button
                                    onClick={() => {
                                        setQuizName('Квіз #1')
                                        setTimeOut(20);
                                        setQuestions(getQuestions(5));
                                        setCurrentQuestion(0);
                                        setQuizStarted(true);
                                        setQuizActive(true);
                                    }}>
                                    Почати квіз
                                </button>
                            </div>
                            <div>
                                <h2>Квіз #2</h2>
                                <p>7 питань, 10 секунд на питання</p>
                                <button
                                    onClick={() => {
                                        setQuizName('Квіз #2')
                                        setTimeOut(10);
                                        setQuestions(getQuestions(7));
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
        </>
    )
}