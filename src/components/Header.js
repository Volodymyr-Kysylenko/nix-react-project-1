import React from 'react';
import { Link } from 'react-router-dom';

export default function Header({ title, bgColor, color }) {
    return (
        <header style={{ backgroundColor: bgColor, color: color }}>
            <div>
                {title}
            </div>
            <div>
                <Link to='/' className='close-app-button'>
                    <img src='/images/icons/close.svg' alt='Close icon' />
                </Link>
            </div>
        </header>
    )
}