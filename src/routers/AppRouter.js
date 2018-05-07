import React from 'react';
import { BrowserRouter, Route, Switch, Link, NavLink } from 'react-router-dom';
import Home from '../components/Home/Home';
import Login from '../components/Login/Login';
import ViewTaskList from '../components/List/ViewTaskList';
import AddList from '../components/List/AddList';

const AppRouter = () => (
    <div>
      <Switch>
        <Route path="/" component={Home} exact={true} />
        <Route path="/login" component={Login} />
        <Route path='/lists/:id' exact component={ViewTaskList} />
        <Route path='/groups/:id/lists' exact component={AddList} />
      </Switch>
    </div>
);

export default AppRouter;
