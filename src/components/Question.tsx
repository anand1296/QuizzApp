
import { useState } from 'react';
import { quizState } from "../store/quiz/quiz.slice";

const Question = ({question, submitAnswer}: {question: quizState, submitAnswer: (anser: Array<string>) => void}) => {

    const [selectedOptions, setSelectedOptions] = useState<Array<string>>([]);

    return (
        <div className="question">
            <div className="count">
                {}<span></span>
            </div>
            <p className="text">{question.currentQuestion?.text}</p>
            <div className="options">
                <input type="radio" onSelect={() => setSelectedOptions([])}/>
            </div>
            <div className="primary-btn">
                <button className="next-btn" disabled onClick={() => submitAnswer(selectedOptions)}>Next</button>
            </div>
        </div>
    )
}

export default Question;