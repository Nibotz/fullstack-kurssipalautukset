
const validToken = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImhlbGxhcyIsImlkIjoiNjUzMTc4MGRlMTI4Y2E0NjcyODEyNDg0IiwiaWF0IjoxNjk3ODkyNzcxfQ.yMqaQZfCKcanCBT1p_75lmPWZDgRxYL2iNQUuasF-YI'

const initialUsers = [
  {
    username: 'hellas',
    name: 'Arto Hellas',
    password: '$2b$10$c1M20kMd7AzctBz0xJ1YUOAmQ4gE62icDU7wZmg40dcB6WYGJ/qRS', // = abc123
    blogs: [
      '65317bcbba28b4dda401210e',
      '65317bcbba28b4dda4012113',
      '65317bccba28b4dda4012118',
    ],
    _id: '6531780de128ca4672812484'
  },
  {
    username: 'mluukkai',
    name: 'Matti Luukkainen',
    password: '$2b$10$R2oR4xKcZLRV7kSbS12ghO40wR.nxleCLWqUM5Ec9/lhaidQH0iCK', // = todella_hyvä_salasana,
    blogs: [
      '65317bccba28b4dda401211d',
      '65317bccba28b4dda4012122',
      '65317bccba28b4dda4012127',
    ],
    _id: '6531780de128ca4672812488'
  }
]

const initialBlogs = [
  {
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    user: '6531780de128ca4672812484',
    _id: '65317bcbba28b4dda401210e'
  },
  {
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    user: '6531780de128ca4672812484',
    _id: '65317bcbba28b4dda4012113'
  },
  {
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
    user: '6531780de128ca4672812484',
    _id: '65317bccba28b4dda4012118'
  },
  {
    title: 'First class tests',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 10,
    user: '6531780de128ca4672812488',
    _id: '65317bccba28b4dda401211d'
  },
  {
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 0,
    user: '6531780de128ca4672812488',
    _id: '65317bccba28b4dda4012122'
  },
  {
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2,
    user: '6531780de128ca4672812488',
    _id: '65317bccba28b4dda4012127'
  }
]

module.exports = {
  initialBlogs,
  initialUsers,
  validToken
}