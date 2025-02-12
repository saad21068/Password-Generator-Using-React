import { useState, useCallback, useEffect, useRef } from 'react'

function App() {
  const [length, setLength] = useState(8)
  const [numberAllowed, setNumberAllowed] = useState(false)
  const [symbolAllowed, setSymbolAllowed] = useState(false)
  const [password, setPassword] = useState('')

  const passRef = useRef(null)

  const copyPasswordOnClick = useCallback(() => {
    passRef.current?.select()
    window.navigator.clipboard.writeText(password)
  }, [password])

  const passwordGenerator = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if (numberAllowed) {
      str += "012345678901234567890123456789"
    }
    if (symbolAllowed) {
      str += "!@#$%^&*!@#$%^&*"
    }
    for (let i = 0; i <=length; i++) {
      pass += str.charAt(Math.floor(Math.random() * str.length+1))
    }
    setPassword(pass)
  }, [length, numberAllowed, symbolAllowed,setPassword])

  useEffect(() => {
    passwordGenerator()
  }, [length, numberAllowed, symbolAllowed, passwordGenerator])

  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-4'>
      <div className='w-full max-w-md bg-gray-800 shadow-lg rounded-lg p-6'>
        <h1 className='text-3xl font-bold text-center text-orange-500 mb-4'>Password Generator</h1>
        
        <div className='flex items-center bg-gray-700 p-2 rounded-lg mb-4'>
          <input
            type='text'
            value={password}
            readOnly
            ref={passRef}
            className='w-full bg-transparent text-white text-lg outline-none px-3 py-2'
          />
          <button 
            onClick={copyPasswordOnClick} 
            className='bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg transition duration-200'
          >
            Copy
          </button>
        </div>

        <div className='flex flex-col gap-3'>
          <div className='flex items-center justify-between'>
            <label className='text-lg'>Length: {length}</label>
            <input
              type='range'
              min={6}
              max={50}
              value={length}
              onChange={(e) => setLength(Number(e.target.value))}
              className='cursor-pointer w-full ml-4'
            />
          </div>
          
          <div className='flex items-center justify-between'>
            <label className='text-lg'>Include Numbers</label>
            <input
              type='checkbox'
              checked={numberAllowed}
              onChange={() => setNumberAllowed(prev => !prev)}
              className='cursor-pointer w-5 h-5'
            />
          </div>
          
          <div className='flex items-center justify-between'>
            <label className='text-lg'>Include Symbols</label>
            <input
              type='checkbox'
              checked={symbolAllowed}
              onChange={() => setSymbolAllowed(prev => !prev)}
              className='cursor-pointer w-5 h-5'
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
