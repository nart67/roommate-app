import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import NoteAdd from '@material-ui/icons/NoteAdd';
import { connect } from 'react-redux';
import { GroupActions } from '../../actions/orm';

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