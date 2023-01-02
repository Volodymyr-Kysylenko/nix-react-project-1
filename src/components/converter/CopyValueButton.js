import React from 'react';

export default function CopyValueButton({ value }) {
    return (
        <button
            className='copy-value'
            onClick={() => { navigator.clipboard.writeText(value) }}>
            <img src='/images/icons/copy.svg' alt='Copy icon' />
        </button>
    );
}