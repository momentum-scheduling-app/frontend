import React, { Component } from 'react'
import { Label, Input, Column, Columns, Notification, Button } from 'bloomer'
import { NavLink } from 'react-router-dom'

import Register from './Register'
import api from './api'
// import styles from './App.css'

class Login extends Component {
  constructor () {
    super()
    this.state = {
      email: '',
      password: '',
      registering: false,
      errMsg: null
    }
    this.setRegister = this.setRegister.bind(this)
  }
  setRegister (e, value) {
    e.preventDefault()
    this.setState({ registering: value })
  }
  handleSubmit (e) {
    e.preventDefault()
    const { password, email } = this.state
    const { setCurrentUser } = this.props
    api.login(email, password)
      .then(userToken => setCurrentUser(userToken))
  }
  render () {
    const { email, password, errMsg } = this.state
    if (this.state.registering) {
      return (<Register setRegister={this.setRegister()} />
      )
    } else {
      return (
        <div className='loginContainer'>
          <div className='header' />
          <div className='toggleLogin'>
            <span to='/login'><strong className='toggleLogin'>login</strong></span>
            <span className='pipe'> |</span>&nbsp;
            <NavLink className='toggleLogin' to='/register' onClick={e => this.setRegistering(e, true)}>register</NavLink>
          </div>
          { errMsg &&
            <Notification isColor='warning'>
              <div>{errMsg}</div>
            </Notification>
          }
          <div className='loginField'>
            <label className='emailLabel'>email</label><br />
            <input className='emailInput' value={email} placeholder='manager@example.com' type='email' onChange={e => this.setState({ email: e.target.value })} required /><br />
            <label className='passwordLabel'>password</label><span className='forgotPassword'><a href='#'>Forgot password?</a></span><br />
            <input className='passwordInput' value={password} placeholder='Must use at least 5 characters' type='password' onChange={e => this.setState({ password: e.target.value })} required /><br />
            <div className='introMessage'>
              <h1 className='description'>
                Shift work coordination meets online <br />
                solutions customized for small business. <br />
                Login or sign up to
                <NavLink className='register' to='/register'
                  onClick={e => this.setRegistering(e, true)}
                > register</NavLink>!</h1>
            </div>
          </div>
          <NavLink to='/CalendarList'>
            <button className='loginButton' onClick={e => { this.handleSubmit(e) }}>Login</button>
          </NavLink>
        </div>
      )
    }
  }
}

export default Login
