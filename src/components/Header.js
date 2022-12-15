import { Link } from "react-router-dom";

export default function Header({title, color}) {
    return (
        <header style={{backgroundColor: color}}>
        <div>
            {title}
        </div>
        <div>
            <Link to='/' className='close-app-button'>
                ×
            </Link>
        </div>
        </header>
    )
}