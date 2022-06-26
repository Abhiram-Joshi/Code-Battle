import { useEffect, useState } from "react"; 

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