import { HasClassName } from "./types";

type ResultPanelProps = {
    result: string[]
} & HasClassName


function ResultPanel(props: ResultPanelProps) {
    return (
        <div className={props.className}>
          <div className="w-full rounded shadow h-[80vh] overflow-auto">
            {props.result.map(item => (
              <div className="w-full p-2 text-lg text-slate-600 text-center border-b" dangerouslySetInnerHTML={{__html:item}}></div>
            ))}
          </div>
        </div>
    )
}

export default ResultPanel;