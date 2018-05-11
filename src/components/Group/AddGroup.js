import React, { Component } from 'react';
import Grid from 'material-ui/Grid';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import Paper from 'material-ui/Paper';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from 'material-ui/styles';
import NoteAdd from '@material-ui/icons/NoteAdd';
import { connect } from 'react-redux';
import { GroupActions } from '../../actions/orm';
import { socket } from '../../socket/socket';

const styles = theme => ({
    textField: {
        width: 'calc(100% - 140px)',
        margin: theme.spacing.unit
    },
    button: {
      margin: theme.spacing.unit,
      width: '100px'
    },

    rightIcon: {
      marginLeft: theme.spacing.unit,
    }
  });
  

class AddGroup extends Component {
    state = {
      value: ''
    }

    constructor(props) {
      super(props);
    }
  
    handleChange = (event) => {
      this.setState({
        value: event.target.value,
      });
    };

    submit = () => {
        var data = new URLSearchParams();
        data.append('group', JSON.stringify({displayName: this.state.value}));
        fetch(`/api/groups/`, {
          body: data,
          credentials: 'same-origin',
          method: 'POST',
          headers: new Headers({
            'Content-Type': 'application/x-www-form-urlencoded'
          })
        })
        .then(response => {
            const contentType = response.headers.get("content-type");
            if (contentType && contentType.indexOf("application/json") !== -1) {
              return response.json();
            }
        }).then(data => {
            console.log(data);
            if (data.group) this.props.dispatch(GroupActions.createGroup(data.group));
        });
    }
  
    render() {
      const { classes } = this.props;
      return (
        <div className="AddTaskDiv">
          <Paper rounded='false'>
          <TextField
            className={classes.textField}
            id="AddTaskField"
            value={this.state.value}
            onChange={this.handleChange}
          />
          <Button className={classes.button} variant="raised" color="default" onClick={this.submit}>
            Add
            <NoteAdd className={classes.rightIcon} />
          </Button>
          </Paper>     
        </div>
      );
    }
  }

  AddGroup.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
  export default withStyles(styles)(connect()(AddGroup));