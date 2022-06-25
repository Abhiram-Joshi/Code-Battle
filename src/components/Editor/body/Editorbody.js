import Question from "./Question";
import Editor from "./Editor";

const Editorbody = () => {
    return(
        <div className="categories-body">
        <div>
          <h2 className="heading1 extra-bold">Editor</h2> 
          <Question />
          <Editor />
        </div>
        </div>
    )
}

export default Editorbody;