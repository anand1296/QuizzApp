import { createSlice } from "@reduxjs/toolkit";
import { __Question } from "../../models/question.model";

export interface quizState {
    currentQuestion: __Question | null,
    currentQuestionIndex: number,
    total: number,
    correct: number
}

const initialQuizState: quizState = {
    currentQuestion: null,
    currentQuestionIndex: -1,
    total: 0,
    correct: 0
}

const quizSlice = createSlice({
  name: "quiz",
  initialState: initialQuizState,
  reducers: {
    setTotal(state: quizState, action) {
        return {
            ...state,
            total: action.payload
        }
    },
    setNextQuestion(state: quizState, action) {
      return {
        ...state,
        currentQuestion: action.payload.question,
        currentQuestionIndex: action.payload.index
      }
    },
    updateScore(state: quizState) {
        console.log(state);
      return {
        ...state,
        correct: state.correct+1
      }
    }
  },
});

export default quizSlice.reducer;
export const { setTotal, setNextQuestion, updateScore } = quizSlice.actions;