import { SyntheticEvent, useEffect, useState } from 'react'
import Header from './Header'
import SearchInput from './SearchInput'
import words from './words.json'

function App() {

  const [term, setTerm] = useState('')
  const [result, setResult] = useState<string[]>([])

  useEffect(() => {
    if (term === '') {
      setResult([])
      return
    }

    let searchTerm = term
      .replaceAll('-', '([a-z]*)')
    let pattern = new RegExp('^'+searchTerm)
    setResult(
      words.map(word => word.match(pattern))
        .filter((match : RegExpMatchArray | null) : match is RegExpMatchArray  => {
          return match !== null && match !== undefined;
        })
        .filter(match => {
          return match.input !== undefined && match.input.length
        })
        .slice(0, 20)
        .sort((a, b) => {
          return b.join().length - a.join().length
        })
        .map((match) => {
          let original = match.input ?? ''
          let matched = match[0]
          for (let i = 1; i < match.length; i++) {
            matched = matched.replace(match[i], '<span class="text-green-600">' + match[i] + '</span>')
          }
          return original.replace(match[0], '<span class="text-black font-semibold">' + matched + '</span>')
        })
    )
  }, [term])

  return (
    <div className='min-h-screen flex flex-col flex-wrap'>
      <Header />
      <div className='w-full max-w-5xl mx-auto flex flex-wrap flex-col flex-grow p-4 justify-start'>
        <div className="w-full flex flex-wrap">
          <div className="w-full rounded shadow h-[80vh] overflow-auto">
            {result.map(item => (
              <div className="w-full p-2 text-lg text-slate-600 text-center border-b" dangerouslySetInnerHTML={{__html:item}}></div>
            ))}
          </div>
        </div>
        <SearchInput className='w-full relative self-center' term={term} setTerm={setTerm}/>
      </div>
    </div>
  )
}

export default App
