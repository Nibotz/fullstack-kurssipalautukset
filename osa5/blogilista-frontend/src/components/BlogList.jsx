import PropTypes from 'prop-types'
import blogService from '../services/blogs'
import Blog from './Blog'

const BlogList = ({ blogs, setBlogs, user }) => {
  const sortedBlogs = blogs.sort((b1, b2) => b2.likes - b1.likes)

  const addLike = (blog) => {
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

  const removeBlog = (blog) => {
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
    <div>
      {sortedBlogs.map(blog =>
        <Blog
          key={blog.id}
          blog={blog}
          addLike={() => addLike(blog)}
          removeBlog={blog.user.username === user.username ? () => removeBlog(blog) : null}
        />
      )}
    </div>
  )
}
BlogList.propTypes = {
  blogs: PropTypes.array.isRequired,
  setBlogs: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
}

export default BlogList