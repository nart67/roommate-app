import React from 'react'
import { ListItem, ListItemIcon, ListItemText } from '@material-ui/core/';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Group from './Group';
import GroupAddIcon from '@material-ui/icons/GroupAdd';

const LoggedInDrawer = (props) => {
    return (
    <div>
        {
            props.Group.items && props.Group.items.map((group) => 
                <Group group={group} key={group} />
            )
        }

        <Link to='/groups/add'>
            <ListItem button>
                <ListItemIcon>
                    <GroupAddIcon />
                </ListItemIcon>
                <ListItemText primary="Add Group" />
            </ListItem>
        </Link>

        <Link to='/invites'>
            <ListItem button>
                <ListItemIcon>
                    <GroupAddIcon />
                </ListItemIcon>
                <ListItemText primary="View Invitations" />
            </ListItem>
        </Link>

        <ListItem button onClick={props.logout}>
            <ListItemText inset primary="Log Out" />
        </ListItem>
    </div>
)}


const mapStateToProps = state => ({
    Group: state.orm.Group
  });

export default connect(mapStateToProps)(LoggedInDrawer);