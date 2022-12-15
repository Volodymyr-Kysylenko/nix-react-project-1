export default function PhotoView({ image, hideImage}) {
    console.log(image);
    return (
        <div className='photo-view-container' >
            <div className='photo-view'>
                <img src={'./images/photogramm/' + image.src} alt={image.src} />
                <div>
                    {
                        image.tags.map((tag) => {
                        return (<a key={tag} href='/#'>{'#' + tag}</a>)
                        })
                    }
                </div>
                <div className='photo-view-button'>
                    <button onClick={hideImage}>
                        х
                    </button>
                </div>
            </div>
        </div>
    )
}