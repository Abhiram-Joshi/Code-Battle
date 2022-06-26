import { useState, useEffect } from "react"; 
import axios from "../../../utils/axiosForBackend"


import './leaderboard.css';


const Leaderboard = () => {

  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    axios.get(`/lb/overall`)
      .then((response) => {
        return response.data
      })
      .then((data) => {
        console.log(data);
        setLeaderboard(data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const listItems = leaderboard.map(leader => 
    <div className="row leaderboard-item">
          <div className="col-lg-6 leaderboard-left">
            <h2>{leader.email}</h2>
          </div>
          <div className="col-lg-6 leaderboard-right">
            <h2>{leader.points}</h2>
          </div>
        </div>
      )

    return(
        <div className="section2 " id="aboutus">
        <div className="sec2main">
        <h1 className="heading2 extra-bold">Leaderboard</h1>
        <div className="row leaderboard">
          <div className="col-lg-6 leaderboard-left">
            <h2>Email</h2>
          </div>
          <div className="col-lg-6 leaderboard-right">
            <h2>Points</h2>
          </div>
        </div>
        {listItems}
        </div>
      <div className="footer">
        {/* <img src={wave} className="wave" alt="timemator" /> */}
        </div>
      </div>
    )
}

export default Leaderboard;