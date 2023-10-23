import { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, addLike, removeBlog }) => {
  const [visible, setVisible] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div style={blogStyle}>
      <div>
        {blog.title} {blog.author}
        <button onClick={() => setVisible(!visible)}>{visible ? 'hide' : 'view'}</button>
      </div>
      <div style={{ display: visible ? '' : 'none' }}>
        <a href={blog.url}>{blog.url}</a>
        <div>
          likes: {blog.likes}
          <button onClick={addLike}>like</button>
        </div>
        <div>{blog.user.name}</div>
        {removeBlog &&
          <button onClick={removeBlog}>remove</button>
        }
      </div>
    </div>
  )
}
Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  addLike: PropTypes.func.isRequired,
  removeBlog: PropTypes.any
}

export default Blog