import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import MainPage from './pages/Main';
import ValidatePage from './pages/validate';

export default function Routes(){
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={MainPage} />
                // <Route path="/validate" component={ValidatePage} />
            </Switch>
        </BrowserRouter>
    );
}