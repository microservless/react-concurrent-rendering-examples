import {useState, useDeferredValue, useTransition} from "react";
import {SlowCountries} from "./SlowCountries.tsx";

function addComment(comment = '') {
  // For demonstration purposes to show Error Boundary
  if (comment === '') {
    throw new Error("Example Error: An error thrown to trigger error boundary");
  }
}
  
export function DeferredValue() {
    const [query, setQuery] = useState('');
    const deferredQuery = useDeferredValue(query);
    // direct startTransition import from react doesn't trigger ErrorBoundary
    const [_, startTransition] = useTransition();

    const [isDeferredQueryEnabled, enableDeferredQuery] = useState(true);

    return (
        <div className="card">
            <button
                onClick={() => enableDeferredQuery((prev) => !prev)}>
                {isDeferredQueryEnabled ? 'Deferred enabled' : 'Deferred disabled'}
            </button>
            <button
                onClick={() => { 
                    startTransition(() => {
                        addComment();
                    })
                 }}>
                {'Throw exception'}
            </button>
            <input value={query} type="text" onChange={(e) => setQuery(e.target.value)}/>
            <div style={{
                opacity: isDeferredQueryEnabled && deferredQuery !== query ? 0.5 : 1,
                transition: isDeferredQueryEnabled && deferredQuery !== query ? 'opacity 0.2s 0.2s linear' : 'opacity 0s 0s linear'
            }}>
                <SlowCountries query={isDeferredQueryEnabled ? deferredQuery : query}/>
            </div>
        </div>
    )
}