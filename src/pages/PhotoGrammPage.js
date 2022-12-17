import { useState } from 'react';

import Header from '../components/Header';
import PhotoCards from '../components/PhotoCards';
import PhotoView from '../components/PhotoView';

import getPhotos from '../app/photos';

export default function PhotoGrammPage() {
    const images = getPhotos();

    const imagesPerPage = 12;

    const [search, setSearch] = useState(false);
    const [filter, setFilter] = useState(false);
    const [sorting, setSorting] = useState('id');
    const [page, setPage] = useState(1);
    const [displayImage, setDisplayImage] = useState(false);
    const [pages, setPages] = useState(getPageAmount());
    const [pageAmount, setPageAmount] = useState(Math.ceil(images.length / imagesPerPage));



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

    function updatePageAmount(length) {

        let amount = getPageAmount(length);
        if (pages.length === amount.length) return;
        setPages(amount);
        setPageAmount(amount.length);
    }

    function showSearchResults(e) {
        let value = (e.target.value).toLowerCase();
        setSearch((value !== '') ? value : false);
        setPage(1);
        setPageAmount(pages[pages.length - 1]);
    }

    function clearSearch() {
        setPage(1);
        setSearch(false);
        document.querySelector('.search-input input').value = '';
    }

    function showFilteringResults(filter) {
        setPage(1);
        setFilter(filter);
    }

    function showImage(e, image) {
        if (e.target.tagName !== 'BUTTON' && e.target.tagName !== 'svg' && e.target.tagName !== 'path')
            setDisplayImage(image);
    }

    function hideImage() {
        setDisplayImage(false);
    }

    function changeHeaderHeight() {
        document.querySelector('.search').style.height = '18vh';
        document.querySelector('.search h1').style.fontSize = '0px';
        document.querySelector('.search h1').style.margin = '0';
        document.querySelector('.search h2').style.fontSize = '0px';
        document.querySelector('.search h2').style.margin = '0';
    }

    return (
        <>
            <Header
                title='PhotoGramm'
                bgColor='#fff'
                color='#000' />

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
                            placeholder='Type your request'
                            type='text'
                            onChange={showSearchResults}
                            onFocus={changeHeaderHeight}
                        />
                        <button onClick={clearSearch}>
                            <img src='/images/icons/close.svg' />
                        </button>
                    </div>
                    <div className='categories'>
                        <button className={(filter === false) ? 'active' : ''} onClick={() => showFilteringResults(false)}>
                            All
                        </button>
                        <button className={(filter === 'animals') ? 'active' : ''} onClick={() => showFilteringResults('animals')}>
                            Animals
                        </button>
                        <button className={(filter === 'nature') ? 'active' : ''} onClick={() => showFilteringResults('nature')}>
                            Nature
                        </button>
                        <button className={(filter === 'architecture') ? 'active' : ''} onClick={() => showFilteringResults('architecture')}>
                            Architecture
                        </button>
                        <button className={(filter === 'art') ? 'active' : ''} onClick={() => showFilteringResults('art')}>
                            Art
                        </button>
                        <button className={(filter === 'food') ? 'active' : ''} onClick={() => showFilteringResults('food')}>
                            Food
                        </button>
                    </div>
                </div>

                <div className='page-selector-sorting'>
                    <div>
                        <button
                            className={sorting !== 'id' || 'active'}
                            onClick={() => setSorting('id')}>
                            By Date
                        </button>
                        <button
                            className={sorting !== 'name' || 'active'}
                            onClick={() => setSorting('name')}>
                            By Name
                        </button>
                        <button
                            className={sorting !== 'author' || 'active'}
                            onClick={() => setSorting('author')}>
                            By Author
                        </button>
                    </div>
                    <div>
                        Page {page} of {pageAmount}
                    </div>
                </div>
                <div className='photocards'>
                    <PhotoCards
                        images={images}
                        filter={filter}
                        search={search}
                        sorting={sorting}
                        page={page}
                        imagesPerPage={imagesPerPage}
                        showImage={showImage}
                        updatePageAmount={updatePageAmount}
                    />
                </div>
                <div className='pagination'>
                    <button
                        onClick={() => { document.querySelector('.photogramm').scrollTo(0, 0); setPage(page - 1); }}
                        disabled={(page === 1) ? true : false}>
                        <img
                            style={{ transform: 'rotateZ(90deg)' }}
                            src='./images/icons/down.svg'
                            alt='Arrow icon' />
                    </button>
                    {pages.map(button => {
                        return (
                            <button
                                className={(page === button) ? 'active' : ''}
                                key={'Button for page ' + button}
                                onClick={() => { document.querySelector('.photogramm').scrollTo(0, 0); setPage(button); }}>
                                {button}
                            </button>
                        )
                    })}
                    <button
                        onClick={() => { document.querySelector('.photogramm').scrollTo(0, 0); setPage(+page + 1); }}
                        disabled={(page === pageAmount) ? true : false}>
                        <img
                            style={{ transform: 'rotateZ(-90deg)' }}
                            src='./images/icons/down.svg'
                            alt='Arrow icon' />
                    </button>
                </div>
                {(displayImage) ? <PhotoView image={displayImage} hideImage={hideImage} /> : null}
            </main>
        </>
    )
}