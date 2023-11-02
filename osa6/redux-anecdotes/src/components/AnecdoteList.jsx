import { addVote } from "../reducers/anecdoteReducer"
import { addNotification, clearNotification } from '../reducers/notificationReducer'
import { useDispatch, useSelector } from "react-redux"

const AnecdoteList = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(({ filter, anecdotes }) => {
    if (filter === '') {
      return anecdotes
    }
    const filterText = filter.toLowerCase()
    return anecdotes.filter(a => a.content.toLowerCase().includes(filterText))
  })

  const vote = (anecdote) => {
    dispatch(addVote(anecdote.id))
    dispatch(addNotification(`you voted '${anecdote.content}'`))
    setTimeout(() => {
      dispatch(clearNotification())
    }, 5000)
  }

  return (
    <div>
      {[...anecdotes].sort((a,b) => b.votes - a.votes).map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AnecdoteList