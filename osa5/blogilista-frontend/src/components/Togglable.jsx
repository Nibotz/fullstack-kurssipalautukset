import { useState, useImperativeHandle, forwardRef } from "react"


const Togglable = forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false)

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility
    }
  })

  if (visible) {
    return (
      <div>
        {props.children}
        <button onClick={toggleVisibility}>cancel</button>
      </div>
    )
  }
  return (
    <div>
      <button onClick={toggleVisibility}>{props.toggleText}</button>
    </div>
  )
})
Togglable.displayName = 'Togglable'

export default Togglable