import { useNavigate } from "react-router-dom";
import { AppRoutes } from "../utils/routes";


export function Home() {

  const navigate = useNavigate();

  return (
    <div className="home">
      <div className="logo">
        <img src="/images/logos/group.svg" alt="logo" />
        upraised
      </div>
      <div className="title">
        <div className="title-circle">
          Quiz
        </div>
      </div>
      <div className="primary-btn">
        <button className="start-btn" onClick={() => navigate(AppRoutes.QUIZ)}>Start</button>
      </div>
    </div>
  );
}

export default Home;
