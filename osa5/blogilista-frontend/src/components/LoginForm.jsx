import { useState } from 'react'
import PropTypes from 'prop-types'
import blogService from '../services/blogs'
import loginService from '../services/login'

const LoginForm = ({ addNotification, setUser }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = (event) => {
    event.preventDefault()

    loginService.login({ username, password })
      .then(user => {
        window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
        blogService.setToken(user.token)

        setUser(user)
        setUsername('')
        setPassword('')
      })
      .catch(error => {
        addNotification(`error: ${error.response.data.error}`, 5000, 'error')
      })
  }

  return (
    <div>
      <h2>Log in to application</h2>
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            id='username'
            type='text'
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            id='password'
            type='password'
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button id='login-button' type='submit'>login</button>
      </form>
    </div>
  )
}
LoginForm.propTypes = {
  addNotification: PropTypes.func.isRequired,
  setUser: PropTypes.func.isRequired,
}

export default LoginForm