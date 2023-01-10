import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';


export default function NotFound() {
    const [percentage, setPercentage] = useState(0);

    useEffect(() => {
        let percentageIntervalValue = 0;
        const percentageInterval = setInterval(() => {
            percentageIntervalValue += Math.floor(Math.random() * 10);
            if (percentageIntervalValue < 100) {
                setPercentage(percentageIntervalValue);
            } else {
                window.location.replace('/');
            }
        }, 200);
        return () => clearInterval(percentageInterval);
    }, []);

    return (
        <>
            <Helmet>
                <title>404 page</title>
            </Helmet>

            <main className='not-found'>
                <div>
                    <h1>
                        404
                    </h1>
                    <h2>
                        We will collect the necessary data and forward you to the home page.
                    </h2>
                    <h2>
                        {percentage}% complete
                    </h2>
                </div>
            </main>
        </>
    )
}

