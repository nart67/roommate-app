
import React, { Component } from 'react'
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import InboxIcon from '@material-ui/icons/Inbox';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../../actions/';

class DrawerList extends Component {
    constructor(props) {
        super(props);
        this.logout = this.logout.bind(this);
    }

    logout() {
        fetch('/logout', {credentials: 'same-origin'})
        .then(response => {
            this.props.dispatch(logout());
            this.props.history.push('/');
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