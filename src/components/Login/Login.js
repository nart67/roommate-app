import React, { Component } from 'react'
import { Button, Icon } from 'semantic-ui-react'

const Login = () => (
  <div>
    <a href='https://app.test:3000/auth/facebook/'>
    <Button color='facebook'>
      <Icon name='facebook' /> Log In with Facebook
    </Button>
    </a>
    <a href='https://app.test:3000/auth/google/'>
    <Button color='google plus'>
      <Icon name='google plus' /> Log In with Google
    </Button>
    </a>
  </div>
)

export default Login