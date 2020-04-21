import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';

import unirest from 'unirest';

import './index.css';

export default function ProjectPage(){
    const [projetos, setProjetos] = useState([]);
    console.log(process.env.GITHUB_TOKEN)
    useEffect(() => {
        unirest
        .get(`https://api.github.com/user/repos?visibility=public`)
        .headers({
            "authorization": 'token d927b1de9749775137a1efe41e76ac93c09afcb1',
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
        localStorage.setItem('project', project)
    }
        return (
        <div className='container'>
            
            <div className='content'>
                <header>
                    <img src="https://rodcordeiro.github.io/shares/img/RC-W.png" alt="logo" />
                    <h1>Repositórios</h1>
                </header>
                <hr />
                <table>
                <tr className='line'>
                        <th>Repository</th>
                        <th>Description</th>
                        <th>Created</th>
                        <th>Language</th>
                        <th>Size</th>
                    </tr>
                    {projetos.map(projeto=>{
                        if(projeto.fork !== true){
                            return (
                                <tr className='line' key={projeto.id}>
                                <Link to='/' onClick={(e)=>handleProject(e,projeto)}>
                                    <td>{projeto.name}</td>
                                </Link>
                                <td>{projeto.description || (<i>"Something that I need to read again to remember what it does."</i>)}</td>
                                <td>{projeto.created_at}</td>
                                <td>{projeto.language || "¯\_(ツ)_/¯"}</td>
                                <td>{formatBytes(projeto.size)}</td>
                            </tr>
                            )
                        }
                    })}
                </table>
                
            </div>
            
        </div>
    );
}