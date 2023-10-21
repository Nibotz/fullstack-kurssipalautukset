import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginServices from './services/login'

const Login = ({ handleLogin, username, setUsername, password, setPassword }) => {
  return (
    <div>
      <h2>Log in to application</h2>
      <form onSubmit={handleLogin}>
        <div>
          username
          <input 
            type='text'
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input 
            type='password'
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type='submit'>login</button>
      </form>
    </div>
  )
}

const BlogForm = ({ handleCreating, title, setTitle, author, setAuthor, url, setUrl }) => {
  return (
    <form onSubmit={handleCreating}>
      <div>
        title:
        <input
          type='text'
          value={title}
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>
      <div>
        author:
        <input
          type='text'
          value={author}
          onChange={({ target }) => setAuthor(target.value)}
        />
      </div>
      <div>
        url:
        <input
          type='text'
          value={url}
          onChange={({ target }) => setUrl(target.value)}
        />
      </div>
      <button type='submit'>create</button>
    </form>
  )
}

const BlogList = ({ user, handleLogout, blogs, handleCreating, title, setTitle, author, setAuthor, url, setUrl }) => {
  return (
    <div>
      <h2>blogs</h2>
      <p>{user.name} logged in<button onClick={handleLogout}>logout</button></p> 
      <h2>create new</h2>
      <BlogForm 
        handleCreating={handleCreating} 
        title={title} setTitle={setTitle} 
        author={author} setAuthor={setAuthor} 
        url={url} setUrl={setUrl}
      />
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}


const App = () => {
  const [notification, setNotification] = useState(null)
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [blogTitle, setBlogTitle] = useState('')
  const [blogAuthor, setBlogAuthor] = useState('')
  const [blogUrl, setBlogUrl] = useState('')

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

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginServices.login({ username, password })
      
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)

      setUser(user)
      setUsername('')
      setPassword('')
    } catch(e) {
      addNotification(`error: ${e.response.data.error}`, 5000, 'error')
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

  const handleCreating = async (event) => {
    event.preventDefault()

    try {
      const newBlog = {
        title: blogTitle,
        author: blogAuthor,
        url: blogUrl
      }

      const createdBlog = await blogService.create(newBlog)
      
      setBlogs(blogs.concat(createdBlog))
      setBlogTitle('')
      setBlogAuthor('')
      setBlogUrl('')

      addNotification(`a new blog ${createdBlog.title} by ${createdBlog.author} added`, 5000)
    } catch(e) {
      addNotification(`error: ${e.response.data.error}`, 5000, 'error')
    }
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
      <Login
        handleLogin={handleLogin}
        username={username} setUsername={setUsername}
        password={password} setPassword={setPassword}
      />
      }
      {user && 
      <BlogList 
        user={user} handleLogout={handleLogout} blogs={blogs}
        handleCreating={handleCreating}
        title={blogTitle} setTitle={setBlogTitle}
        author={blogAuthor} setAuthor={setBlogAuthor}
        url={blogUrl} setUrl={setBlogUrl}
      />
      }
    </>
  )
}

export default App