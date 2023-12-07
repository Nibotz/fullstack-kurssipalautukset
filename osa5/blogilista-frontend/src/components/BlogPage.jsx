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
      <h2>{blog.title}</h2>
      <a href={blog.url}>{blog.url}</a>
      <div>
        {blog.likes} likes
        <button onClick={() => dispatch(addBlogLike(blog))}>like</button>
      </div>
      <div>added by {blog.user.name}</div>
      {user.name === blog.user.name ? (
        <button onClick={tryRemoveBlog}>delete</button>
      ) : null}
      <h3>comments</h3>
      <CommentForm
        addComment={comment => dispatch(addBlogComment(blog, comment))}
      />
      <ul>
        {blog.comments.map(comment => (
          <li key={comment}>{comment}</li>
        ))}
      </ul>
    </div>
  )
}

export default BlogPage
