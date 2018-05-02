import React from 'react';
import { BrowserRouter, Route, Switch, Link, NavLink } from 'react-router-dom';
import Home from '../components/Home/Home';
import Login from '../components/Login/Login';
import ViewTaskList from '../components/Tasks/ViewTaskList';

const AppRouter = () => (
    <div>
      <Switch>
        <Route path="/" component={Home} exact={true} />
        <Route path="/login" component={Login} />
        <Route path='/lists/:id' exact component={ViewTaskList} />
      </Switch>
    </div>
);

export default AppRouter;
