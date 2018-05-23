import React, { Component } from 'react'
import { connect } from 'react-redux'
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { inviteReceived, fetched } from '../../actions/invites';
import Invite from './Invite';
import Typography from '@material-ui/core/Typography';

class ViewInvites extends Component {    
    
    constructor(props) {
        super(props);
        props.invites.fetched || this.getInvites();
    }
     
    getInvites = () => {
        fetch(`/api/invites`, {credentials: 'same-origin'})
        .then(response => {
            const contentType = response.headers.get("content-type");
            if (contentType && contentType.indexOf("application/json") !== -1) {
              return response.json();
            }
        }).then(data => {
            if (data) {
                this.props.dispatch(fetched());
                for (let i = 0; i < data.invites.length; i++) {
                    this.props.dispatch(inviteReceived(data.invites[i]));
                }
            }
        });
    }

    acceptInvite = (id) => {
        fetch(`/api/invites/${id}/accept`, {
            credentials: 'same-origin',
            method: 'POST',
        })
        .then(response => {
            const contentType = response.headers.get("content-type");
            if (contentType && contentType.indexOf("application/json") !== -1) {
              return response.json();
            }
        }).then(data => {
            if (data) {
                console.log(data);
            }
        });
    }
    
    declineInvite = (id) => {
        fetch(`/api/invites/${id}`, {
            credentials: 'same-origin',
            method: 'DELETE',
        })
        .then(response => {
            const contentType = response.headers.get("content-type");
            if (contentType && contentType.indexOf("application/json") !== -1) {
              return response.json();
            }
        }).then(data => {
            if (data) {
                console.log(data);
            }
        });
    }

    render() {
        return (
          <div className='invite-list'>
            <Grid container justify='center' spacing={16}>
            <Grid item xs={12} sm={8}>
            <Paper rounded='false'>
                <Typography variant="display1">
                    Invitations
                </Typography>
                { this.props.user && 
                    <Typography variant="title">
                        Your user ID is {this.props.user}
                    </Typography>
                }
                <ul>
                {
                    this.props.invites.invites.map((invite) => (
                        <Invite key={invite.id} invite={invite} 
                            accept={this.acceptInvite}
                            decline={this.declineInvite}
                        />
                    ))
                }
                </ul>
            </Paper>
            </Grid>
            </Grid>
          </div>
        );
    }
}

const mapStateToProps = state => ({
    invites: state.invites,
    user: state.orm.User.items[0]
  });

export default connect(mapStateToProps)(ViewInvites);