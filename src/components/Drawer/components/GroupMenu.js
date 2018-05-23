import React, { Component } from 'react'
import IconButton from '@material-ui/core/IconButton';
import { Menu, MenuItem } from '@material-ui/core/';
import MoreVertIcon from '@material-ui/icons/MoreVert'
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import InviteDialog from './InviteDialog';
  
class GroupMenu extends Component {
    state = {
        anchorEl: null,
        open: false
    };

    handleClick = event => {
        this.setState({ anchorEl: event.currentTarget });
    };
    
    handleClose = () => {
        this.setState({ anchorEl: null });
    };
    
    openDialog = () => {
        this.setState({open: true});
    }

    closeDialog = () => {
        this.setState({open: false});
    }

    render() {
        const { anchorEl } = this.state;
        return (
            <div>
            <IconButton
                aria-label="More"
                aria-owns={anchorEl ? 'group-menu' : null}
                aria-haspopup="true"
                onClick={this.handleClick}
            >
                <MoreVertIcon />
            </IconButton>
            <Menu
                id="group-menu"
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={this.handleClose}
            >
                <Link to={`/groups/${this.props.group}/lists/add`}>
                  <MenuItem onClick={this.handleClose}>Add List</MenuItem>
                </Link>
                <Link to={`/groups/${this.props.group}/channels/add`}>
                  <MenuItem onClick={this.handleClose}>Add Channel</MenuItem>
                </Link>
                <MenuItem onClick={this.handleClose}>Edit Group</MenuItem>
                <MenuItem onClick={this.openDialog}>Invite Member</MenuItem>
                <InviteDialog open={this.state.open} closeDialog={this.closeDialog}
                    group={this.props.group}
                />
            </Menu>
            </div>
        )
    }
}

GroupMenu.propTypes = {
  group: PropTypes.string.isRequired,
  groupName: PropTypes.string.isRequired
};

export default GroupMenu;