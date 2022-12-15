import { useEffect, useState } from 'react';
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

export const options = {
    responsive: true,
    plugins: {
        legend: {
            display: false
        },
        title: {
            display: true,
            text: 'Chart.js Line Chart',
        },
    },
};

function getDate(n = 0) {
    const date = new Date();
    date.setDate(date.getDate() - n);
    return date.toLocaleDateString('uk-UK');
}

const labels = [getDate(6), getDate(5), getDate(4), getDate(3), getDate(2), getDate(1), getDate()];


export default function Chart({ from, fromCurrency, toCurrency }) {
    const [data, setData] = useState({
        labels,
        datasets: [
            {
                label: '1 ' + fromCurrency + ' to ' + toCurrency,
                data: labels.map((label, index) => {
                    if (index !== 6) return faker.datatype.number({ min: from - 0.5, max: from + 0.1, precision: 0.01 });
                    return from;
                }),
                borderColor: 'rgb(53, 162, 235)',
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
            }
        ],
    });

    useEffect(() => {
        const delta = (fromCurrency === 'UAH') ? 0.002 : 0.1;
        const precision = (fromCurrency === 'UAH') ? 0.0005 : 0.01;
        setData({
            labels,
            datasets: [
                {
                    label: '1 ' + fromCurrency + ' to ' + toCurrency,
                    data: labels.map((label, index) => {
                        if (index !== 6) return faker.datatype.number({ min: from - delta, max: from + delta, precision: precision });
                        return from;
                    }),
                    borderColor: 'rgb(53, 162, 235)',
                    backgroundColor: 'rgba(53, 162, 235, 0.5)',
                }
            ],
        })
    }, [from])


    return <Line options={options} data={data} />;
}