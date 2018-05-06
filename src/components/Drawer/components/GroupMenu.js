import React, { Component } from 'react'
import IconButton from 'material-ui/IconButton';
import Menu, { MenuItem } from 'material-ui/Menu';
import MoreVertIcon from '@material-ui/icons/MoreVert'
import { ListItemSecondaryAction } from 'material-ui/List'
  
class GroupMenu extends Component {
    state = {
        anchorEl: null
    };

    handleClick = event => {
        this.setState({ anchorEl: event.currentTarget });
    };
    
    handleClose = () => {
        this.setState({ anchorEl: null });
    };
    
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
                <MenuItem onClick={this.handleClose}>Add List</MenuItem>
                <MenuItem onClick={this.handleClose}>Add Channel</MenuItem>
                <MenuItem onClick={this.handleClose}>Edit Group</MenuItem>
            </Menu>
            </div>
        )
    }
}

export default GroupMenu;