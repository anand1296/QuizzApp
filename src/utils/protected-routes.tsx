import { Outlet } from 'react-router';
import { useSelector } from "react-redux";
import { quizState } from '../store/quiz/quiz.slice';
import { AppRoutes } from './routes';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = () => {

  const quiz = useSelector((state: { quiz: quizState }) => {
    console.log(state.quiz);
    return state.quiz;
  });

  return (
    (quiz.currentQuestionIndex !== -1) &&( quiz.currentQuestionIndex+1 === quiz.total) ? <Outlet/> : <Navigate to={AppRoutes.QUIZ}/>
  )
};

export default ProtectedRoute;