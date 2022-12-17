import { useState, useEffect } from 'react';

export default function PhotoCard({ images, filter, search, sorting, page, imagesPerPage, showImage, updatePageAmount }) {
    useEffect(() => {
        updatePageAmount(result.length || 1);
    });

    const [favoriteImages, setFavoriteImages] = useState(localStorage.getItem('favorites')?.split(',') || []);

    function addToFavorite(id) {
        let favorites = localStorage.getItem('favorites')?.split(',') || [];

        if (!favorites.includes(id.toString())) {
            localStorage.setItem('favorites', [...favorites, id.toString()]);
        } else {
            favorites = favorites.filter(item => item !== id.toString());
            localStorage.setItem('favorites', favorites || []);
        }
        setFavoriteImages(localStorage.getItem('favorites')?.split(',') || []);
    }

    let result = images
        .filter((image) => {
            if (filter === false) {
                return true;
            } else {
                for (let i = 0; i < image.categories.length; i++) {
                    if (image.categories[i] === filter) return true;
                }
            }
            return false;
        })
        .filter((image) => {
            if (search === false) {
                return true;
            } else {
                if ((image.name).toLowerCase().includes(search)) return true;

                for (let i = 0; i < image.categories.length; i++) {
                    if (image.categories[i].includes(search)) return true;
                }

                for (let i = 0; i < image.tags.length; i++) {
                    if (image.tags[i].includes(search)) return true;
                }
            }
            return false;
        })
        .sort((a, b) => {
            switch (sorting) {
                case 'date':
                    return a.id - b.id;
                case 'name':
                    return a[sorting].localeCompare(b[sorting]);
                case 'author':
                    return a[sorting].localeCompare(b[sorting]);
                default:
                    return a.id - b.id;
            }

        })
        .map((image, index) => {
            return (
                <div
                    className='photocard'
                    key={index}
                    onClick={(e) => showImage(e, image)}>
                    <div className='photocard-image'>
                        <img
                            src={'/images/photogramm/' + image.src}
                            alt={image.name} />
                    </div>
                    <div className='photocard-info'>
                        <h5>
                            {image.name}
                        </h5>
                        <h6>
                            Author: {image.author}
                        </h6>
                        <div className='photocard-category'>
                            {
                                image.categories.map((category) => {
                                    return (<span className={'category-' + category} key={category}>{category}</span>)
                                })
                            }
                        </div>
                        <div>
                            {
                                image.tags.map((tag) => {
                                    return (<a key={image.src + Math.random()} href='/#'>{'#' + tag}</a>)
                                })
                            }
                        </div>
                        <div className='favorite-button'>
                            <button onClick={(e) => { e.preventDefault(); addToFavorite(image.id) }}>
                                <svg
                                    width='22'
                                    height='21'
                                    viewBox='0 0 22 21'
                                    fill={favoriteImages.includes(image.id.toString()) ? '#add7f9' : '#ffffff'}
                                    xmlns='http://www.w3.org/2000/svg'>
                                    <path
                                        d='M3.45067 12.9082L10.4033 19.4395C10.6428 19.6644 10.7625 19.7769 10.9037 19.8046C10.9673 19.8171 11.0327 19.8171 11.0963 19.8046C11.2375 19.7769 11.3572 19.6644 11.5967 19.4395L18.5493 12.9082C20.5055 11.0706 20.743 8.0466 19.0978 5.92607L18.7885 5.52734C16.8203 2.99058 12.8696 3.41601 11.4867 6.31365C11.2913 6.72296 10.7087 6.72296 10.5133 6.31365C9.13037 3.41601 5.17972 2.99058 3.21154 5.52735L2.90219 5.92607C1.25695 8.0466 1.4945 11.0706 3.45067 12.9082Z'
                                        stroke='#add7f9' />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            )
        })

    if (result.length === 0) {
        return <h2>
            No results found...
        </h2>;
    } else {
        return result.filter((image, index) => index + 1 <= page * imagesPerPage && index >= (page - 1) * imagesPerPage);
    }
}