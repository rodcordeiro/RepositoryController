import React from 'react';
import generateUniqueId from '../../generateUniqueId';

import './index.css';

export default function MainPage(){
    let state = generateUniqueId()
    let link = `https://github.com/login/oauth/authorize?client_id=${process.env.REACT_APP_GITHUBAPP_CLIENT_ID}&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Ftoken&scope=repo&state=${state}&allow_signup=false`
        
        return (

            <div className="container">
            <header>
                <span>Rod Cordeiro</span>
                <img src="https://rodcordeiro.github.io/shares/img/RC.png" alt='logo'/>
            </header>
            <div className="maincontent">
                <h1>Hi, this is my repository controller. Here you can see all your repositories that are public and not forked.</h1>
                <p> For this, you must connect to my Github App, it'll create an access token granting the access to your public repositories.</p>
                <a href={link} >Click here to start!</a>
            </div>
        </div>
        );
}

