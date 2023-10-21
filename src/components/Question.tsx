
import { useState } from 'react';
import { quizState } from "../store/quiz/quiz.slice";
import { FormControlLabel, Checkbox, Radio } from '@mui/material';

const Question = ({ question, submitAnswer }: { question: quizState, submitAnswer: (anser: Array<string>) => void }) => {

    const [selectedOptions, setSelectedOptions] = useState<Array<string>>([]);

    return (
        <div className="question">
            <div className='text'>
                {question.currentQuestion?.text}
            </div>
            <div className='content-wrapper'>
                {question.currentQuestion?.image && <div className='image-wrapper'>
                    <img src={question.currentQuestion?.image} alt="" />
                </div>
                }
                <div className="options-wrapper">
                    {
                        question.currentQuestion?.options.map((option, index) => (
                            <div className='option' key={index}>
                                <FormControlLabel value="female" control={question.currentQuestion?.multiple ? <Checkbox color='success' /> : <Radio color="success" />} label={option} />
                            </div>
                        ))
                    }
                </div>
            </div>
            <div className="primary-btn next-btn">
                <button className="next" disabled onClick={() => submitAnswer(selectedOptions)}>Next</button>
            </div>
        </div>
    )
}

export default Question;