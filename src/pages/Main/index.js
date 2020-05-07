import React, {useState, useEffect} from 'react';

import unirest from 'unirest';

import './index.css';

export default function MainPage(){
    const [projetos, setProjetos] = useState([]);
    useEffect(() => {
        unirest
        .get(`https://api.github.com/user/repos?visibility=public`)
        .headers({
            "authorization": 'token 3c8963ab120352474989d5e3e805d001f1de2f42',
            "user-agent":`rodcordeiro`
          })
        .then((response) => {
            setProjetos(response.body)
            
        })
    },[]);
    
    function formatBytes(bytes, decimals = 2) {
        if (bytes === 0) return '0 Bytes';
    
        const k = 1024;
        const dm = decimals < 0 ? 0 : decimals;
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    
        const i = Math.floor(Math.log(bytes) / Math.log(k));
    
        return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
    }

    function handleProject(e,project){
        e.preventDefault();
        let repName = document.getElementById('repName');
        let repDesc = document.getElementById('repDesc');
        let repGit = document.getElementById('repGit');
        let repHome = document.getElementById('repHome');
        repName.innerHTML = "&lt; " + project.name + " /&gt;";
        repDesc.innerHTML = project.description ? project.description : "Something that I don't know why the hell I didn't put a description.";
        repGit.href = project.html_url;
        repHome.href = project.homepage !== null ? project.homepage : project.html_url;
        repGit.innerHTML = project.html_url;
        repHome.innerHTML = project.homepage !== null ? project.homepage : project.html_url;
    }
        return (
            <div className="container">
            <header>
                <span>Rod Cordeiro</span>
                <img src="https://rodcordeiro.github.io/shares/img/RC.png" alt='logo'/>
            </header>
            <div className="content">
                <div className="repositories">
                    <h3>Here you can see my repositories and see a little more about my projects</h3>
                    <table>
                        <thead>
                            <tr className="repHeader" >
                                <th className="name">Repository name</th>
                                <th className="data">Creation date</th>
                                <th className="lang">Language</th>
                                <th className="size">Size</th>
                            </tr>                    
                        </thead>
                        <tbody>
                            {projetos.map(projeto=>{
                                if(projeto.fork !== true){
                                    return (
                                        <tr className="repository" key={projeto.id}onClick={(e)=>handleProject(e,projeto)} >
                                            <td className="name">{projeto.name}</td>
                                            <td className="data">{projeto.created_at}</td>
                                            <td className="lang">{projeto.language || "¯\\_(ツ)_/¯"}</td>
                                            <td className="size">{formatBytes(projeto.size)}</td>
                                        </tr> 
                                    )}
                            })}
                        </tbody>
                    </table>
                    
                </div>
                <div className="project">
                    <h1 id="repName">&lt;Repository /&gt;</h1>
                    <blockquote id="repDesc">Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam beatae quasi magnam voluptatibus? Id dicta similique deleniti eaque unde officia harum necessitatibus at sit, repellat iure amet, nihil fugiat illum.</blockquote>
                    <div className="projectLinks">
                        <h3>Links:</h3>
                        <hr className='line' />
                        <p className="link">Github: <a id="repGit" href="/" target="_blank">github.com</a></p>
                        <p className="link">Homepage: <a id="repHome" href="/" target="_blank">homepage.com</a></p>
                        
                    </div>
                </div>
            </div>
        </div>
        );
}