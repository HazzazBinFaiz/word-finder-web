import { useState, useEffect } from "react";
import { HasClassName } from "./types";
import words from './words.json'

type ResultPanelProps = {
    term: string
} & HasClassName


const rejectNullMatch = (match: RegExpMatchArray | null) : match is RegExpMatchArray => {
    return match !== null;
}

type RegExpMatchArrayWithInput = RegExpMatchArray & {
    input: string
}

const rejectBlankMatch = (match: RegExpMatchArray) : match is RegExpMatchArrayWithInput => {
    return (match.input ?? '').length > 0
}

function ResultPanel(props: ResultPanelProps) {

    const [result, setResult] = useState<string[]>([])

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
                    return original.replace(match[0], '<span class="text-black font-semibold">' + matched + '</span>')
                })
        )
    }, [props.term])

    return (
        <div className={props.className}>
            {result.map(item => (
                <div className="w-full p-2 text-lg text-slate-600 text-center border-t border-x last:border-b" dangerouslySetInnerHTML={{ __html: item }}></div>
            ))}
        </div>
    )
}

export default ResultPanel;