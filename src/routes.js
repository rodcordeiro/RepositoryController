import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import MainPage from './pages/Main';
import RepositoriesPage from './pages/Repositories';
import TokenPage from './pages/Token';

export default function Routes(){
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={MainPage} />
                <Route path="/token" component={TokenPage} />
                <Route path="/repositories" component={RepositoriesPage} />
            </Switch>
        </BrowserRouter>
    );
}