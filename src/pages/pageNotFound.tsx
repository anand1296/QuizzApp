import { useNavigate } from 'react-router-dom';
import {AppRoutes} from '../utils/routes' 

const PageNotFound = () => {

    const navigate = useNavigate();

    return (
        <div className="page-not-found">
            <div className="msg">404! Page Not Found!</div>
            <div className="primary-btn">
                <button className="home-btn" onClick={() => navigate(AppRoutes.HOME)}>Go to Home</button>
            </div>
        </div>
    )
}

export default PageNotFound;