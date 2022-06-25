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
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                clientId: '9b471671c20a488487d4371855706bd3',
                clientSecret: 'da454c814f62d08137b5d8632d53112c6258bf3572a668ad2cda430ad68b49a1',
                script:{code},
                stdin:{input},
                language:{language},
            })
        };
        fetch('https://api.jdoodle.com/v1/execute', requestOptions)
            .then(response => response.json())
            .then(response=> console.log(response));
    }
      
    // Render editor
    return(
    <div>
        <h2>Editor</h2>
        <select name="selectList" id="selectList" onChange={getLanguage}>
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

        <button onClick={onCompile}>Compile</button>
        </div>
    );
}

export default Editor;
