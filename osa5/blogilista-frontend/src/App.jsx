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

  const addNotification = (message, time, type='notification') => {
    setNotification(<div className={type}>{message}</div>)
    setTimeout(() => {
      setNotification(null)
    }, time)
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

  const createBlog = (newBlog) => {
    blogService.create(newBlog)
      .then(createdBlog => {
        noteFormRef.current.toggleVisibility()

        setBlogs(blogs.concat(createdBlog))

        addNotification(`a new blog ${createdBlog.title} by ${createdBlog.author} added`, 5000)
      })
      .catch(error => {
        addNotification(`error: ${error.response.data.error}`, 5000, 'error')
      })
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
          <BlogForm createBlog={createBlog} />
        </Togglable>

        <BlogList blogs={blogs} setBlogs={setBlogs} user={user} />
      </div>
      }
    </>
  )
}

export default App