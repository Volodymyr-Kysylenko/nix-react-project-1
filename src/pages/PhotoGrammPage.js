import React, { useState, useEffect } from 'react';

import Header from '../components/Header';
import CategoryButton from '../components/photogramm/CategoryButton';
import PhotoCards from '../components/photogramm/PhotoCards';
import PhotoView from '../components/photogramm/PhotoView';
import SortingButton from '../components/photogramm/SortingButton';
import PaginationButton from '../components/photogramm/PaginationButton';

export default function PhotoGrammPage() {
    const imagesPerPage = 12;

    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState(false);
    const [filter, setFilter] = useState(false);
    const [sorting, setSorting] = useState('id');
    const [page, setPage] = useState(1);
    const [displayImage, setDisplayImage] = useState(false);
    const [pages, setPages] = useState([1]);
    const [pageAmount, setPageAmount] = useState(1);

    useEffect(() => {
        fetch('https://nix-project.herokuapp.com/api/images-count', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({page: page, search: search, filter: filter})
        })
            .then(res => res.json())
            .then(res => {
                console.log(res.count);
                setPageAmount(Math.ceil(res.count / imagesPerPage));
                setPages(() => {
                    const pageArray = getPageAmount(res.count);
                    return (pageArray.length === 0) ? [1] : pageArray;
                });
            });
    }, [filter, search, page]);

    
    useEffect(() => {
        fetch('https://nix-project.herokuapp.com/api/images', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({page: page, search: search, filter: filter})
        })
            .then(res => res.json())
            .then(photos => {
                console.log(photos);
                setImages(photos);
                setLoading(false);
            })
    }, [filter, search, page]);

    useEffect(() => {
        document.querySelector('.photogramm').scrollTo(0, 0);
    }, [page]);
    

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
        setPage(1);
        setPageAmount(pages[pages.length - 1]);
        setLoading(true);
    }

    function clearSearch() {
        if (search) {
            setLoading(true);
            setPage(1);
            setSearch(false);
            document.querySelector('.search-input input').value = '';
        }
    }

    function showFilteringResults(filter) {
        setLoading(true);
        setPage(1);
        setFilter(filter);
    }

    function showSortingResult(sorting) {
        setSorting(sorting);
    }

    function showImage(e, image) {
        console.log(e.target);
        console.log(e.currentTarget);
        if (e.target.tagName !== 'BUTTON' && e.target.tagName !== 'svg' && e.target.tagName !== 'path') {
            setDisplayImage(image);
        }
    }

    function hideImage() {
        setDisplayImage(false);
    }

    function changeHeaderHeight() {
        document.querySelector('.search').classList.add('min');
    }

    function changeCurrentPage(newPageNumber) {
        setLoading(true);
        // document.querySelector('.photogramm').scrollTo(0, 0); 
        setPage(newPageNumber);
    }

    return (
        <>
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
                        />
                        <button onClick={clearSearch}>
                            <img src='/images/icons/close.svg' alt='Clear input icon'/>
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
                        Page {page} of {pageAmount}
                    </div>
                </div>
                <div className='photocards'>
                {loading 
                    ? <div className='spinner photogramm-spinner'></div>
                    : <PhotoCards
                        images={images}
                        sorting={sorting}
                        showImage={showImage}
                    />
                }
                </div>
                <div className='pagination'>
                    <button
                        onClick={() => {changeCurrentPage(page - 1)}}
                        disabled={(page === 1) ? true : false}>
                        <img
                            style={{ transform: 'rotateZ(90deg)' }}
                            src='/images/icons/down.svg'
                            alt='Arrow icon'
                        />
                    </button>
                    {pages.map(pageNumber => {
                        return ( 
                            <PaginationButton key={pageNumber} page={page} pageNumber={pageNumber} changeCurrentPage={changeCurrentPage} />
                        )
                    })}
                    <button
                        onClick={() => {changeCurrentPage(page + 1)}}
                        disabled={(page === pageAmount) ? true : false}>
                        <img
                            style={{ transform: 'rotateZ(-90deg)' }}
                            src='/images/icons/down.svg'
                            alt='Arrow icon' 
                        />
                    </button>
                </div>
                {
                    (displayImage) ? 
                    <PhotoView image={displayImage} hideImage={hideImage} /> 
                    : null
                }
            </main>
        </>
    )
}