import { createRef, Dispatch, SetStateAction, SyntheticEvent, useEffect, useRef, useState } from "react"
import { HasClassName } from "./types"

type HeaderProps = {
    term: string,
    setTerm: Dispatch<SetStateAction<string>>
} & HasClassName

function Header(props: HeaderProps) {

    const [searching, setSearching] = useState(false)
    const inputRef = createRef<HTMLInputElement>()
    const wrapperRef = createRef<HTMLDivElement>()

    const reset = () => {
        props.setTerm('')
        inputRef.current?.focus()
    }

    const handleInputChange = (event: SyntheticEvent<HTMLInputElement>) => {
        props.setTerm(event.currentTarget.value.toLowerCase().replace(/[^a-z\-]/g, ''))
    }

    const insertDash = () => {
        props.setTerm(oldTerm => {
            if (oldTerm.endsWith('-')) return oldTerm
            return oldTerm + '-'
        })
        inputRef.current?.focus()
    }

    useEffect(() => {
        if (searching) {
            inputRef.current?.focus()
        }
    }, [searching])

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (wrapperRef && wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
                setSearching(false)
            }
        }

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        }
    }, [wrapperRef])

    return (
        <div className={props.className}>
            <div className="w-full max-w-5xl mx-auto flex justify-between">
                <div className={`flex-grow items-center ${searching ? 'hidden' : 'flex'}`}>
                    <div className="text-xl font-semibold text-white p-2">
                        Word Finder
                    </div>
                </div>
                <div className={`p-2 flex justify-end items-center ${searching ? '' : 'flex-grow'}`} onClick={() => setSearching(true)}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    <div className={`${!searching && props.term.length ? 'flex' : 'hidden'} item-center p-1 text-sm text-white border rounded mx-2`}>
                        {props.term}
                    </div>
                </div>
                <div className={`flex-grow items-center ${searching ? 'flex' : 'hidden'}`}>
                    <div className="w-full relative" ref={wrapperRef}>
                        <input type="text" value={props.term} onFocus={() => setSearching(true)} onChange={handleInputChange} ref={inputRef} className="w-full border-2 border-slate-500 p-1 text-lg rounded bg-transparent text-white focus:outline-none" />
                        <div className={`absolute top-0 right-0 bottom-0 p-2 flex justify-center items-center cursor-pointer ${props.term.length ? '' : 'hidden'}`}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-4 text-slate-200" onClick={insertDash} viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z" clipRule="evenodd" />
                            </svg>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-400" onClick={reset} viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                            </svg>
                        </div>
                    </div>
                </div>
                <a className='p-2 hover:bg-slate-800 cursor-pointer' target="_blank" href="https://github.com/HazzazBinFaiz/word-finder-web">
                    <svg fill="currentColor" className="text-white w-8 h-8" viewBox="0 0 24 24"><path fill-rule="evenodd" clip-rule="evenodd" d="M12 2C6.477 2 2 6.463 2 11.97c0 4.404 2.865 8.14 6.839 9.458.5.092.682-.216.682-.48 0-.236-.008-.864-.013-1.695-2.782.602-3.369-1.337-3.369-1.337-.454-1.151-1.11-1.458-1.11-1.458-.908-.618.069-.606.069-.606 1.003.07 1.531 1.027 1.531 1.027.892 1.524 2.341 1.084 2.91.828.092-.643.35-1.083.636-1.332-2.22-.251-4.555-1.107-4.555-4.927 0-1.088.39-1.979 1.029-2.675-.103-.252-.446-1.266.098-2.638 0 0 .84-.268 2.75 1.022A9.606 9.606 0 0112 6.82c.85.004 1.705.114 2.504.336 1.909-1.29 2.747-1.022 2.747-1.022.546 1.372.202 2.386.1 2.638.64.696 1.028 1.587 1.028 2.675 0 3.83-2.339 4.673-4.566 4.92.359.307.678.915.678 1.846 0 1.332-.012 2.407-.012 2.734 0 .267.18.577.688.48C19.137 20.107 22 16.373 22 11.969 22 6.463 17.522 2 12 2z"></path></svg>
                </a>
            </div>
        </div>
    )
}

export default Header
