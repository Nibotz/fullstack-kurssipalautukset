import { useState } from 'react'


const Button = ({ callback, text }) => (
  <button onClick={callback}>
    {text}
  </button>
)

const StatisticLine = ({ text, value }) => <tr><td>{text}</td><td>{value}</td></tr>


const Statistics = ({ good, neutral, bad }) => {
  const all = good + neutral + bad
  if (all > 0) {
    return (
      <table>
        <tbody>
          <StatisticLine text="good" value={good} />
          <StatisticLine text="neutral" value={neutral} />
          <StatisticLine text="bad" value={bad} />
          <StatisticLine text="all" value={all} />
          <StatisticLine text="avarage" value={(good - bad) / all} />
          <StatisticLine text="positive" value={(good / all * 100).toString().concat(" %")} />
        </tbody>
      </table>
    )
  }
  return (
    <div>
      No feedback given
    </div>
  )
}


const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>give feedback</h1>
      <Button callback={() => setGood(good+1)} text="good" />
      <Button callback={() => setNeutral(neutral+1)} text="neutral" />
      <Button callback={() => setBad(bad+1)} text="bad" />
      <h1>statistic</h1>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App