import React, { useState, useEffect } from 'react';

export default function QuizList({ startQuiz }) {
    const [loading, setLoading] = useState(true);
    const [quizList, setquizList] = useState([]);

    useEffect(() => {
        fetch('https://nix-project.herokuapp.com/api/quiz-list')
            .then(res => res.json())
            .then(quizzes => setquizList(quizzes))
            .then(() => setLoading(false));
    }, []);

    return (
        <>
            {loading
                ? <div className='quiz-spinner'><div></div></div>
                : <div className='quiz-list'>
                    <h1>Список квізів</h1>
                    {
                        quizList.map((item, index) => {
                            return (
                                <div key={index} className='quiz-list-item'>
                                    <h2>{item.name}</h2>
                                    <p>{item.questionsamount} питань, {item.timer} секунд на питання</p>
                                    <button
                                        onClick={() => startQuiz(item._id)}>
                                        Почати квіз
                                    </button>
                                </div>
                            )
                        })
                    }
                </div>
            }
        </>
    )
}