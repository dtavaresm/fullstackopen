import { useState } from 'react'

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const StatisticLine = ({ text, value }) => (
  <tbody>
    <tr>
      <td>
        {text}
      </td>
      <td>
        {value} {text === "Positive" ? '%' : ''}
      </td>
    </tr>
  </tbody>
)

const Statistics = ({ good, bad, neutral }) => {
  const total = good + neutral + bad
  const average = (good - bad) / total
  const positive = (good * 100) / total

  if (total === 0) {
    return (
      <p>
        No feedback given
      </p>
    )
  }
  return (
    <table>
      <StatisticLine text="Good" value={good} />
      <StatisticLine text="Neutral" value={neutral} />
      <StatisticLine text="Bad" value={bad} />
      <StatisticLine text="Total" value={total} />
      <StatisticLine text="Average" value={average} />
      <StatisticLine text="Positive" value={positive} />
    </table>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodClick = () => {
    const updatedGood = good + 1
    setGood(updatedGood)
  }

  const handleNeutralClick = () => {
    const updateNeutral = neutral + 1
    setNeutral(updateNeutral)
  }

  const handleBadClick = () => {
    const updatedBad = bad + 1
    setBad(updatedBad)
  }


  return (
    <div>
      <h2>Give us feedback</h2>

      <Button handleClick={handleGoodClick} text='Good' />
      <Button handleClick={handleNeutralClick} text='Neutral' />
      <Button handleClick={handleBadClick} text='Bad' />

      <h2>Statistics</h2>

      <Statistics good={good} bad={bad} neutral={neutral} />

    </div>

  )
}

export default App