import './App.scss';
import MainLayout from './components/layouts/main-layout';
import { Routes, Route } from 'react-router-dom'
import { AppRoutes } from './utils/routes';
import HomeComponent from './components/pages/home';
import LoginComponent from './components/pages/login';
import PageNotFoundComponent from './components/pages/page-not-found';
import ProtectedRoute from './utils/protected-routes';
import About from './components/pages/about';
import ContactUs from './components/pages/contact-us';
import { useDispatch } from 'react-redux';
import { TokenService } from './utils/token';

function App() {

  const dispatch = useDispatch();

  if (TokenService.getToken()) {
    dispatch({
      type: 'setUser',
      payload: {
        username: 'abc@email.com',
        password: 'password'
      }
    });
    dispatch({
      type: 'loginSuccess',
      payload: 'Login Successful'
    });
  }

    return (
      <MainLayout>
        <Routes>
          <Route path={AppRoutes.ANY} element={<PageNotFoundComponent />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<HomeComponent />} />
            <Route path={AppRoutes.HOME} element={<HomeComponent />} />
            <Route path={AppRoutes.ABOUT} element={<About />} />
            <Route path={AppRoutes.CONTACT_US} element={<ContactUs />} />
          </Route>
          <Route path={AppRoutes.LOGIN} element={<LoginComponent />} />
        </Routes>
      </MainLayout>
    );
  }

  export default App;
