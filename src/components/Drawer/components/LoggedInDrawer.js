import React, { Component } from 'react'
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import { Link, withRouter } from 'react-router-dom';
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

        <ListItem button onClick={props.logout}>
            <ListItemText inset primary="Log Out" />
        </ListItem>
    </div>
)}


const mapStateToProps = state => ({
    Group: state.orm.Group
  });

export default connect(mapStateToProps)(LoggedInDrawer);