import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

test('<Blog /> unit tests', async () => {
  const blog = {
    author: 'tester',
    title: 'test blog',
    url: 'http://test.com',
    likes: 0,
    user: {
      username: 'test_user',
      name: 'Test User'
    }
  }

  const user = userEvent.setup()
  const addLike = jest.fn()

  render(
    <Blog blog={blog} addLike={addLike} />
  )

  screen.getByText('test blog tester')

  const viewButton = screen.getByText('view')
  await user.click(viewButton)

  screen.getByText('test blog tester')
  screen.getByText('http://test.com')
  screen.getByText('likes: 0')
  screen.getByText('Test User')

  const likeButton = screen.getByText('like')
  await user.click(likeButton)
  await user.click(likeButton)

  expect(addLike.mock.calls).toHaveLength(2)
})

