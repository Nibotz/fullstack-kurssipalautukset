import { useState } from 'react'
import blogService from '../services/blogs'

const BlogForm = ({ addNotification, noteFormRef, blogs, setBlogs }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleCreating = (event) => {
    event.preventDefault()

    const newBlog = {
      title, author, url
    }

    blogService.create(newBlog)
      .then(createdBlog => {
        noteFormRef.current.toggleVisibility()
      
        setBlogs(blogs.concat(createdBlog))
        setTitle('')
        setAuthor('')
        setUrl('')

        addNotification(`a new blog ${createdBlog.title} by ${createdBlog.author} added`, 5000)
      })
      .catch(error => {
        addNotification(`error: ${error.response.data.error}`, 5000, 'error')
      })
  }

  return (
    <form onSubmit={handleCreating}>
      <div>
        title:
        <input
          type='text'
          value={title}
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>
      <div>
        author:
        <input
          type='text'
          value={author}
          onChange={({ target }) => setAuthor(target.value)}
        />
      </div>
      <div>
        url:
        <input
          type='text'
          value={url}
          onChange={({ target }) => setUrl(target.value)}
        />
      </div>
      <button type='submit'>create</button>
    </form>
  )
}

export default BlogForm