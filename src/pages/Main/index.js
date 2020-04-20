import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';

import unirest from 'unirest';

import './index.css';

export default function MainPage(){
    const [projetos, setProjetos] = useState([]);
    useEffect(() => {
        unirest
        .get(`https://api.github.com/user/repos?visibility=public&affiliation=owner`)
        .headers({
            "authorization": `token ae67855cdb4b88783423ad3c4366fe88721aea86`,
            "user-agent":`rodcordeiro`
          })
        .then((response) => {
            setProjetos(response.body)
            
        })
    },[]);
    

    return (
        <div className='container'>
            
            <div className='content'>
                <h1>Repositórios</h1>
                <hr />
                <ul className='repositories'>
                    {projetos.map(projeto=>(
                        <li className='repository' key={projeto.id}>
                            <h3>{projeto.name}</h3>
                            <p>{projeto.description || "Something that just god, and maybe me, knows what it does"}</p>
                            <Link to='/'>Ver detalhes</Link>
                        </li>
                    )
                    )}
                </ul>            
            </div>
            
        </div>
    );
}