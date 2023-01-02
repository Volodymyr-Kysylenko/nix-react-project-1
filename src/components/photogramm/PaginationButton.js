import React from 'react';

export default function PaginationButton({ page, pageNumber, changeCurrentPage }) {
    return (
        <button
            className={(page === pageNumber) ? 'active' : ''}
            onClick={() => { changeCurrentPage(pageNumber) }}>
            {pageNumber}
        </button>
    );
}