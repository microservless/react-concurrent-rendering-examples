import {DependencyList, EffectCallback, useEffect, useRef} from "react";

export const useDidUpdate = (effect: EffectCallback, deps: DependencyList) => {
    const isMounted = useRef(false);

    useEffect(() => {
        if (!isMounted.current) {
            isMounted.current = true;
            return;
        }
        effect();
    }, deps)
};