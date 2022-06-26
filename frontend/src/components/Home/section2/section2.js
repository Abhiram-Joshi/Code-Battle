import "./section2.css";
import img2 from "../../../images/img2.svg";
import wave from "../../../images/wave.svg"; 


const section2 = () => {
  return (
    <>
      <div className="section2 " id="aboutus">
        <div className="sec2main">
        <h1 className="heading2 extra-bold">About Us</h1>
        <div className="row">
          <div className="col-lg-6">
            <img src={img2} className="container img3" alt="timemator" />
          </div>
          <div className="col-lg-6 sec3txt">
            <p className="txt2">Code Battle is a platform where users can chose their category and difficulty level for the coding questions, code and compete with their opponents in different rooms and make their way on the top of the leaderboard</p>
          </div>
        </div>
        </div>
      <div className="footer">
        <img src={wave} className="wave" alt="timemator" />
        </div>
      </div>

    </>
  );
};

export default section2;

