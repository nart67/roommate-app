import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Drawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import Hidden from 'material-ui/Hidden';
import Divider from 'material-ui/Divider';
import MenuIcon from '@material-ui/icons/Menu';
import AppRouter from '../../routers/AppRouter';
import DrawerList from '../Drawer/DrawerList';
import { BrowserRouter, Route, Switch, Link, NavLink } from 'react-router-dom';
import { createUser, GroupActions, ListActions, ChannelActions,
  createTask, removeTask, updateTask } from '../../actions/orm';
import { connect } from 'react-redux';
import socket from '../../socket/socket';

import { normalize, schema } from 'normalizr';
import { messageReceived } from '../../actions/messages';

const drawerWidth = 240;

const styles = theme => ({
  root: {
    flexGrow: 1,
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
    width: '100%',
  },
  appBar: {
    position: 'absolute',
    marginLeft: drawerWidth,
    [theme.breakpoints.up('md')]: {
      width: `calc(100% - ${drawerWidth}px)`,
    },
  },
  navIconHide: {
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
    [theme.breakpoints.up('md')]: {
      position: 'relative',
    },
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
  },
});

// Define your list
const list = new schema.Entity('lists');

const channel = new schema.Entity('channels');

// Define your group schema
const group = new schema.Entity('groups', {
  lists: [list],
  channels: [channel]
});

// Define a users schema
const user = new schema.Entity('users', {
  groups: [group]
});

class SideNav extends React.Component {
  state = {
    mobileOpen: false,
  };

  constructor(props) {
    super(props);
    this.getGroups();
    this.subscribeSocket();
  }

  handleDrawerToggle = () => {
    this.setState({ mobileOpen: !this.state.mobileOpen });
  };

  getGroups() {
    this.fetched = true;
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
    this.setState((prevState, props) => {user: normalizedData.result});
    const {users, groups, lists, channels} = normalizedData.entities;
    for (const key in users) {
        if (users.hasOwnProperty(key))
            this.props.dispatch(createUser(users[key]));
    }
    for (const key in groups) {
        if (groups.hasOwnProperty(key)) {
            this.props.dispatch(GroupActions.createGroup(groups[key]));
            socket.emit('subscribe', groups[key].id);
        }
    }
    for (const key in lists) {
        if (lists.hasOwnProperty(key))
            this.props.dispatch(ListActions.createList(lists[key]));
    }
    for (const key in channels) {
      if (channels.hasOwnProperty(key))
          this.props.dispatch(ChannelActions.createChannel(channels[key]));
    }
  }

  subscribeSocket() {
    const self = this;
    socket.on('list', function(data) {
        console.log(data);
        switch (data.type) {
        case 'ADD':
            self.props.dispatch(ListActions.createList(data.list));
            self.props.dispatch(GroupActions.addList(data.list));
            break;
        case 'DELETE':
            self.props.dispatch(ListActions.removeList(data.list));
            self.props.dispatch(GroupActions.removeList(data.list));
            break;
        case 'UPDATE':
            self.props.dispatch(ListActions.updateList(data.list));
            break;
        default:
            break;
        }
    });
    socket.on('channel', function(data) {
      console.log(data);
      switch (data.type) {
      case 'ADD':
          self.props.dispatch(ChannelActions.createChannel(data.channel));
          self.props.dispatch(GroupActions.addChannel(data.channel));
          break;
      case 'DELETE':
          self.props.dispatch(ChannelActions.removeChannel(data.channel));
          self.props.dispatch(GroupActions.removeChannel(data.channel));
          break;
      case 'UPDATE':
          self.props.dispatch(ChannelActions.updateChannel(data.channel));
          break;
      default:
          break;
      }
    });
    socket.on('task', function(data) {
      console.log(data);
      if (!socket.lists[data.task.task_list]) return;
      switch (data.type) {
      case 'ADD':
          self.props.dispatch(createTask(data.task));
          break;
      case 'DELETE':
          self.props.dispatch(removeTask(data.task));
          break;
      case 'UPDATE':
          self.props.dispatch(updateTask(data.task));
          break;
      default:
          break;
      }
    });
    socket.on('chat message', function(data) {
      const { message, user } = data;
      console.log(data);
      self.props.dispatch(messageReceived(message, user));
    })
  }



  render() {
    const { classes, theme } = this.props;

    const drawer = (
      <div>
        <div className={classes.toolbar} />
        <Divider />
        <DrawerList />
      </div>
    );

    return (
      <BrowserRouter>
      <div className={classes.root}>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={this.handleDrawerToggle}
              className={classes.navIconHide}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="title" color="inherit" noWrap>
              Roommate App
            </Typography>
          </Toolbar>
        </AppBar>
        <Hidden mdUp>
          <Drawer
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={this.state.mobileOpen}
            onClose={this.handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden smDown implementation="css">
          <Drawer
            variant="permanent"
            open
            classes={{
              paper: classes.drawerPaper,
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <main className={classes.content}>
          <div className={classes.toolbar}/>
          <AppRouter/>
        </main>
      </div>
      </BrowserRouter>
    );
  }
}

SideNav.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(connect()(SideNav));
