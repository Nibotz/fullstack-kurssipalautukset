const supertest = require('supertest')
const mongoose = require('mongoose')
const helper = require('./blog_api_helper')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')

describe('blog queries', () => {
  beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(helper.initialBlogs)
  })

  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('blogs are defined using id', async () => {
    const response = await api.get('/api/blogs')
    const contents = response.body.map(blog => blog.id)

    expect(contents[0]).toBeDefined()
  })

  describe('making blogs', () => {
    test('blog is added to the database correctly', async () => {
      const newBlog = {
        title: 'test blog',
        author: 'Pena',
        url: 'https://test.com/',
        likes: 2,
      }

      await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

      const response = await api.get('/api/blogs')
      expect(response.body).toHaveLength(helper.initialBlogs.length + 1)

      const contents = response.body.map(blog => blog.title)
      expect(contents).toContain('test blog')
    })

    test('blog with no likes will have zero likes', async () => {
      const newBlog = {
        title: 'blog without likes',
        author: 'Pena',
        url: 'https://test.com/',
      }

      const response = await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)

      expect(response.body.likes).toBe(0)
    })

    test('blogs without title are bad', async () => {
      const badBlog = {
        author: 'Pena',
        url: 'https://test.com/',
        likes: 1,
      }

      await api
        .post('/api/blogs')
        .send(badBlog)
        .expect(400)
    })

    test('blogs without url are bad', async () => {
      const badBlog = {
        title: 'blog without url',
        author: 'Pena',
        likes: 1,
      }

      await api
        .post('/api/blogs')
        .send(badBlog)
        .expect(400)
    })
  })

  describe('updating blogs', () => {
    test('blog likes are updated correctly', async () => {
      const blogsAtStart = await Blog.find({})
      const blogToUpdate = blogsAtStart[0]

      await api
        .put(`/api/blogs/${blogToUpdate.id}`)
        .send({ likes: 100 })
        .expect(200)

      const blogsAtEnd = await Blog.find({})
      expect(blogsAtEnd).toHaveLength(blogsAtStart.length)

      const blogsLikes = blogsAtEnd.map(blog => [blog.id, blog.likes])
      expect(blogsLikes).toContainEqual([blogToUpdate.id, 100])
    })
  })

  describe('deleting blogs', () => {
    test('blogs are deleted correctly', async () => {
      const blogsAtStart = await Blog.find({})
      const blogToDelete = blogsAtStart[0]

      await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .expect(204)

      const blogsAtEnd = await Blog.find({})
      expect(blogsAtEnd).toHaveLength(blogsAtStart.length - 1)

      const blogIds = blogsAtEnd.map(blog => blog.id)
      expect(blogIds).not.toContain(blogToDelete.id)
    })
  })
})

afterAll(async () => {
  mongoose.connection.close()
})