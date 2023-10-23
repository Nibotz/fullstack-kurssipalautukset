import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

test('<BlogFrom /> unit tests', async () => {
  const user = userEvent.setup()
  const createBlog = jest.fn()

  render(
    <BlogForm createBlog={createBlog} />
  )

  const title = screen.getByPlaceholderText('title')
  const author = screen.getByPlaceholderText('author')
  const url = screen.getByPlaceholderText('url')
  const createButton = screen.getByText('create')

  await user.type(title, 'title...')
  await user.type(author, 'author...')
  await user.type(url, 'url...')
  await user.click(createButton)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0]).toEqual({ title: 'title...', author: 'author...', url: 'url...' })
})

