import { useState, useRef } from 'react'
import Togglable from './Togglable'
import { useDispatch } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'

const BlogForm = () => {
  const dispatch = useDispatch()

  const toggleRef = useRef()
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = event => {
    event.preventDefault()

    dispatch(createBlog({ title, author, url }))

    toggleRef.current.toggleVisibility()
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <Togglable toggleText="create new" ref={toggleRef}>
      <h2>create new</h2>
      <form onSubmit={addBlog}>
        <div>
          <label>title:</label>
          <input
            type="text"
            value={title}
            onChange={({ target }) => setTitle(target.value)}
            placeholder="title"
          />
        </div>
        <div>
          <label>author:</label>
          <input
            type="text"
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
            placeholder="author"
          />
        </div>
        <div>
          <label>url:</label>
          <input
            type="text"
            value={url}
            onChange={({ target }) => setUrl(target.value)}
            placeholder="url"
          />
        </div>
        <button id="create-button" type="submit">
          create
        </button>
      </form>
    </Togglable>
  )
}

export default BlogForm
