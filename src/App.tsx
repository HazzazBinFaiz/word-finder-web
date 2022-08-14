import { useState } from 'react'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="min-h-screen w-full flex justify-center flex-col items-center">
      <h1 className="text-3xl">
        I am in center of page
      </h1>
      <button onClick={() => setCount(count + 1)} className="p-2 mt-4 text-blue-500 font-semibold  rounded border border-blue-500">
        Count {count}
      </button>
    </div>
  )
}

export default App
