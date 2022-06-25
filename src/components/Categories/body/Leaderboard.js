import { useNavigate } from "react-router-dom";

import './leaderboard.css';


const Leaderboard = () => {

  const navigate = useNavigate();

    return(
        <div className="section2 " id="aboutus">
        <div className="sec2main">
        <h1 className="heading2 extra-bold">Leaderboard</h1>
        <div className="row leaderboard">
          <div className="col-lg-6 leaderboard-left">
            <h2>Name</h2>
          </div>
          <div className="col-lg-6 leaderboard-right">
            <h2>Points</h2>
          </div>
        </div>
        </div>
      <div className="footer">
        {/* <img src={wave} className="wave" alt="timemator" /> */}
        </div>
      </div>
    )
}

export default Leaderboard;