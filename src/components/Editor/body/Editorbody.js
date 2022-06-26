import Question from "./Question";
import Editor from "./Editor";
import "./Editor.css"; 
import Timer from "./Timer";

const Editorbody = () => {

  // useEffect(()=> {
  //   var socket = io.connect('http://c508-2401-4900-1cc8-de80-903b-aa9a-cf48-265b.ngrok.io/');
  //   // socket.emit("startRound"); 
  // },[])

    return(
        <div className="editor">
        <div>
          <h2 className="heading3 extra-bold">Editor</h2> 
          <Timer />
          <Question />
          <Editor />
        </div>
        </div>
    )
}

export default Editorbody;