const usersRouter = require('express').Router()
const bcrypt = require('bcryptjs')
const User = require('../models/user')

usersRouter.post('/', async (request, response) => {
  const { username, name, password } = request.body

  if (!(password !== undefined && password.length >= 3)) {
    return response.status(400).json({ error: 'invalid password' })
  }

  const passwordHash = await bcrypt.hash(password, 10)

  const user = User({
    username,
    name,
    password: passwordHash
  })

  const savedUser = await user.save()

  response.status(201).json(savedUser)
})

usersRouter.get('/', async (request, response) => {
  const users = await User
    .find({}).populate('blogs', { title: 1, author: 1, url: 1 })

  response.status(200).json(users)
})

module.exports = usersRouter