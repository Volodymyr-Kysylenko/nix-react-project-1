import React from 'react';

export default function PhotoView({ image, hideImage }) {
    return (
        <div className='photo-view-container'>
            <div className='photo-view'>
                <div>
                    <img
                        src={'./images/photogramm/' + image.src}
                        alt={image.name}
                    />
                </div>
                <div>
                    <h2>
                        {image.name}
                    </h2>

                    <h3>
                        Author: {image.author}
                    </h3>
                    <div className='photo-view-categories'>
                        Categories:
                        {
                            image.categories.map((category) => {
                                return (<span key={category}>{category}</span>)
                            })
                        }
                    </div>

                    <div className='photo-view-tags'>
                        {
                            image.tags.map((tag) => {
                                return (<span key={tag} href='/#'>{'#' + tag}</span>)
                            })
                        }
                    </div>
                    <div className='download-image'>
                        <a href={'/images/photogramm/' + image.src} download={image.name + '.jpg'}>
                            Download
                            <img src='/images/icons/download.svg' alt='Download icon' />
                        </a>
                        <button
                            onClick={() => navigator.clipboard.writeText(window.location.origin + '/images/photogramm/' + image.src)}>
                            Copy link
                            <img src='/images/icons/copy.svg' alt='Copy icon' />
                        </button>
                    </div>
                    <div className='photo-view-button'>
                        <button onClick={hideImage}>
                            <img src='/images/icons/close.svg' alt='Close icon' />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}