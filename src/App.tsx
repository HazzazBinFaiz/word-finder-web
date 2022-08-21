import { useEffect, useState } from 'react'
import Header from './Header'
import ResultPanel from './ResultPanel'

function App() {

  const [term, setTerm] = useState('')

  useEffect(() => {
    document.getElementById('loading')?.remove()
    
    setTerm('-')
    setTimeout(() => {
      setTerm('')
    }, 1)
   
  }, []);

  return (
    <div className='h-screen flex flex-col'>
      <Header className='w-full bg-slate-700' term={term} setTerm={setTerm}/>
      <ResultPanel className='w-full max-w-5xl mx-auto flex-grow overflow-auto' term={term} />
    </div>
  )
}

export default App
