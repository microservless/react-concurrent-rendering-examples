import {useState, useDeferredValue} from "react";
import {SlowCountries} from "../components/SlowCountries.tsx";

export function DeferredQuery() {
    const [query, setQuery] = useState('');
    const deferredQuery = useDeferredValue(query);

    const [isDeferredQueryEnabled, enableDeferredQuery] = useState(true);

    return (
        <div className="card">
            <button
                onClick={() => enableDeferredQuery((prev) => !prev)}>
                {isDeferredQueryEnabled ? 'Deferred enabled' : 'Deferred disabled'}
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