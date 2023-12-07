import { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import LoginForm from './components/LoginForm'
import BlogList from './components/BlogList'
import UserList from './components/UserList'
import UserPage from './components/UserPage'
import BlogPage from './components/BlogPage'
import Navigation from './components/Navigation'
import { useDispatch, useSelector } from 'react-redux'
import { initialBlogs } from './reducers/blogReducer'
import { initialUsers } from './reducers/userReducer'
import { initialLogin } from './reducers/loginReducer'

const App = () => {
  const dispatch = useDispatch()
  const notification = useSelector(state => state.notification)
  const user = useSelector(state => state.user)

  useEffect(() => {
    dispatch(initialBlogs())
    dispatch(initialUsers())
    dispatch(initialLogin())
  }, [])

  return (
    <Router>
      {notification && (
        <div className={notification.type}>{notification.message}</div>
      )}

      {!user && <LoginForm />}

      {user && <Navigation />}

      <Routes>
        <Route path="/" element={user && <BlogList />} />

        <Route path="/blogs" element={user && <BlogList />} />
        <Route path="/blogs/:id" element={user && <BlogPage />} />

        <Route path="/users" element={user && <UserList />} />
        <Route path="/users/:id" element={user && <UserPage />} />
      </Routes>
    </Router>
  )
}

export default App
