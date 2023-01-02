import React, { useState } from 'react';

import PhotoCard from './PhotoCard';

export default function PhotoCards({ images, sorting, showImage }) {

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

    if (result.length === 0) {
        return <h2>
            No results found...
        </h2>;
    } else {
        return result;
    }
}