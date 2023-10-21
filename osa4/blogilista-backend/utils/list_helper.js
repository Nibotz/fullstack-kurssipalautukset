
const dummy = (blogs) => {
  blogs
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => {
    return sum + blog.likes
  }, 0)
}

const favoriteBlog = (blogs) => {
  return blogs.reduce((favorite, blog) => {
    return blog.likes > favorite.likes ? blog : favorite
  }, blogs[0])
}

const mostBlogs = (blogs) => {
  const blogCounter = Object()
  blogs.forEach(blog => {
    blogCounter[blog.author] = (blogCounter[blog.author] || 0) + 1
  })

  const bestBlogger = Object.entries(blogCounter)
    .reduce((bestBlogger, blogger) => {
      return blogger[1] > bestBlogger[1] ? blogger : bestBlogger
    }, ['', -1])

  return { author: bestBlogger[0], blogs: bestBlogger[1] }
}

const mostLikes = (blogs) => {
  const likeCounter = Object()
  blogs.forEach(blog => {
    likeCounter[blog.author] = (likeCounter[blog.author] || 0) + blog.likes
  })

  const bestBlogger = Object.entries(likeCounter)
    .reduce((bestBlogger, blogger) => {
      return blogger[1] > bestBlogger[1] ? blogger : bestBlogger
    }, ['', -1])

  return { author: bestBlogger[0], likes: bestBlogger[1] }
}


module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
}