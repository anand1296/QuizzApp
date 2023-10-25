import { quizState } from "../store/quiz/quiz.slice";
import { FormControlLabel, Checkbox, Radio } from '@mui/material';
import CircleIcon from '@mui/icons-material/Circle';

const Result = ({ question, restartQuiz }: { question: quizState, restartQuiz: () => void }) => {

    const percentage = Math.round((question.correct / question.total) * 100);
    const pointerAngle = (percentage/100)*180 - 90;

    return (
        <div className="result">
            <div className="heading">Your result</div>
            <div className="score-wrapper">
                <div className="score-meter">
                    <div className="half-circle">
                        <div className="bg-1"></div>
                        <div style={{transform: `rotate(${pointerAngle}deg) scale(0.28)`}} className="pointer">
                            <svg xmlns="http://www.w3.org/2000/svg" width="160" height="292" viewBox="0 0 160 292" fill="none">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M79.6683 0C78.4606 0 77.375 0.73619 76.9281 1.85813L0 195H1.80997C0.624386 200.479 0 206.166 0 212C0 256.183 35.8172 292 80 292C124.183 292 160 256.183 160 212C160 206.166 159.376 200.479 158.19 195H159.356L154.771 183.49C154.494 182.764 154.206 182.043 153.909 181.327L82.4084 1.85789C81.9615 0.736075 80.8759 0 79.6683 0Z" fill="#1E1E28" />
                            </svg>
                        </div>
                        <div className="score">
                            <div className="percent">
                                {percentage}%
                            </div>
                        </div>
                        <div className="pentagon"></div>
                    </div>
                </div>

                <div className="correct-incorrect">
                    <div className="option correct">
                        <FormControlLabel control={<Radio checked color="success" icon={<CircleIcon />} checkedIcon={<CircleIcon />} />} label={<div className="count-text"><span className="count">{question.correct}</span>Correct</div>} />
                    </div>
                    <div className="option incorrect">
                        <FormControlLabel control={<Radio checked color="error" icon={<CircleIcon />} checkedIcon={<CircleIcon />} />} label={<div className="count-text"><span className="count">{question.total - question.correct}</span>Incorrect</div>} />
                    </div>
                </div>
                <div className="primary-btn restart">
                    <button className="start-btn" onClick={() => restartQuiz()}>Start Again</button>
                </div>
            </div>
        </div>
    )
}

export default Result;