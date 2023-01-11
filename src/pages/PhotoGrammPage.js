import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';

import Header from '../components/Header';
import CategoryButton from '../components/photogramm/CategoryButton';
import PhotoCards from '../components/photogramm/PhotoCards';
import PhotoView from '../components/photogramm/PhotoView';
import SortingButton from '../components/photogramm/SortingButton';
import PaginationButton from '../components/photogramm/PaginationButton';
import Spinner from '../components/photogramm/Spinner';


export default function PhotoGrammPage() {
    const imagesPerPage = 12;

    const [loading, setLoading] = useState(true);

    const [images, setImages] = useState([]);
   
    const [currentPage, setCurrentPage] = useState(1);
    const [pages, setPages] = useState([1]);
    const [pageAmount, setPageAmount] = useState(1);

    const [search, setSearch] = useState(false);
    const [filter, setFilter] = useState(false);
    const [sorting, setSorting] = useState('id');
    
    const [displayImage, setDisplayImage] = useState(false);

    useEffect(() => {
        fetch('https://nix-project.herokuapp.com/api/images-count', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ page: currentPage, search: search, filter: filter })
        })
            .then(res => res.json())
            .then(res => {
                setPageAmount(Math.ceil(res.count / imagesPerPage));
                setPages(() => {
                    const pageArray = getPageAmount(res.count);
                    return (pageArray.length === 0) ? [1] : pageArray;
                });
            })
            .catch(() => console.error('Data request failed'));
    }, [filter, search, currentPage]);


    useEffect(() => {
        fetch('https://nix-project.herokuapp.com/api/images', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ page: currentPage, search: search, filter: filter, sorting: sorting })
        })
            .then(res => res.json())
            .then(photos => {
                setImages(photos);
                setLoading(false);
            })
            .catch(() => console.error('Data request failed'));
    }, [filter, search, sorting, currentPage]);

    useEffect(() => {
        document.querySelector('.photogramm').scrollTo(0, 0);
    }, [currentPage]);

    function getPageAmount(length = images.length) {
        let amount = Math.ceil(length / imagesPerPage);
        let paginationCounter = 1;
        let pagesAmount = [];

        while (paginationCounter <= amount) {
            pagesAmount.push(paginationCounter);
            paginationCounter++;
        }
        return pagesAmount;
    }

    function showSearchResults(e) {
        let value = (e.target.value).toLowerCase();
        setSearch((value !== '') ? value : false);
        setCurrentPage(1);
        setPageAmount(pages[pages.length - 1]);
        setLoading(true);
    }

    function clearSearch() {
        if (search) {
            setLoading(true);
            setCurrentPage(1);
            setSearch(false);
            document.querySelector('.search-input input').value = '';
        }
    }

    function showFilteringResults(filter) {
        setLoading(true);
        setCurrentPage(1);
        setFilter(filter);
    }

    function showSortingResult(sorting) {
        setLoading(true);
        setCurrentPage(1);
        setSorting(sorting);
    }

    function showImage(image) {
        setDisplayImage(image);
    }

    function hideImage() {
        setDisplayImage(false);
    }

    function changeHeaderHeight() {
        document.querySelector('.search').classList.add('min');
    }

    function changeCurrentPage(newPageNumber) {
        setLoading(true);
        setCurrentPage(newPageNumber);
    }

    function prohibitInput(e) {
        const checkKeyRegExp = /^[a-z0-9\s]+$/i;
        (checkKeyRegExp.test(e.key)) || e.preventDefault();
    }

    return (
        <>
            <Helmet>
                <title>PhotoGramm page</title>
            </Helmet>

            <Header
                title='PhotoGramm'
                bgColor='#fff'
                color='#000'
            />

            <main className='photogramm'>
                <div className='search' style={{ backgroundImage: 'url("/images/photogramm-background.jpg")' }}>
                    <h1>
                        PhotoGramm
                    </h1>
                    <h2>
                        Free stock photos and images
                    </h2>
                    <div className='search-input'>
                        <input
                            placeholder='Search by name, category or tag'
                            type='text'
                            onChange={showSearchResults}
                            onFocus={changeHeaderHeight}
                            onKeyDown={prohibitInput}
                        />
                        <button onClick={clearSearch}>
                            <img src='/images/icons/close.svg' alt='Clear input icon' />
                        </button>
                    </div>
                    <div className='categories'>
                        <CategoryButton value={false} filter={filter} showFilteringResults={showFilteringResults} />
                        <CategoryButton value={'animals'} filter={filter} showFilteringResults={showFilteringResults} />
                        <CategoryButton value={'nature'} filter={filter} showFilteringResults={showFilteringResults} />
                        <CategoryButton value={'architecture'} filter={filter} showFilteringResults={showFilteringResults} />
                        <CategoryButton value={'art'} filter={filter} showFilteringResults={showFilteringResults} />
                        <CategoryButton value={'food'} filter={filter} showFilteringResults={showFilteringResults} />
                    </div>
                </div>

                <div className='page-selector-sorting'>
                    <div>
                        <SortingButton value={'id'} sorting={sorting} showSortingResult={showSortingResult} />
                        <SortingButton value={'name'} sorting={sorting} showSortingResult={showSortingResult} />
                        <SortingButton value={'author'} sorting={sorting} showSortingResult={showSortingResult} />
                    </div>
                    <div>
                        Page {currentPage} of {pageAmount || 1}
                    </div>
                </div>
                    {loading
                        ? <div className='photogramm-spinner-container'>
                            <Spinner loading={loading} />
                        </div>
                        : <PhotoCards
                            images={images}
                            showImage={showImage}
                        />
                    }
                <div className='pagination'>
                    <button
                        onClick={() => { changeCurrentPage(currentPage - 1) }}
                        disabled={(currentPage === 1) ? true : false}>
                        <img
                            style={{ transform: 'rotateZ(90deg)' }}
                            src='/images/icons/down.svg'
                            alt='Arrow icon'
                        />
                    </button>
                    {pages.map(pageNumber => {
                        return (
                            <PaginationButton 
                                key={pageNumber} 
                                page={currentPage} 
                                pageNumber={pageNumber} 
                                changeCurrentPage={changeCurrentPage}    
                            />
                        )
                    })}
                    <button
                        onClick={() => { changeCurrentPage(currentPage + 1) }}
                        disabled={(currentPage === pageAmount || pageAmount === 0) ? true : false}>
                        <img
                            style={{ transform: 'rotateZ(-90deg)' }}
                            src='/images/icons/down.svg'
                            alt='Arrow icon'
                        />
                    </button>
                </div>

                {displayImage
                    ? <PhotoView image={displayImage} hideImage={hideImage} />
                    : null
                }
            </main>
        </>
    )
}