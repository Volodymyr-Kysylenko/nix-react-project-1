import { Link } from 'react-router-dom';


function HomePage() {
    return (
        <div className='home' style={{backgroundImage: 'url("/images/background.jpg")'}}>
            <div className='icons'>
                <Link to='/converter'>
                    <img src='./images/app-icons/currencyconverter.webp' alt='converter' />
                    Converter
                </Link>
                <Link to='/quiz'>
                    <img src='./images/app-icons/quiz.png' alt='quiz'/>
                    Quiz
                </Link>
                <Link to='/photogramm'>
                    <img src='./images/app-icons/photogramm.webp' alt='photogramm'/>
                    Photogramm
                </Link>
            </div>
        </div>
    )
}

export default HomePage;