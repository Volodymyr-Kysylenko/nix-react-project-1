import React, { useState, useEffect } from 'react';

import Header from '../components/Header';
import QuizList from '../components/quiz/QuizList';
import Quiz from '../components/quiz/Quiz';
import QuizResults from '../components/quiz/QuizResults';

export default function QuizPage() {
    const [loading, setLoading] = useState(false);

    const [quizActive, setQuizActive] = useState(false);
    const [quizStarted, setQuizStarted] = useState(false);

    const [questions, setQuestions] = useState([]);
    const [quizName, setQuizName] = useState('');
    const [currentQuestion, setCurrentQuestion] = useState(null);
    
    const [score, setScore] = useState(0);
    const [totalScore, setTotalScore] = useState(0);
    const [rightAnswers, setRightAnswers] = useState(0);
    const [tipUsed, setTipUsed] = useState(false);

    const [timer, setTimer] = useState('');
    const [timeOut, setTimeOut] = useState(20);

    useEffect(() => {
        if (currentQuestion !== null) {
            let timerCounter = timeOut;
            setTimer(timerCounter);
            const timerInterval = setInterval(() => {
                setTimer(--timerCounter);
            }, 1000);
            const timer = setTimeout(() => saveAnswer(), timeOut * 1000);

            return () => {
                clearTimeout(timer);
                clearInterval(timerInterval);
            };
        }
    }, [currentQuestion]);

    function startQuiz(id) {
        setLoading(true);
        setQuizActive(true);
        fetch('https://nix-project.herokuapp.com/api/quiz', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({id: id})
        })
            .then(res => res.json())
            .then(res => {
                setQuizName(res.name);
                setQuestions(res.questions);
                setTimeOut(res.timer);
                setTotalScore(res.questions.reduce((partialTotalScore, question) => partialTotalScore + question.weight, 0));
            }).then(() => {
                setCurrentQuestion(0);
                setQuizStarted(true);
                setLoading(false);
            });
    }

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

    function tipHandler() {
        setTipUsed(true);
    }

    function endQuiz() {
        setQuizActive(false);
    }

    function startAgain() {
        clearQuizProgress();
        setCurrentQuestion(0);
        setQuizActive(true);
    }

    function toQuizList() {
        clearQuizProgress();
        setCurrentQuestion(null);
        setQuizStarted(false);
        setQuizActive(false);
    }

    function clearQuizProgress() {
        setTipUsed(false);
        setScore(0);
        setRightAnswers(0);
    }

    return (
        <>
            <Header
                title='Bubble Quiz'
                bgColor='#66666661'
                color='#fff'
            />

            <main
                className='quiz'
                style={{ backgroundImage: 'url("/images/quiz-background.jpg")' }}>
                {quizActive
                    ? loading
                        ? <div className='quiz-spinner'><div></div></div>
                        : <Quiz
                            quizName={quizName}
                            questions={questions}
                            currentQuestion={currentQuestion}
                            timer={timer}
                            timeOut={timeOut}
                            tipHandler={tipHandler}
                            tipUsed={tipUsed}
                            saveAnswer={saveAnswer}
                            endQuiz={endQuiz}
                        />
                    : quizStarted
                        ? <QuizResults
                            score={score}
                            totalScore={totalScore}
                            answers={questions.length}
                            rightAnswers={rightAnswers}
                            startAgain={startAgain}
                            toQuizList={toQuizList}
                        />
                        : <QuizList startQuiz={startQuiz} />
                }
            </main>
        </>
    )
}