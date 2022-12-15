import { useState, useEffect } from 'react';

import Header from '../components/Header';
import PhotoCards from '../components/PhotoCards';
import PhotoView from '../components/PhotoView';

import getPhotos from '../app/photos';

// useEffect(() => {
//     document.querySelector()
// }, [])

export default function PhotoGrammPage() {
    const images = getPhotos();

    const imagesPerPage = 12;

    const [filter, setFilter] = useState(false);
    const [search, setSearch] = useState(false);
    const [page, setPage] = useState(1);
    const [displayImage, setDisplayImage] = useState(false);
    const [pages, setPages] = useState(getPageAmount());
    const [pageAmount, setPageAmount] = useState(Math.ceil(images.length / imagesPerPage));

    

    function getPageAmount(length = images.length) {
        let amount = Math.ceil(length/imagesPerPage);
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
        console.log('pageAmount', pageAmount);
    }

    function showSearchResults(e) {
        let value = e.target.value;
        setSearch((value !== '') ? value : false);
        setPage(1);
        setPageAmount(pages[pages.length - 1]);
        console.log('pageAmount', pageAmount);
    }

    function showFilteringResults(filter) {
       setPage(1);
        setFilter(filter);
        // setPageAmount(pages[pages.length - 1]);
        //console.log('pageAmount', pageAmount);
    }

    function showImage(image) {
        setDisplayImage(image);
    }

    function hideImage() {
        setDisplayImage(false);
    }

    return (
        <>
            <Header title='PhotoGramm' color='#000' />
            <main className='photogram'>
                {/* {console.log('render', page)} */}
                <div className='search'>
                    <h1>
                        PhotoGramm
                    </h1>
                    <div>
                        <input type='text' onChange={showSearchResults} />
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
                <div className='page-selector'>
                    Page {page} of {pageAmount}
                </div>
                <div className='photocards'>
                    <PhotoCards
                        images = {images} 
                        filter={filter} 
                        search={search} 
                        page={page} 
                        imagesPerPage={imagesPerPage}
                        showImage={showImage} 
                        updatePageAmount={updatePageAmount}
                        />
                </div>
                <div className='pagination'>
                    <button
                        onClick={() => { setPage(page - 1); window.scrollTo(0, 0); }}
                        disabled={(page === 1) ? true : false}>
                        {'<'}
                    </button>
                    {pages.map(button => {
                        return (
                            <button
                                className={(page === button) ? 'active' : ''}
                                key={'Button for page ' + button}
                                onClick={() => { setPage(button); window.scrollTo(0, 0); }}>
                                {button}
                            </button>
                        )
                    })}
                    <button
                        onClick={() => { setPage(+page + 1); window.scrollTo(0, 0); }}
                        disabled={(page === pageAmount) ? true : false}>
                        {'>'}
                    </button>
                </div>
                {(displayImage) ? <PhotoView image={displayImage} hideImage={hideImage}/> : null}
            </main>
        </>
    )
}