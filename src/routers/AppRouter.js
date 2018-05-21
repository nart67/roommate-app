import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from '../components/Home/Home';
import Login from '../components/Login/Login';
import ViewTaskList from '../components/List/ViewTaskList';
import AddList from '../components/List/AddList';
import AddGroup from '../components/Group/AddGroup';
import AddChannel from '../components/Channel/AddChannel';
import Chat from '../components/Chat/Chat';

const AppRouter = () => (
    <div>
      <Switch>
        <Route path="/" component={Home} exact={true} />
        <Route path="/login" component={Login} />
        <Route path='/lists/:id' exact component={ViewTaskList} />
        <Route path='/groups/:id/lists/add' exact component={AddList} />
        <Route path='/groups/:id/channels/add' exact component={AddChannel} />
        <Route path='/groups/add' exact component={AddGroup} />
        <Route path='/channels/:id' exact component={Chat} />
      </Switch>
    </div>
);

export default AppRouter;
