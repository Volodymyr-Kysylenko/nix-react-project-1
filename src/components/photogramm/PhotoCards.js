import React, { useState } from 'react';

import PhotoCard from './PhotoCard';

export default function PhotoCards({ images, showImage }) {

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

    if (images.length === 0) {
        return <h2 className='no-results-found'>
            No results found...
        </h2>;
    } else {
        return (
            <div className='photocards'>
                {
                    images.map((image, index) => {
                        return (
                            <PhotoCard
                                key={image._id}
                                image={image}
                                showImage={showImage}
                                index={index}
                                addToFavorite={addToFavorite}
                                favoriteImages={favoriteImages}
                            />
                        )
                    })
                }
            </div>
        );
    }
}