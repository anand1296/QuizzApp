import axios from "./../services/axios-interceptor";
import { useEffect, useState } from "react";
import { __Question } from "../models/question.model";
import Question from "./Question";
import answers from './../utils/answers.json'
import { useDispatch, useSelector } from "react-redux";
import { quizState, setNextQuestion, setTotal, updateScore } from "../store/quiz/quiz.slice";
import CircularProgress from '@mui/material/CircularProgress';
import Result from "./Result";

const Quiz = () => {

    const dispatch = useDispatch();

    const [questions, setQuestions] = useState<Array<__Question>>([]);

    //fetching current question to be displayed from the store
    const activeQuestion = useSelector((state: { quiz: quizState }) => {
        return state.quiz;
    });

    //to be set true once all questions are answered
    const [showResult, setShowResult] = useState(false);

    useEffect(() => {
        const getData = async () => {
            const resp = await axios.get("/data/questions.json");
            const questions: Array<__Question> = resp.data.questions;
            setQuestions(questions);
            dispatch(setTotal(questions.length));
            //to set 1st question from questions list as the current question
            dispatch(setNextQuestion({ question: questions[0], index: 0 }));
        };
        getData();
    }, [dispatch])

    const submitAnswer = (answer: Array<string>) => {
        // console.log(answer, activeQuestion.currentQuestionIndex, activeQuestion.total);
        const payload = {
            qId: activeQuestion?.currentQuestion?.id,
            answer: activeQuestion?.currentQuestion?.multiple ? answer : answer[0]
        }
        axios.post("/dummyPost", payload).then((resp) => {
            //resp
        }).catch((err) => {
        // writing resp logic is err block for mocking prupose

        //checking if cuurent question is not the last question
        if (activeQuestion.currentQuestionIndex < activeQuestion.total - 1) {
            if (answers[payload.qId as keyof typeof answers].every((item: string) => answer.includes(item))) {
                //increement correct answers in store
                dispatch(updateScore())
            }
            dispatch(setNextQuestion({ question: questions[activeQuestion.currentQuestionIndex + 1], index: activeQuestion.currentQuestionIndex + 1 }));
        }
        else {//if current question if last question -> updated correct answers in store and show result
            if (answers[payload.qId as keyof typeof answers].every((item: string) => answer.includes(item))) {
                dispatch(updateScore())
            }
            setShowResult(true);
            // dispatch(setNextQuestion({question: null, index: -1}));
            // navigate(AppRoutes.RESULT);
        }
        });
    }

    const restartQuiz = () => {
        //reset questions state
        dispatch(setNextQuestion({question: questions[0], index: 0, resetCorrect: true}));
        setShowResult(false);
    }

    return (
        <div className="quiz-container">
            <div className="question-container">
                {
                    showResult ? <Result question={activeQuestion} restartQuiz={restartQuiz}/>
                        :
                        <>
                            <div className="progress">
                                <div className="fill-ring">
                                    <div className="count">
                                        <span className="current-question">{activeQuestion.currentQuestionIndex + 1}</span>/{activeQuestion.total}
                                    </div>
                                </div>
                                <div className="circular-progress">
                                    <CircularProgress variant="determinate" value={Math.round(((activeQuestion.currentQuestionIndex+1)/activeQuestion.total)*100)} />
                                </div>
                            </div>
                            {activeQuestion && <Question question={activeQuestion} submitAnswer={(answer: Array<string>) => submitAnswer(answer)} />}
                        </>
                }
            </div>
        </div>
    )
}

export default Quiz;