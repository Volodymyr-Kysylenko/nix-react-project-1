import React from 'react';

export default function CategoryButton({value, filter, showFilteringResults}) {
    return (
        <button
            className={(filter === value) ? 'active' : ''}
            onClick={() => showFilteringResults(value)}>
            {(value) ? value.charAt(0).toUpperCase() + value.slice(1) : 'All'}
        </button>
    );
}