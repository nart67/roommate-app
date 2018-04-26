
import React, { Component } from 'react'
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../../actions/auth';
import Group from './components/Group';

class DrawerList extends Component {
    state = {
        profile: {}
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
            this.setState({profile: {}});
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
            data && this.setState({profile: data.profile});
        });
    }

    render() {
        return (
          <List component="nav">
            { this.props.authenticated ||
            <Link to='/login'>
                <ListItem button>
                    <ListItemText inset primary="Sign In" />
                </ListItem>
            </Link>
            }

            {
                this.state.profile.groups && this.state.profile.groups.map((group) => 
                    <Group group={group} />
                )
            }

            { !this.props.authenticated ||
            <ListItem button onClick={this.logout}>
                <ListItemText inset primary="Log Out" />
            </ListItem>
            }
          </List>
        )
    }
}

const mapStateToProps = state => ({
    authenticated: state.auth
  });

export default withRouter(connect(mapStateToProps)(DrawerList));