import { useEffect } from 'react';

export default function PhotoCard({ images, filter, search, page, imagesPerPage, showImage, updatePageAmount }) {
    useEffect(() => {
        updatePageAmount(result.length);
        // console.log('length', result.length);
      });

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
                for (let i = 0; i < image.categories.length; i++) {
                    if (image.categories[i].includes(search)) return true;
                }

                for (let i = 0; i < image.tags.length; i++) {
                    if (image.tags[i].includes(search)) return true;
                }
            }
            return false;
        })
        .map((image, index) => {
            return (
                <div
                    className='photocard'
                    key={index}
                    onClick={() => showImage(image)}>
                    <div className='photocard-image'>
                        <img src={(image.src) ? './images/photogramm/' + image.src : './images/img.jpg'} alt='img' />
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
                    </div>
                </div>
            )
        })

    if (result.length === 0) {
        return <h2>Not found</h2>;
    } else {
        return result.filter((image, index) => index + 1 <= page * imagesPerPage && index >= (page - 1) * imagesPerPage);
    }    
}