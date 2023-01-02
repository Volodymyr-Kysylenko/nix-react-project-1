import React, { useEffect, useState } from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { faker } from '@faker-js/faker';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

ChartJS.defaults.backgroundColor = '#fff';
ChartJS.defaults.borderColor = '#fff';
ChartJS.defaults.color = '#fff';

function getDate(n = 0) {
    const date = new Date();
    date.setDate(date.getDate() - n);
    return date.toLocaleDateString('uk-UK');
}

function getMonth(n = 0) {
    const date = new Date();
    date.setMonth(date.getMonth() - n);
    const dateStringArray = date.toLocaleDateString('uk-UK').split('.');
    return dateStringArray[1] + '.' + dateStringArray[2];
}

const Days = [getDate(6), getDate(5), getDate(4), getDate(3), getDate(2), getDate(1), getDate()];
const Months = [getMonth(6), getMonth(5), getMonth(4), getMonth(3), getMonth(2), getMonth(1), getMonth()];

export default function Chart({ period, from, fromCurrency, toCurrency }) {
    const options = {
        responsive: true,
        plugins: {
            legend: { display: false },
            title: {
                display: true,
                text: '1 ' + fromCurrency + ' to ' + toCurrency + ' by ' + period,
            },
        }
    };

    const [data, setData] = useState({
        labels: (period === 'Days') ? Days : Months,
        datasets: [
            {
                label: '1 ' + fromCurrency + ' to ' + toCurrency + ' by ' + period,
                data: ((period === 'Days') ? Days : Months).map((label, index) => {
                    if (index !== 6) return faker.datatype.number({ min: from - 0.5, max: from + 0.1, precision: 0.01 });
                    return from;
                })
            }
        ]
    });

    useEffect(() => {
        const delta = (fromCurrency === 'UAH') ? 0.002 : 0.1;
        const precision = (fromCurrency === 'UAH') ? 0.0005 : 0.01;
        setData({
            labels: (period === 'Days') ? Days : Months,
            datasets: [
                {
                    label: '1 ' + fromCurrency + ' to ' + toCurrency,
                    data: ((period === 'Days') ? Days : Months).map((label, index) => {
                        if (index !== 6) return faker.datatype.number({ min: from - delta, max: from + delta, precision: precision });
                        return from;
                    })
                }
            ],
        })
    }, [from]);

    return <Line options={options} data={data} />;
}