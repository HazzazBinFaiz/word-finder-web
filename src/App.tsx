import { useState } from 'react'
import Header from './Header'
import ResultPanel from './ResultPanel'
import SearchInput from './SearchInput'

function App() {

  const [term, setTerm] = useState('')

  return (
    <div className='h-screen flex flex-col'>
      <Header className='w-full bg-slate-700' />
      <ResultPanel className='w-full max-w-5xl mx-auto flex-grow p-4 overflow-auto' term={term} />
      <SearchInput className='w-full max-w-5xl mx-auto p-4' term={term} setTerm={setTerm}/>
    </div>
  )
}

export default App
