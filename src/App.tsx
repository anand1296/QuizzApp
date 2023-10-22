import './App.scss';
import MainLayout from './layout/main-layout';
import { Routes, Route, Navigate } from 'react-router-dom'
import { AppRoutes } from './utils/routes';
import ProtectedRoute from './utils/protected-routes';
import PageNotFound from './pages/pageNotFound';
import Quiz from './components/Quiz';
import Home from './pages/home';
import Loader from './layout/loader';

function App() {

    return (
      <MainLayout>
        <Loader/>
        <Routes>
          <Route path={AppRoutes.ANY} element={<PageNotFound />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<Navigate to={AppRoutes.HOME} replace={true} />}/>
            <Route path={AppRoutes.HOME} element={<Home />} />
            <Route path={AppRoutes.QUIZ} element={<Quiz />} />
          </Route>
        </Routes>
      </MainLayout>
    );
  }

  export default App;
