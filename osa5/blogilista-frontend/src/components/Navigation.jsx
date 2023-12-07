import { useDispatch, useSelector } from 'react-redux'
import { userLogout } from '../reducers/loginReducer'
import { Link } from 'react-router-dom'

const Navigation = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)

  return (
    <>
      <div className="navigation">
        <Link to={'/blogs'}>blogs</Link>
        <Link to={'/users'}>users</Link>
        <span>{user.name} logged in</span>
        <Link onClick={() => dispatch(userLogout())}>logout</Link>
      </div>
      <h1>blog app</h1>
    </>
  )
}

export default Navigation
