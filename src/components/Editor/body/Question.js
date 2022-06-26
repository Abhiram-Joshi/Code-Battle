import { useEffect, useState } from "react";
import cookie from "react-cookies"; 

const Question = () => 
{ 
    const [ques, setQues] = useState("");

    useEffect(()=> {
        setQues(localStorage.getItem("ques")); 
    },[])

    return(
        <> 
            <div dangerouslySetInnerHTML={{__html: ques}}></div>
        </>
    )
}

export default Question;