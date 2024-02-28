import { useState,useCallback,useEffect,useRef} from 'react'


function App() {
  const[length,setLength] = useState(8)
  const[numberAllowed,SetnumberAllowed] = useState(false)
  const[charAllowed,SetcharAllowed] = useState(false)
  const[password,setPassword] = useState("")

  //use UseRef
  const passwordRef = useRef(null)

  const passwordGenerator =useCallback(()=>{
    let pass=""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if(numberAllowed) str+="0123456789"
    if(charAllowed) str+="!@#$%^&*{}[]"

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random()*str.length+1)
      pass += str.charAt(char)    
    }
    setPassword(pass)

  },[length,numberAllowed,charAllowed,setPassword]
  )
  useEffect(()=>{


    passwordGenerator()
  },[length,numberAllowed,charAllowed,passwordGenerator])
  const copypasswordtoClipboard = useCallback(()=>{
    passwordRef.current?.select()
    window.navigator.clipboard.writeText(password)
  },[password])
  return (
    <>
      <h1 className='text-4xl text-center text-white' >Password Generator</h1>
      <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-8  text-orange-500'>
        <div className='flex shadow rounded-lg overflow-hidden mb-4 text-orange-500'>Password Generator
        <input type='text' className='outline-none w-full py-1 px-3' value={password} placeholder='password'readOnly ref={passwordRef}/>
        </div>
        <button className='outline-none bg-blue-600 text-white mx-3 my-3'onClick={copypasswordtoClipboard}>Copy</button>
      </div>
      <div className='flex text-sm gap-x-2'>
        <div className='flex item-center gap-x-1'>
          <input type='range' min={6} max={16} value={length}onChange={(e)=>{setLength(e.target.value)}} className='cursor-pointer'/>
          <label className='text-orange-500'> Length {length}</label>
        </div>
        <div className='flex item-center gap-x-1'>
          <input type="checkbox" defaultChecked={numberAllowed} id="numberInput" onChange={()=>{SetnumberAllowed((prev)=>!prev)}} />
          <label htmlFor="numberInput" className='text-orange-500'>Numbers</label>
        </div>
        <div className='flex item-center gap-x-1'>
          <input type="checkbox" defaultChecked={charAllowed} id="charecterInput" onChange={()=>{SetcharAllowed((prev)=>!prev)}} />
          <label htmlFor="charecterInput" className='text-orange-500'>Charecter</label>
        </div>
        </div>
  
    </>
  )
}

export default App
