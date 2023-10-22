
import { useState, useEffect, useRef } from 'react';
import { quizState } from "../store/quiz/quiz.slice";
import { FormControlLabel, Checkbox, Radio } from '@mui/material';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RadioGroup from '@mui/material/RadioGroup';

const Question = ({ question, submitAnswer }: { question: quizState, submitAnswer: (answer: Array<string>, timeTaken: number) => void }) => {

    //needed to scroll back to top of options list on change of question
    const scrollRef = useRef<HTMLDivElement>(null);

    const [selectedOptions, setSelectedOptions] = useState<Array<string>>([]);
    const [timeUntilSubmit, setTimeUntilSubmit] = useState(0);

    //handling cases of user seledted answer for radio and checkbox
    const onUserSelectionChange = (option: string, type: string) => {
        if (type === 'radio') {
            setSelectedOptions([option])
        }
        else {
            //in case of checkbox, check if current selection is present in asnwers array
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

    useEffect(() => {//will be called every time quetsion is submitted
        // console.log(question);
        setSelectedOptions([]);
        scrollRef?.current?.scrollTo({ top: 0, behavior: 'smooth' });//to rest the scroll of options list
        let timer = setInterval(() => {
            setTimeUntilSubmit((timeUntilSubmit) => timeUntilSubmit + 1);
        }, 1000);

        return () => {
            clearInterval(timer);
        };
    }, [question])

    return (
        <div className="question">
            <div className='text'>
                {question.currentQuestion?.text}
            </div>
            <div className='content-wrapper' ref={scrollRef}>
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
                <button disabled={!selectedOptions.length} className="next" onClick={() => { submitAnswer(selectedOptions, timeUntilSubmit); setTimeUntilSubmit(0); }}>Next</button>
            </div>
        </div>
    )
}

export default Question;