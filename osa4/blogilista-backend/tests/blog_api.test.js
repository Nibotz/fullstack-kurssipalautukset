const supertest = require('supertest')
const mongoose = require('mongoose')
const helper = require('./blog_api_helper')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')
const User = require('../models/user')

describe('blog queries', () => {
  beforeAll(async () => {
    await User.deleteMany({})
    await User.insertMany(helper.initialUsers)

    /*
    get new valid token:
    const response = await api
      .post('/api/login')
      .send({ username: 'hellas', password: 'abc123' })
    console.log(response.body.token)
    */
  })

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
        .set({ Authorization: helper.validToken })
        .expect(201)
        .expect('Content-Type', /application\/json/)

      const response = await api.get('/api/blogs')
      expect(response.body).toHaveLength(helper.initialBlogs.length + 1)

      const contents = response.body.map(blog => blog.title)
      expect(contents).toContain('test blog')
    })

    test('blogs without title or url are bad', async () => {
      const badBlogs = [
        {
          author: 'Pena',
          url: 'https://test.com/',
        },
        {
          author: 'Pena',
          title: 'blog without url',
        }
      ]

      for (const badBlog of badBlogs) {
        await api
          .post('/api/blogs')
          .send(badBlog)
          .set({ Authorization: helper.validToken })
          .expect(400)

        const response = await Blog.find({})
        expect(response).toHaveLength(helper.initialBlogs.length)
      }
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
        .set({ Authorization: helper.validToken })
        .expect(201)

      expect(response.body.likes).toBe(0)
    })

    test('status 401 when making blog without token', async () => {
      const newBlog = {
        title: 'test blog',
        author: 'Pena',
        url: 'https://test.com/',
        likes: 2,
      }

      await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(401)
    })
  })

  describe('updating blogs', () => {
    test('blog likes are updated correctly', async () => {
      const blogToUpdateId = helper.initialBlogs[0]._id

      await api
        .put(`/api/blogs/${blogToUpdateId}`)
        .send({ likes: 100 })
        .set({ Authorization: helper.validToken })
        .expect(200)

      const blogsAtEnd = await Blog.find({})
      expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)

      const blogsLikes = blogsAtEnd.map(blog => [blog.id, blog.likes])
      expect(blogsLikes).toContainEqual([blogToUpdateId, 100])
    })
  })

  describe('deleting blogs', () => {
    test('blogs are deleted correctly', async () => {
      const blogToDeleteId = helper.initialBlogs[0]._id

      await api
        .delete(`/api/blogs/${blogToDeleteId}`)
        .set({ Authorization: helper.validToken })
        .expect(204)

      const blogsAtEnd = await Blog.find({})
      expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1)

      const blogIds = blogsAtEnd.map(blog => blog.id)
      expect(blogIds).not.toContain(blogToDeleteId)
    })
  })
})

describe('user queries', () => {
  beforeEach(async () => {
    await User.deleteMany({})
    await User.insertMany(helper.initialUsers)
  })

  test('users are returned correctly', async () => {
    const response = await api
      .get('/api/users')
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(response.body).toHaveLength(helper.initialUsers.length)
  })

  describe('adding users', () => {
    test('user added correctly', async () => {
      const newUser = {
        username: 'Nipa',
        name: 'Niilo Mikkola',
        password: 'joku_salasana'
      }

      await api
        .post('/api/users')
        .send(newUser)
        .expect(201)
        .expect('Content-Type', /application\/json/)

      const response = await api.get('/api/users')
      expect(response.body).toHaveLength(helper.initialUsers.length + 1)

      const contents = response.body.map(u => u.username)
      expect(contents).toContain('Nipa')
    })

    test('status 400 when adding user with bad information', async () => {
      const badUsers = [
        {},
        {
          name: 'No Username',
          password: 'password123'
        },
        {
          username: 'No Password'
        },
        {
          username: 'Bad Password',
          password: 'no'
        },
      ]

      for (const badUser of badUsers) {
        await api
          .post('/api/users')
          .send(badUser)
          .expect(400)

        const response = await User.find({})
        expect(response).toHaveLength(helper.initialUsers.length)
      }
    })
  })
})

afterAll(async () => {
  mongoose.connection.close()
})