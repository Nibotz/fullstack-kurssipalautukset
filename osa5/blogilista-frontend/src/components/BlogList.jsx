import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import BlogForm from './BlogForm'

const BlogList = () => {
  const sortedBlogs = useSelector(state => state.blogs)
    .slice() // copy blog array for sorting
    .sort((b1, b2) => b2.likes - b1.likes)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <>
      <BlogForm />
      <div>
        {sortedBlogs.map(blog => (
          <div key={blog.id} className="blog" style={blogStyle}>
            <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
          </div>
        ))}
      </div>
    </>
  )
}

export default BlogList
