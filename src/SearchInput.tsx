import { Dispatch, SetStateAction, SyntheticEvent } from "react";


type SearchInputProps = {
    term: string
    setTerm: Dispatch<SetStateAction<string>>
    className: string
}

function SearchInput(props : SearchInputProps) {

    const reset = () => {
        props.setTerm('')
    }

    const handleTermChange = (event: SyntheticEvent<HTMLInputElement>) => {
        props.setTerm(event.currentTarget.value.replace(/[^a-zA-Z\-]/g, '').toLowerCase())
    }

    return (
        <div className={props.className}>
            <input type='text' className='w-full border-2 border-slate-500 p-2 text-lg rounded' value={props.term} onChange={handleTermChange} placeholder='Start typing here' />
            <div className={`absolute top-0 right-0 bottom-0 w-10 flex justify-center items-center cursor-pointer ${props.term.length ? '' : 'hidden'}`} onClick={reset}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
            </div>
        </div>
    )
}

export default SearchInput;