import { quizState } from "../store/quiz/quiz.slice";
import { FormControlLabel, Checkbox, Radio } from '@mui/material';
import CircleIcon from '@mui/icons-material/Circle';

const Result = ({ question, restartQuiz }: { question: quizState, restartQuiz: () => void }) => {

    const percentage = Math.round((question.correct / question.total) * 100);
    const pointerAngle = (percentage/100)*180 - 90

    return (
        <div className="result">
            <div className="heading">Your result</div>
            <div className="score-wrapper">
                <div className="score-meter">
                    <div className="score">
                        <div className="percent">
                            {percentage} %
                        </div>
                    </div>
                    <svg className="gradient" xmlns="http://www.w3.org/2000/svg" width="500" height="260" viewBox="0 0 500 260" fill="none">
                        <path d="M490 250C490 117.452 382.548 10 250 10C117.452 10 10 117.452 10 250" stroke="url(#paint0_linear_86_5)" strokeWidth="20" strokeLinecap="round" />
                        <defs>
                            <linearGradient id="paint0_linear_86_5" x1="490" y1="10" x2="10" y2="10" gradientUnits="userSpaceOnUse">
                                <stop stopColor="#44B77B" />
                                <stop offset="0.479043" stopColor="#FFD033" />
                                <stop offset="1" stopColor="#FF3B3F" />
                            </linearGradient>
                        </defs>
                    </svg>
                    <svg className="bg" xmlns="http://www.w3.org/2000/svg" width="480" height="348" viewBox="0 0 480 348" fill="none">
                        <path fillRule="evenodd" clipRule="evenodd" d="M25.3029 347.379L240.059 240L454.716 347.342C470.895 315.042 480 278.584 480 240C480 107.452 372.548 0 240 0C107.452 0 0 107.452 0 240C0 278.599 9.11223 315.07 25.3029 347.379Z" fill="#EBEDF5" />
                    </svg>
                    <svg style={{transform: `rotate(${pointerAngle}deg) scale(0.7)`}} className="pointer" xmlns="http://www.w3.org/2000/svg" width="160" height="292" viewBox="0 0 160 292" fill="none">
                        <path fillRule="evenodd" clipRule="evenodd" d="M79.6683 0C78.4606 0 77.375 0.73619 76.9281 1.85813L0 195H1.80997C0.624386 200.479 0 206.166 0 212C0 256.183 35.8172 292 80 292C124.183 292 160 256.183 160 212C160 206.166 159.376 200.479 158.19 195H159.356L154.771 183.49C154.494 182.764 154.206 182.043 153.909 181.327L82.4084 1.85789C81.9615 0.736075 80.8759 0 79.6683 0Z" fill="#1E1E28" />
                    </svg>
                </div>

                <div className="correct-incorrect">
                    <div className="option correct">
                        <FormControlLabel control={<Radio checked color="success" icon={<CircleIcon />} checkedIcon={<CircleIcon />} />} label={<div className="count-text"><span className="count">{question.correct}</span>Correct</div>} />
                    </div>
                    <div className="option incorrect">
                        <FormControlLabel control={<Radio checked color="error" icon={<CircleIcon />} checkedIcon={<CircleIcon />} />} label={<div className="count-text"><span className="count">{question.total-question.correct}</span>Incorrect</div>} />
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