import { createAnecdote } from '../reducers/anecdoteReducer'
import { addNotification, clearNotification } from '../reducers/notificationReducer'
import { useDispatch } from 'react-redux'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const create = (event) => {
    event.preventDefault()

    dispatch(createAnecdote(event.target.content.value))
    dispatch(addNotification(`you added '${event.target.content.value}'`))
    setTimeout(() => {
      dispatch(clearNotification())
    }, 5000)

    event.target.content.value = ''
  }

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={create}>
        <div>
          <input name='content' />
        </div>
        <button type='submit'>create</button>
      </form>
    </>
  )
}

export default AnecdoteForm