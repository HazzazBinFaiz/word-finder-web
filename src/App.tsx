import { useState } from 'react'
import Header from './Header'
import ResultPanel from './ResultPanel'
import SearchInput from './SearchInput'

function App() {

  const [term, setTerm] = useState('')

  return (
    <div className='h-screen flex flex-col'>
      <Header className='w-full bg-slate-700' term={term} setTerm={setTerm}/>
      <ResultPanel className='w-full max-w-5xl mx-auto flex-grow overflow-auto' term={term} />
    </div>
  )
}

export default App
