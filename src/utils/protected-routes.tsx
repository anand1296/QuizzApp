import { Outlet } from 'react-router';

const ProtectedRoute = () => {

  return (
    // AuthService.isUserAuthenticated() ? <Outlet/> : <Navigate to={AppRoutes.LOGIN}/>
    <Outlet/>
  )
};

export default ProtectedRoute;