import { useState, useEffect } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';

export default function Layout() {
    const [time, setTime] = useState((new Date()).toLocaleTimeString('uk-UK'));
    const [appIcon, setAppIcon] = useState(false);

    let location = useLocation().pathname;

    useEffect(() => {
        const timerId = setInterval(() => setTime((new Date()).toLocaleTimeString('uk-UK')), 1000);
        return () => clearInterval(timerId);
    }, []);

    useEffect(() => {
        switch (location) {
            case '/converter':
                setAppIcon('currencyconverter.webp');
                return;
            case '/quiz':
                setAppIcon('quiz.png');
                return;
            case '/photogramm':
                setAppIcon('photogramm.webp');
                return;
            default:
                setAppIcon(false);
                return;
        }
    }, [location]);

    return (
        <>
            <Outlet />
            <footer>
                <div>
                    <Link to='/'>
                        <img src='/images/icon.svg' alt='Home icon' />
                    </Link>
                </div>
                <div>
                    {
                        (appIcon) ?
                            <div className='active-app'>
                                <img src={'/images/app-icons/' + appIcon} alt='photogramm' />
                            </div>
                            : null
                    }
                </div>
                <div className='clock'>
                    <p>{time}</p>
                    <p>{(new Date()).toLocaleDateString('uk-UK')}</p>
                </div>
            </footer>
        </>
    )
}