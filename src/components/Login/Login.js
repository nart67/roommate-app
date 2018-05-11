import React, { Component } from 'react'
import { Button, Icon } from 'semantic-ui-react'

const Login = () => (
  <div>
    <a href='/api/auth/facebook/'>
    <Button color='facebook'>
      <Icon name='facebook' /> Log In with Facebook
    </Button>
    </a>
    <a href='/api/auth/google/'>
    <Button color='google plus'>
      <Icon name='google plus' /> Log In with Google
    </Button>
    </a>
  </div>
)

export default Login