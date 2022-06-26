import cookie from "react-cookies"; 

const Question = () => {

    // const ques = cookie.load("question");  
    const ques = localStorage.getItem("ques"); 

    return(
        <> 
            <div dangerouslySetInnerHTML={{__html: ques}}></div>
        </>
    )
}

export default Question;