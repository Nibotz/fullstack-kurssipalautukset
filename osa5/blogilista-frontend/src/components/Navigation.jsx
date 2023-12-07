import { useDispatch, useSelector } from 'react-redux'
import { userLogout } from '../reducers/loginReducer'
import { Link } from 'react-router-dom'

const Navigation = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)

  const navigationStyle = {
    background: 'lightgrey',
    padding: '2px'
  }

  return (
    <>
      <div style={navigationStyle}>
        <Link to={'/blogs'}>blogs</Link>
        <Link to={'/users'}>users</Link>
        <span>{user.name} logged in</span>
        <button onClick={() => dispatch(userLogout())}>logout</button>
      </div>
      <h2>blog app</h2>
    </>
  )
}

export default Navigation
