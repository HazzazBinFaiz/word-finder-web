import { SyntheticEvent, useEffect, useState } from 'react'
import Header from './Header'
import words from './words.json'

function App() {

  const [term, setTerm] = useState('')
  const [result, setResult] = useState<string[]>([])

  const handleTermChange = (event: SyntheticEvent<HTMLInputElement>) => {
    setTerm(event.currentTarget.value.replace(/[^a-zA-Z\-_]/g, '').toLowerCase())
  }

  const reset = () => {
    setTerm('')
  }

  function notEmpty<TValue>(value: TValue | null | undefined): value is TValue {
    return value !== null && value !== undefined;
  }

  useEffect(() => {
    if (term === '') {
      setResult([])
      return
    }

    let searchTerm = term
      .replaceAll('-', '([a-z]*)')
      .replaceAll('_', '([a-z])')
    let pattern = new RegExp(searchTerm)
    setResult(
      words.map(word => word.match(pattern))
        .filter(notEmpty)
        .map((match) => {
          let original = match[0]
          for (let i = 1; i < match.length; i++) {
            original = original.replace(match[i], '<span class="text-green-600">' + match[i] + '</span>')
          }
          return original
        }).sort((a, b) => {
          return b.length - a.length
        })
    )
  }, [term])

  return (
    <div className='min-h-screen flex flex-col flex-wrap'>
      <Header />
      <div className='flex flex-wrap flex-col flex-grow p-4 justify-start'>
        <div className="w-full flex flex-wrap">
          <div className="w-full rounded shadow h-[80vh] overflow-auto">
            {result.map(item => (
              <div className="w-full p-2 text-lg text-slate-700 text-center border-b" dangerouslySetInnerHTML={{__html:item}}></div>
            ))}
          </div>
        </div>
        <div className="w-full mt-8 relative self-center">
          <input type='text' className='w-full border-2 border-slate-500 p-2 text-lg rounded' value={term} onChange={handleTermChange} placeholder='Start typing here' />
          <div className="absolute top-0 right-0 bottom-0 w-10 flex justify-center items-center cursor-pointer" onClick={reset}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
