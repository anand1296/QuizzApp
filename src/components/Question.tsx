
import { useState, useEffect } from 'react';
import { quizState } from "../store/quiz/quiz.slice";
import { FormControlLabel, Checkbox, Radio } from '@mui/material';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RadioGroup from '@mui/material/RadioGroup';

const Question = ({ question, submitAnswer }: { question: quizState, submitAnswer: (anser: Array<string>) => void }) => {

    const [selectedOptions, setSelectedOptions] = useState<Array<string>>([]);

    const onUserSelectionChange = (option: string, type: string) => {
        if (type === 'radio') {
            setSelectedOptions([option])
        }
        else {
            if (selectedOptions.includes(option)) {
                const index = selectedOptions.findIndex((item) => item === option);
                const splicedOptions = selectedOptions.splice(index, 1);
                setSelectedOptions(splicedOptions);
            }
            else {
                const updatedOptions = [...selectedOptions];
                updatedOptions.push(option);
                setSelectedOptions(updatedOptions);
            }
        }
    }

    useEffect(() => {
        console.log(question);
        setSelectedOptions([]);
    }, [question])

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
                    {question.currentQuestion?.multiple ?
                        question.currentQuestion?.options?.map((option, index) =>
                            <div className='option' key={question.currentQuestionIndex + 'option' + index}>
                                <FormControlLabel control={<Checkbox color='success' icon={<RadioButtonUncheckedIcon />}
                                    checkedIcon={<CheckCircleIcon />} onChange={() => onUserSelectionChange(option, 'checkbox')} />} label={option} />
                            </div>
                        ) :
                        <RadioGroup
                            aria-labelledby="demo-controlled-radio-buttons-group"
                            name="controlled-radio-buttons-group"
                            value={selectedOptions[0]}
                            onChange={(event) => onUserSelectionChange(event.target.value, 'radio')}
                        >
                            {question.currentQuestion?.options?.map((option, index) =>
                                <div className='option' key={question.currentQuestionIndex + 'option' + index}>
                                    <FormControlLabel control={<Radio value={option} color="success" />} label={option} />
                                </div>
                            )}
                        </RadioGroup>

                    }
                </div>
            </div>
            <div className="primary-btn next-btn">
                <button className="next" onClick={() => submitAnswer(selectedOptions)}>Next</button>
            </div>
        </div>
    )
}

export default Question;