import { useSelector, useDispatch } from 'react-redux'
import { useParams, useNavigate } from 'react-router-dom'
import {
  addBlogLike,
  addBlogComment,
  removeBlog
} from '../reducers/blogReducer'
import CommentForm from './CommentForm'

const BlogPage = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const id = useParams().id
  const blog = useSelector(state => state.blogs).find(blog => blog.id === id)
  const user = useSelector(state => state.user)

  const tryRemoveBlog = () => {
    if (confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      dispatch(removeBlog(blog))
      navigate('/')
    }
  }

  if (!blog) {
    return null
  }
  return (
    <div>
      <div className="blog-info">
        <h2>{blog.title}</h2>
        <p>
          <a href={blog.url}>{blog.url}</a>
        </p>
        <p>
          {blog.likes} likes
          <button onClick={() => dispatch(addBlogLike(blog))}>like</button>
        </p>
        <p>added by {blog.user.name}</p>
        {user.name === blog.user.name && (
          <button onClick={tryRemoveBlog}>delete</button>
        )}
      </div>
      <div className="comments">
        <h2>comments</h2>
        <CommentForm
          addComment={comment => dispatch(addBlogComment(blog, comment))}
        />
        <ul>
          {blog.comments.map(comment => (
            <li key={comment}>{comment}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default BlogPage
