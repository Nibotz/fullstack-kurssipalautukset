const listHelper = require('../utils/list_helper')
const blogs = require('./blog_api_helper').initialBlogs

test('dummy returns one', () => {
  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})


describe('total likes', () => {
  test('of empty list is zero', () => {
    expect(listHelper.totalLikes([])).toBe(0)
  })

  test('when list has only one blog equals the likes of that', () => {
    expect(listHelper.totalLikes([blogs[1]])).toBe(5)
  })

  test('of a bigger list is calculated rigth', () => {
    expect(listHelper.totalLikes(blogs)).toBe(36)
  })
})

describe('favorite blog', () => {
  test('of one blog', () => {
    expect(listHelper.favoriteBlog([blogs[0]])).toEqual(blogs[0])
  })

  test('of one blog with zero likes', () => {
    expect(listHelper.favoriteBlog([blogs[4]])).toEqual(blogs[4])
  })

  test('of many blogs', () => {
    expect(listHelper.favoriteBlog(blogs)).toEqual(blogs[2])
  })
})

describe('most blogs', () => {
  test('of one blog', () => {
    expect(listHelper.mostBlogs([blogs[0]])).toEqual({ author: 'Michael Chan', blogs: 1 })
  })

  test('of many blogs', () => {
    expect(listHelper.mostBlogs(blogs)).toEqual({ author: 'Robert C. Martin', blogs: 3 })
  })
})

describe('most likes', () => {
  test('of one blog', () => {
    expect(listHelper.mostLikes([blogs[0]])).toEqual({ author: 'Michael Chan', likes: 7 })
  })

  test('of one blog with zero likes', () => {
    expect(listHelper.mostLikes([blogs[4]])).toEqual({ author: 'Robert C. Martin', likes: 0 })
  })

  test('of many blogs', () => {
    expect(listHelper.mostLikes(blogs)).toEqual({ author: 'Edsger W. Dijkstra', likes: 17 })
  })
})
