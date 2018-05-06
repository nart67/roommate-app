import React, { Component } from 'react'
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../../actions/auth';
import Group from './components/Group';
import { createUser, createGroup, createList } from '../../actions/orm';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import { withStyles } from 'material-ui/styles';

import { normalize, schema } from 'normalizr';

// Define your article
const list = new schema.Entity('lists');

// Define your comments schema
const group = new schema.Entity('groups', {
  lists: [list]
});

// Define a users schema
const user = new schema.Entity('users', {
  groups: [group]
});

class DrawerList extends Component {
    state = {
        user
    }

    constructor(props) {
        super(props);
        this.logout = this.logout.bind(this);
        this.getGroups = this.getGroups.bind(this);
        this.getGroups();
    }

    logout() {
        fetch('/logout', {credentials: 'same-origin'})
        .then(response => {
            this.props.dispatch(logout());
            this.props.history.push('/');
        });
    }

    getGroups() {
        fetch('/users', {credentials: 'same-origin'})
        .then(response => {
            const contentType = response.headers.get("content-type");
            if (contentType && contentType.indexOf("application/json") !== -1) {
              return response.json();
            }
        }).then(data => {
            if (!data) return;
            const normalizedData = normalize(data.profile, user);
            this.updateData(normalizedData);
        });
    }

    updateData(normalizedData) {
        this.setState({user: normalizedData.result});
        const {users, groups, lists} = normalizedData.entities;
        for (const key in users) {
            if (users.hasOwnProperty(key))
                this.props.dispatch(createUser(users[key]));
        }
        for (const key in groups) {
            if (groups.hasOwnProperty(key))
                this.props.dispatch(createGroup(groups[key]));
        }
        for (const key in lists) {
            if (lists.hasOwnProperty(key))
                this.props.dispatch(createList(lists[key]));
        }
    }

    render() {
        return (
          <List component="nav">
            <div>
            { this.props.authenticated ||
            <Link to='/login'>
                <ListItem button>
                    <ListItemText inset primary="Sign In" />
                </ListItem>
            </Link>
            }

            {
                this.props.orm.Group.items && this.props.orm.Group.items.map((group) => 
                    <Group group={group} key={group} />
                )
            }
            <Link to='/'>
                <ListItem button>
                    <ListItemIcon>
                        <GroupAddIcon />
                    </ListItemIcon>
                    <ListItemText primary="Add Group" />
                </ListItem>
            </Link>

            { !this.props.authenticated ||
            <ListItem button onClick={this.logout}>
                <ListItemText inset primary="Log Out" />
            </ListItem>
            }
            </div>
          </List>
        )
    }
}

const mapStateToProps = state => ({
    authenticated: state.auth,
    orm: state.orm
  });

export default withRouter(connect(mapStateToProps)(DrawerList));