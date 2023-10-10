import { Navigate, Outlet } from 'react-router';
import { AuthService } from './auth';
import { AppRoutes } from './routes';


const ProtectedRoute = () => {

  return (
    AuthService.isUserAuthenticated() ? <Outlet/> : <Navigate to={AppRoutes.LOGIN}/>
  )
};

export default ProtectedRoute;