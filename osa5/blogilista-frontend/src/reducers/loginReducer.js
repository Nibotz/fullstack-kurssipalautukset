import { createSlice } from '@reduxjs/toolkit'
import { addNotification } from './notificationReducer'
import blogService from '../services/blogs'
import loginService from '../services/login'

const loginSlice = createSlice({
  name: 'login',
  initialState: null,
  reducers: {
    setUser(state, action) {
      return action.payload
    },
    clearUser() {
      return null
    }
  }
})

export const { setUser, clearUser } = loginSlice.actions

export const initialLogin = () => {
  return dispatch => {
    const userData = window.localStorage.getItem('loggedBlogappUser')
    if (userData) {
      const user = JSON.parse(userData)
      blogService.setToken(user.token)
      dispatch(setUser(user))
    }
  }
}

export const userLogin = (username, password) => {
  return async dispatch => {
    try {
      const user = await loginService.login({ username, password })

      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      dispatch(setUser(user))
    } catch (error) {
      dispatch(
        addNotification(`error: ${error.response.data.error}`, 5, 'error')
      )
    }
  }
}

export const userLogout = () => {
  return dispatch => {
    window.localStorage.removeItem('loggedBlogappUser')
    dispatch(clearUser())
  }
}

export default loginSlice.reducer