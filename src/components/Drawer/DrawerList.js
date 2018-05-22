import React, { Component } from 'react'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../../actions/auth';
import LoggedInDrawer from './components/LoggedInDrawer';

class DrawerList extends Component {
    state = {
        user: null
    }

    constructor(props) {
        super(props);
        this.logout = this.logout.bind(this);
    }

    logout() {
        fetch('/api/logout', {credentials: 'same-origin'})
        .then(response => {
            this.props.dispatch(logout());
            this.props.history.push('/');
        });
    }

    render() {
        return (
          <List component="nav">
            <div>
            { this.props.authenticated ?
                <LoggedInDrawer logout={this.logout} /> :
                <Link to='/login'>
                    <ListItem button>
                        <ListItemText inset primary="Sign In" />
                    </ListItem>
                </Link>
            }
            </div>
          </List>
        )
    }
}

const mapStateToProps = state => ({
    authenticated: state.auth,
    Group: state.orm.Group
  });

export default withRouter(connect(mapStateToProps)(DrawerList));