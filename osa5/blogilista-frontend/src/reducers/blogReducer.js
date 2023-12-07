import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'
import { addNotification } from './notificationReducer'

const blogSlice = createSlice({
  name: 'blog',
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      return action.payload
    },
    updateBlog(state, action) {
      const newBlog = action.payload
      return state.map(blog => blog.id === newBlog.id ? newBlog : blog)
    },
    appendBlog(state, action) {
      const blog = action.payload
      return state.concat(blog)
    },
    deleteBlog(state, action) {
      const blogToDelete = action.payload
      return state.filter(blog => blog.id !== blogToDelete.id)
    }
  }
})

export const { setBlogs, appendBlog, deleteBlog, updateBlog } = blogSlice.actions

export const initialBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const createBlog = (blog) => {
  return async dispatch => {
    try {
      const createdBlog = await blogService.create(blog)

      dispatch(appendBlog(createdBlog))

      dispatch(
        addNotification(
          `a new blog ${createdBlog.title} by ${createdBlog.author} added`,
          5
        )
      )
    } catch (error) {
      dispatch(addNotification(`error: ${error.response.data.error}`, 5, 'error'))
    }
  }
}

export const removeBlog = (blog) => {
  return async dispatch => {
    try {
      await blogService.remove(blog.id)

      dispatch(deleteBlog(blog))
    } catch (error) {
      console.error(error)
    }
  }
}

export const addBlogLike = blog => {
  return async dispatch => {
    try {
      const { author, title, url, likes, user } = blog
      const newBlog = {
        author,
        title,
        url,
        user: user.id,
        likes: likes + 1
      }

      const updatedBlog = await blogService.update(blog.id, newBlog)

      dispatch(updateBlog(updatedBlog))
    } catch (error) {
      console.error(error)
    }
  }
}

export const addBlogComment = (blog, comment) => {
  return async dispatch => {
    try {
      const updatedBlog = await blogService.addComment(blog.id, comment)

      dispatch(updateBlog(updatedBlog))
    } catch (error) {
      console.error(error)
    }
  }
}

export default blogSlice.reducer