import { useState, useEffect, useRef } from 'react'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import BlogList from './components/BlogList'
import blogService from './services/blogs'


const App = () => {
  const [notification, setNotification] = useState(null)
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const noteFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  useEffect(() => {
    const userData = window.localStorage.getItem('loggedBlogappUser')
    if (userData) {
      const user = JSON.parse(userData)
      blogService.setToken(user.token)
      setUser(user)
    }
  }, [])

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

  const addNotification = (message, time, type='notification') => {
    setNotification(<div className={type}>{message}</div>)
    setTimeout(() => {
      setNotification(null)
    }, time)
  }

  return (
    <>
      {notification}
      {!user &&
      <LoginForm
        addNotification={addNotification}
        setUser={setUser}
      />
      }
      {user &&
      <div>
        <h2>blogs</h2>
        <p>{user.name} logged in<button onClick={handleLogout}>logout</button></p>
        <Togglable toggleText='new note' ref={noteFormRef}>
          <h2>create new</h2>
          <BlogForm
            addNotification={addNotification}
            noteFormRef={noteFormRef}
            blogs={blogs} setBlogs={setBlogs}
          />
        </Togglable>
        <BlogList blogs={blogs} setBlogs={setBlogs} user={user} />
      </div>
      }
    </>
  )
}

export default App