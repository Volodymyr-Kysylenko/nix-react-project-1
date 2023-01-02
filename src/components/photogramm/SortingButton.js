import React from 'react';

export default function SortingButton({ value, sorting, showSortingResult }) {
    return (
        <button
            className={(sorting === value) ? 'active' : ''}
            onClick={() => showSortingResult(value)}>
            By {value.charAt(0).toUpperCase() + value.slice(1)}
        </button>
    );
}