import { useState } from 'react'
import User from './getUser/User'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <div className='text-3xl font-bold underline'>
    <User />
   
    </div>
       
    </>
  )
}

export default App
