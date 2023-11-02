import React from 'react'
import ReactDOM from 'react-dom/client'

import { createStore } from 'redux'
import reducer from './reducer'

const store = createStore(reducer)

const App = () => {
  const newState = (type) => {
    store.dispatch({ type })
  }

  const { good, ok, bad } = store.getState()

  return (
    <div>
      <button onClick={() => newState('GOOD')}>good</button> 
      <button onClick={() => newState('OK')}>ok</button> 
      <button onClick={() => newState('BAD')}>bad</button>
      <button onClick={() => newState('ZERO')}>reset stats</button>
      <div>good {good}</div>
      <div>ok {ok}</div>
      <div>bad {bad}</div>
    </div>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'))

const renderApp = () => {
  root.render(<App />)
}

renderApp()
store.subscribe(renderApp)
