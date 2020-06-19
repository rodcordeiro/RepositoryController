import React from 'react';
import { useHistory } from 'react-router-dom';
import unirest from 'unirest';

import './index.css';

export default function TokenPage({ match, location }){
        const history = useHistory();
       
        async function queryValidate(values){
            let string = values.replace('?','').split('&');
            let response = {}
            for (var i = 0; i < string.length; i++) {
                response[string[i].split("=")[0]]=string[i].split("=")[1]
            }
            console.log(response)
            return response
        }
       
        async function getToken(values){
            console.clear()
            console.log(values)
            await unirest.get(`https://cordeiro-backend.herokuapp.com/github/validateToken?code=${values.code}&state=${values.state}`)
            .type("json")
            .headers({
                 "Access-Control-Allow-Origin": "no-cors",
                 "Access-Control-Allow-Methods":"POST, GET, OPTIONS"
            })
            .send({
                "client_id": process.env.REACT_APP_GITHUBAPP_CLIENT_ID,
                "client_secret": process.env.REACT_APP_GITHUBAPP_CLIENT_SECRET,
                "code": values.code,
                "state":values.state,
                "redirect_uri":"http://localhost:3000/token"
                })
            .then((response)=>{
                console.log(response.body)
                if (!response.body.error){
                    // process.env.REACT_APP_GITHUB_TOKEN=`token ${response.body.access_token}`
                    // history.push('/');
                    console.log(response.body.access_token)
                    }
            })
        }// onLoad={getToken({code: "e44e4c3b0f2955ec4f99", state: "138c912887803df41123"})}>

        
        return (
            <div className="container"onLoad={queryValidate(location.search)}>
            <header>
                <span>Rod Cordeiro</span>
                <img src="https://rodcordeiro.github.io/shares/img/RC.png" alt='logo'/>
            </header>
            <div className="maincontent" >
                <h1 onClick={()=>{getToken({code: "8f8d5f64767ca369e088", state: "7697282fa671c239751f"})}}>Ok, I'm getting the data, just a second please.</h1>
                                
            </div>
        </div>
        );
}