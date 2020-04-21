import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import MainPage from './pages/Main';
import ProjectPage from './pages/Project';

export default function Routes(){
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={MainPage} />
                <Route path="/" component={ProjectPage} />
            </Switch>
        </BrowserRouter>
    );
}