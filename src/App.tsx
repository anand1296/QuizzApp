import './App.scss';
import MainLayout from './layout/main-layout';
import { Routes, Route } from 'react-router-dom'
import { AppRoutes } from './utils/routes';
import ProtectedRoute from './utils/protected-routes';
import PageNotFound from './pages/pageNotFound';
import Quiz from './components/Quiz';
import Home from './pages/home';

function App() {

    return (
      <MainLayout>
        <Routes>
          <Route path={AppRoutes.ANY} element={<PageNotFound />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<Home />} />
            <Route path={AppRoutes.HOME} element={<Home />} />
            <Route path={AppRoutes.QUIZ} element={<Quiz />} />
          </Route>
        </Routes>
      </MainLayout>
    );
  }

  export default App;
