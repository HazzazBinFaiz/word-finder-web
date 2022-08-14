import { HasClassName } from "./types";

type ResultPanelProps = {
    result: string[]
} & HasClassName


function ResultPanel(props: ResultPanelProps) {
    return (
        <div className={props.className}>
            {props.result.map(item => (
                <div className="w-full p-2 text-lg text-slate-600 text-center border-t border-x last:border-b" dangerouslySetInnerHTML={{ __html: item }}></div>
            ))}
        </div>
    )
}

export default ResultPanel;