import axios from "axios";
import { useEffect, useState } from "react";
import { __Question } from "../models/question.model";
import Question from "./Question";
import answers from './../utils/answers.json'
import { useDispatch, useSelector } from "react-redux";
import { quizState, setNextQuestion, setTotal, updateScore } from "../store/quiz/quiz.slice";
import CircularProgress from '@mui/material/CircularProgress';
import { useNavigate } from 'react-router-dom';
import { AppRoutes } from "../utils/routes";

const Quiz = () => {

    const navigate = useNavigate();
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
        console.log(answer, activeQuestion.currentQuestionIndex, activeQuestion.total);
        const payload = {
            qId: activeQuestion?.currentQuestion?.id,
            answer: activeQuestion?.currentQuestion?.multiple ? answer : answer[0]
        }
        // axios.post("/dummyPost", payload).then((resp) => {

        // }).catch((err) => {
            // console.log(err, answers, payload.qId, answers["q111"], answers[payload.qId as keyof typeof answers]);
            if(activeQuestion.currentQuestionIndex < activeQuestion.total-1) {
                if(answers[payload.qId as keyof typeof answers].every((item: string) => answer.includes(item))) {
                    dispatch(updateScore())
                }
                dispatch(setNextQuestion({question: questions[activeQuestion.currentQuestionIndex+1], index: activeQuestion.currentQuestionIndex+1}));
            }
            else {
                if(answers[payload.qId as keyof typeof answers].every((item: string) => answer.includes(item))) {
                    dispatch(updateScore())
                }
                // dispatch(setNextQuestion({question: null, index: -1}));
                navigate(AppRoutes.RESULT);
            }
        // });
    }

    return (
        <div className="quiz-container">
            <div className="question-container">
                <div className="progress">
                    <div className="fill-ring">
                        <div className="count">
                            <span className="current-question">{activeQuestion.currentQuestionIndex+1}</span>/{activeQuestion.total}
                        </div>
                    </div>
                    <div className="circular-progress">
                        <CircularProgress variant="determinate" value={25} />
                    </div>
                </div>
              { activeQuestion && <Question question={activeQuestion} submitAnswer={(answer: Array<string>) => submitAnswer(answer)}/> }
            </div>
        </div>
    )
}

export default Quiz;