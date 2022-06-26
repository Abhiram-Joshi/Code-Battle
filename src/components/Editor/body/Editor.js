import React, { useState } from "react";   

import MonacoEditor from "@monaco-editor/react"; 

const Editor = () => { 
    
    const [language, setLanguage] = useState("");
    const [code, setCode] = useState(""); 

    let input="";

    function handleEditorChange(value, event) { 
        setCode(value);
        // console.log(code);
    }

    function getLanguage(){
        var select = document.getElementById('selectList');
        var lang = select.options[select.selectedIndex].value;
        setLanguage(lang); 
    }

    function onCompile(){
        const requestOptions = { 
            method: 'POST',
            headers: { 'Content-Type': 'application/json',
            'client-secret': 'c17d9b082be32cebc07556a662bea86e9bc4efd9',
         },
            body: JSON.stringify({  
                'source':{code},
                'input':{input},
                'lang':'JAVA',  
                'memory_limit': 243232,
                'time_limit': 5,  
            })
        };
        fetch('https://api.hackerearth.com/v4/partner/code-evaluation/submissions/', requestOptions)
            .then(response => response.json())
            .then(response=> console.log(response));
    }
      
    // Render editor
    return(
    <div className="editor-body"> 
        <h5 className="language-heading"><b>Choose language</b></h5>
        <select name="selectList" id="selectList" onChange={getLanguage} className="languages">
            <option value="javascript">Choose</option> 
            <option value="javascript">javascript</option> 
            <option value="java">java</option> 
            <option value="python">python</option> 
            <option value="xml">xml</option>  
            <option value="c">C</option> 
            <option value="cpp">C++</option>  
        </select>

        <MonacoEditor
            height="90vh"
            language={language}
            defaultValue="//Write your code here"
            onChange={handleEditorChange}
            theme="vs-dark"
        />

        <button className="compile-btn" onClick={onCompile}>Compile</button>
        </div>
    );
}

export default Editor;
