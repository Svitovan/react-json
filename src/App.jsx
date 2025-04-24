import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Table from './Table.jsx'



function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     
      
      <div className="card">
        <Table />
      </div>

      
    </>
  )
}

export default App
