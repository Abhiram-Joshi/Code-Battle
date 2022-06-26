import React, { useState } from "react";   
import socket from "../../../utils/socket";
import cookie from "react-cookies"; 

import MonacoEditor from "@monaco-editor/react"; 

const Editor = () => { 
    
    const [language, setLanguage] = useState("");
    const [code, setCode] = useState(""); 
    const [error, setError] = useState(false); 
    const [pass, setPass] = useState(false); 

    let input="";
    const category = cookie.load("category");  
    const difficulty = cookie.load("difficulty");  
    const email = cookie.load("key");  


    function handleEditorChange(value, event) { 
        setCode(value);
        // console.log(code);
    }

    function getLanguage(){
        var select = document.getElementById('selectList');
        var lang = select.options[select.selectedIndex].value;
        setLanguage(lang); 
    }

    const listener = (...args) => {
        console.log(args[0]);
        if(args[0].status=="error")
        {
            setError(args[0].data.details);
        }
        if(args[0].status=="success")
        {
            setPass(true);
        }
        
    }

    async function onCompile (){ 
        setError(false);
        setPass(false);
        await socket.emit("compileCode",  {code:code, time:'60', email:email, language:language, version:0} );
        socket.on("compileResult", listener);
    }
      
    // Render editor
    return(
    <div className="editor-body"> 
        <h5 className="language-heading"><b>Choose language</b></h5>
        <select name="selectList" id="selectList" onChange={getLanguage} className="languages">
            <option value="javascript">Choose</option> 
            <option value="javascript">Javascript</option> 
            <option value="java">Java</option> 
            <option value="python">Python3</option> 
            <option value="xml">Xml</option>  
            <option value="c">C</option> 
            <option value="cpp">CPP17</option>  
        </select>

        <MonacoEditor
            height="90vh"
            language={language}
            defaultValue="//Write your code here"
            onChange={handleEditorChange}
            theme="vs-dark"
        />

        <button className="compile-btn" onClick={onCompile}>Compile</button>
        {error && <div className="error">{error}</div>}
        {pass && <div className="pass"><h3>Compiled Successfully!!!</h3></div>}
        </div>
    );
}

export default Editor;
