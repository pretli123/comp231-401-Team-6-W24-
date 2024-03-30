import { useState } from 'react'
import './App.css'
import Signup from './components/Signup';
import banner from './assets/banner.jpg';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className="top">
        <div id="logo">
          <img src={banner} alt="blue banner" />
        </div>
      </div>

       <div>
      <h1>Loop</h1>
      <Signup />
    </div>

    </>
  )
}

export default App
