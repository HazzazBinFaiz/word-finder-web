import { useState, useEffect } from "react";
import { HasClassName } from "./types";
import wordsMap from './words'

const words = Object.keys(wordsMap)

type SearchResultProps = {
    term: string
} & HasClassName

type MatchResult = {
    html: string,
    match: RegExpMatchArray
}


const rejectNullMatch = (match: RegExpMatchArray | null): match is RegExpMatchArray => {
    return match !== null;
}

type RegExpMatchArrayWithInput = RegExpMatchArray & {
    input: string
}

const rejectBlankMatch = (match: RegExpMatchArray): match is RegExpMatchArrayWithInput => {
    return (match.input ?? '').length > 0
}

function SearchResult(props: SearchResultProps) {

    const [result, setResult] = useState<MatchResult[]>([])

    useEffect(() => {
        if (props.term === '') {
            setResult([])
            return
        }

        let searchTerm = props.term
            .replaceAll('-', '([a-z]*)')
        let pattern = new RegExp('^' + searchTerm)
        setResult(
            words.map(word => word.match(pattern))
                .filter(rejectNullMatch)
                .filter(rejectBlankMatch)
                .slice(0, 50)
                .sort((a, b) => {
                    return (a.input.length - a[0].length) - (b.input.length - b[0].length)
                })
                .map((match) => {
                    let original = match.input ?? ''
                    let matched = match[0]
                    for (let i = 1; i < match.length; i++) {
                        matched = matched.replace(match[i], '<span class="text-green-600">' + match[i] + '</span>')
                    }
                    return {
                        html: original.replace(match[0], '<span class="text-black font-semibold">' + matched + '</span>'),
                        match
                    }
                })
        )
    }, [props.term])

    return (
        <div className={`w-full flex flex-wrap justify-center ${props.className}`}>
            {result.map(item => (
                <div key={item.match.input} className="w-1/2 md:w-1/3 flex-grow p-1 text-lg text-slate-600 text-center border">
                    <div className="w-full text-xl" dangerouslySetInnerHTML={{ __html: item.html }}></div>
                    <div className="w-full text-sm text-slate-500">{item.match.input != undefined ? (wordsMap[item.match.input as keyof typeof wordsMap] ?? '') : ''}</div>
                </div>
            ))}
        </div>
    )
}

export default SearchResult;