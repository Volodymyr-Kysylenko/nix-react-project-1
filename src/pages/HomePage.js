import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

export default function HomePage() {
    return (
        <>
            <Helmet>
                <title>Home page</title>
            </Helmet>

            <div className='home' style={{ backgroundImage: 'url("/images/background.jpg")' }}>
                <div className='icons'>
                    <Link to='/converter'>
                        <img src='/images/app-icons/currencyconverter.webp' alt='converter' />
                        Converter
                    </Link>
                    <Link to='/quiz'>
                        <img src='/images/app-icons/quiz.png' alt='quiz' />
                        Bubble Quiz
                    </Link>
                    <Link to='/photogramm'>
                        <img src='/images/app-icons/photogramm.webp' alt='photogramm' />
                        Photogramm
                    </Link>
                </div>
            </div>
        </>
    );
}