import { useState } from 'react'
import PropTypes from 'prop-types'
import blogService from '../services/blogs'

const Blog = ({ blog, user, blogs, setBlogs }) => {
  const [visible, setVisible] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const addLike = () => {
    const { author, title, url, likes, user } = blog

    const newBlog = {
      author, title, url, user: user.id, likes: likes+1
    }

    blogService
      .update(blog.id, newBlog)
      .then(updatedBlog => {
        setBlogs(blogs.map(b => b.id === updatedBlog.id ? updatedBlog : b))
      })
      .catch(error => {
        console.error(error)
      })
  }

  const removeBlog = () => {
    if (confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      blogService
        .remove(blog.id)
        .then(() => {
          setBlogs(blogs.filter(b => b.id !== blog.id))
        })
        .catch(error => {
          console.error(error)
        })
    }
  }

  return (
    <div style={blogStyle}>
      {blog.title} {blog.author}
      <button onClick={() => setVisible(!visible)}>{visible ? 'hide' : 'view'}</button>
      <div style={{ display: visible ? '' : 'none' }}>
        <a>{blog.url}</a>
        <div>
          {blog.likes}
          <button onClick={addLike}>like</button>
        </div>
        <div>{blog.user.name}</div>
        {blog.user.username === user.username &&
          <button onClick={removeBlog}>remove</button>
        }
      </div>
    </div>
  )
}
Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  blogs: PropTypes.array.isRequired,
  setBlogs: PropTypes.func.isRequired
}

export default Blog