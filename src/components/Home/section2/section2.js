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
            <p className="txt2">Indian Society for Technical Education or ISTE is a national, professional, non-profit making Society registered under the Societies Registration Act of 1860. The major objective of ISTE is to assist and contribute to the production and development of top-quality professional engineers and technicians required by industries and other organizations.</p>
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

