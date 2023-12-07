import { useState, useRef } from 'react'
import Togglable from './Togglable'

const CommentForm = ({ addComment }) => {
  const toggleRef = useRef()
  const [comment, setComment] = useState('')

  const newComment = event => {
    event.preventDefault()

    addComment(comment)

    toggleRef.current.toggleVisibility()
    setComment('')
  }

  return (
    <Togglable toggleText="add comment" ref={toggleRef}>
      <form onSubmit={newComment}>
        <div>
          comment:
          <input
            type="text"
            value={comment}
            onChange={({ target }) => setComment(target.value)}
          />
        </div>
        <button id="create-button" type="submit">
          add
        </button>
      </form>
    </Togglable>
  )
}

export default CommentForm
