import React, { Component } from 'react'
import { Button, Icon } from 'semantic-ui-react'

const Login = () => (
  <div>
    <Button color='facebook'>
      <Icon name='facebook' /> Log In with Facebook
    </Button>
    <Button color='google plus'>
      <Icon name='google plus' /> Log In with Google
    </Button>
  </div>
)

export default Login