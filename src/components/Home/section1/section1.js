import './section1.css'
import img1 from "../../../images/img1.svg";


const section1 = () => {
    return(
        <div className="row section1 " id="home">
            <div className="col-lg-5">
                <h1 className="extra-bold">Code Battle</h1> 
                <h3 className="txt">"Join the Coding battle, it's live!"</h3> 
            </div>
            <div className="col-lg-6">
            <img src={img1} className="container img1" alt="timemator"/>
            </div>
        </div>
    )
}

export default section1;