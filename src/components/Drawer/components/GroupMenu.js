import React, { Component } from 'react'
import IconButton from 'material-ui/IconButton';
import Menu, { MenuItem } from 'material-ui/Menu';
import MoreVertIcon from '@material-ui/icons/MoreVert'
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
  
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
                <Link to={`/groups/${this.props.group}/lists/add`}>
                  <MenuItem onClick={this.handleClose}>Add List</MenuItem>
                </Link>
                <Link to={`/groups/${this.props.group}/channels/add`}>
                  <MenuItem onClick={this.handleClose}>Add Channel</MenuItem>
                </Link>
                <MenuItem onClick={this.handleClose}>Edit Group</MenuItem>
            </Menu>
            </div>
        )
    }
}

GroupMenu.propTypes = {
  group: PropTypes.string,
};

export default GroupMenu;