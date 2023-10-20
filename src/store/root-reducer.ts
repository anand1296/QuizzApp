import { combineReducers } from 'redux'
import quizSlice from './quiz/quiz.slice';

const rootReducer = combineReducers({
    // Define a top-level state field named `todos`, handled by `todosReducer`
    // userReducer//-> use in case of without reduxtoolkit\
    quiz: quizSlice
})

export default rootReducer;