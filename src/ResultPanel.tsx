import { lazy, Suspense } from "react";
import HomePageIllustration from "./HomePageIllustration";
import { HasClassName } from "./types";

type ResultPanelProps = {
    term: string
} & HasClassName

const SearchResult = lazy(() => import('./SearchResult'))

function ResultPanel(props: ResultPanelProps) {
    return (
        <div className={props.className}>
            {props.term.length === 0 ?
                <div className="w-full flex flex-wrap justify-center">
                    <div className="w-full flex flex-col items-center opacity-60">
                        <HomePageIllustration className="w-full h-[20rem] mt-8" />
                        <div className="text-4xl mt-12 text-slate-700 font-semibold">Search to get result</div>
                    </div>
                </div>
                :
                <Suspense fallback={
                    <div className="w-full p-4 text-center">Loading ...</div>
                }>
                    <SearchResult term={props.term} className={''} />
                </Suspense>
            }
        </div>
    )
}

export default ResultPanel;