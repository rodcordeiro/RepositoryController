import React, {useState, useEffect} from 'react';
import { useHistory } from 'react-router-dom';
import unirest from 'unirest';
import generateUniqueId from '../../generateUniqueId';
import './index.css';

export default function ValidatePage({ match, location }){
        const history = useHistory();
        let state = generateUniqueId()
        async function query(values){
            let string = values.replace('?','').split('&');
            let response = {}
            for (var i = 0; i < string.length; i++) {
                response[string[i].split("=")[0]]=string[i].split("=")[1]
            }
           
            await unirest.post("https://github.com/login/oauth/access_token")
            .type("json")
            .send({
                "client_id": process.env.REACT_APP_GITHUBAPP_CLIENT_ID,
                "client_secret": process.env.REACT_APP_GITHUBAPP_CLIENT_SECRET,
                "code": response.code,
                "state":response.state,
                "redirect_uri":"https://engfvyfobkgmc.x.pipedream.net/"
                })
            .then((response)=>{
                if (!response.body.error){
                    process.env.REACT_APP_GITHUB_TOKEN=`token ${response.body.access_token}`
                    history.push('/');
                    }
            })
        }
        if(process.env.REACT_APP_GITHUB_TOKEN){
        return (
            <div className="container" >
            <header>
                <span>Rod Cordeiro</span>
                <img src="https://rodcordeiro.github.io/shares/img/RC.png" alt='logo'/>
            </header>
            <div className="content">
                <h1>{JSON.stringify(query(location.search),null,2)}</h1>
            </div>
        </div>
        );
} else {
        return (
            <div className="container" >
            <header>
                <span>Rod Cordeiro</span>
                <img src="https://rodcordeiro.github.io/shares/img/RC.png" alt='logo'/>
            </header>
            <div className="content">
                <h1>`https://github.com/login/oauth/authorize?client_id=${process.env.GITHUBAPP_CLIENT_ID}&redirect_uri=http%3A%2F%2Fcordeiro-backend.herokuapp.com%2Fgithub%2FvalidateToken&scope=repo%20user%20delete_repo&state=${state}&allow_signup=false`</h1>
            </div>
        </div>
        );
}
}
