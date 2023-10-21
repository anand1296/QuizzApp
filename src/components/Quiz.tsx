import axios from "axios";
import { useEffect, useState } from "react";
import { __Question } from "../models/question.model";
import Question from "./Question";
import * as answers from './../utils/answers.json'
import { useDispatch, useSelector } from "react-redux";
import { quizState, setNextQuestion, setTotal, updateScore } from "../store/quiz/quiz.slice";
import CircularProgress from '@mui/material/CircularProgress';

const Quiz = () => {

    const dispatch = useDispatch();
    const [questions, setQuestions] = useState<Array<__Question>>([]);
    const activeQuestion  = useSelector((state: {quiz: quizState}) => {
        return state.quiz;
    });

    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const getData = async () => {
            const resp = await axios.get("/data/questions.json");
            const questions: Array<__Question> = resp.data.questions;
            setQuestions(questions);
            dispatch(setTotal(questions.length));
            dispatch(setNextQuestion({question: questions[0], index: 0}));
        };
        getData();
    }, [dispatch])

    const submitAnswer = (answer: Array<string>) => {
        const payload = {
            qId: activeQuestion?.currentQuestion?.id,
            answer: activeQuestion?.currentQuestion?.multiple ? answer : answer[0]
        }
        axios.post("/dummyPost", payload).then((resp) => {

        }).catch((err) => {
            if(answers[payload.qId as keyof typeof answers].every((item: string) => answer.includes(item))) {
                dispatch(updateScore())
            }
            dispatch(setNextQuestion({question: questions[activeQuestion.currentQuestionIndex+1], index: activeQuestion.currentQuestionIndex+1}));
        });
    }

    return (
        <div className="quiz-container">
            <div className="question-container">
                <div className="progress">
                    <div className="fill-ring"></div>
                    <div className="circular-progress">
                        <CircularProgress variant="determinate" value={25} />
                    </div>
                    <div className="progress-text"></div>
                </div>
              { activeQuestion && <Question question={activeQuestion} submitAnswer={(answer: Array<string>) => submitAnswer}/> }
            </div>
        </div>
    )
}

export default Quiz;