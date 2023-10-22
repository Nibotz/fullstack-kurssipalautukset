import Blog from './Blog'
import PropTypes from 'prop-types'

const BlogList = ({ blogs, setBlogs, user }) => {
  const sortedBlogs = blogs.sort((b1, b2) => b2.likes - b1.likes)

  return (
    <div>
      {sortedBlogs.map(blog =>
        <Blog
          key={blog.id}
          blog={blog}
          user={user}
          blogs={blogs}
          setBlogs={setBlogs}
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