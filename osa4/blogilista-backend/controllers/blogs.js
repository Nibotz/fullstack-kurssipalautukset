const blogsRouter = require('express').Router()
const { userExtractor } = require('../utils/middleware')
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({}).populate('user', { username: 1, name: 1 })

  response.json(blogs)
})

blogsRouter.post('/', userExtractor, async (request, response) => {
  const { title, author, url, likes } = request.body
  const user = request.user

  const blog = new Blog({
    title,
    author,
    url,
    likes: likes || 0,
    user: user._id
  })

  user.blogs = user.blogs.concat(blog._id)
  await user.save()

  const savedBlog = (await blog.save()).toJSON()
  savedBlog.user = user.toJSON()

  response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', userExtractor, async (request, response) => {
  const user = request.user

  if (!user.blogs.some(id => id.toString() === request.params.id)) {
    return response.status(401).json({
      error: 'blog cannot be deleted by this user'
    })
  }

  user.blogs = user.blogs.filter(id => id.toString() !== request.params.id)
  await user.save()

  await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
  const { title, author, url, user, likes } = request.body

  const updatedBlog = (await Blog.findByIdAndUpdate(
    request.params.id,
    { title, author, url, likes, user },
    { new: true }
  )).toJSON()
  updatedBlog.user = (await User.findById(updatedBlog.user)).toJSON()

  response.json(updatedBlog)
})

module.exports = blogsRouter