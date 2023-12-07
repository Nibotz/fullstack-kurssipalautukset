import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import BlogForm from './BlogForm'

const BlogList = () => {
  const sortedBlogs = useSelector(state => state.blogs)
    .slice() // copy blog array for sorting
    .sort((b1, b2) => b2.likes - b1.likes)

  return (
    <>
      <BlogForm />
      <div className="blog-container">
        {sortedBlogs.map(blog => (
          <Link key={blog.id} className="blog-button" to={`/blogs/${blog.id}`}>
            {blog.title}
          </Link>
        ))}
      </div>
    </>
  )
}

export default BlogList
