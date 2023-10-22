import { combineReducers } from 'redux'
import quizSlice from './quiz/quiz.slice';
import loaderSlice from './loader/loader.slice';

const rootReducer = combineReducers({
    // Define a top-level state field named `todos`, handled by `todosReducer`
    // userReducer//-> use in case of without reduxtoolkit\
    quiz: quizSlice,
    loader: loaderSlice
})

export default rootReducer;