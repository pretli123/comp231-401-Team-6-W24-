import { useState } from 'react'
import './App.css'
import Signup from './components/Signup';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
       <div>
      <h1>User Signup</h1>
      <Signup />
    </div>

    </>
  )
}

export default App
