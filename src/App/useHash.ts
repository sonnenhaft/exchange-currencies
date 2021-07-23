import { useEffect, useState } from 'react';

const readHash = (url: string = window.location.href) => {
    const items = ((url?.split('#')[1] || '').split('?')[1] || '')
        .split('&')
        .map(i => i.split('='))
        .map(([_, v]) => [_, v ? decodeURIComponent(v) : true]);
    return Object.fromEntries(items);
};

/**
 * It works like `React.useState`, just browsers url - its hash part (query in the hash) as storage
 * quite handy to share the state of the app, and quite lightweight, hope u will like it
 */
export function useHash(hashKey: string): [string, (t: string) => void] {
    const initialState = () => readHash()[hashKey];
    const [currentValue, setCurrentValue] = useState<string>(initialState);

    useEffect(() => {
        const setFromHashIfChanged = e => {
            const newHashValue = readHash(e.newURL)[hashKey];
            if (newHashValue !== currentValue) {
                setCurrentValue(newHashValue);
            }
        };

        window.addEventListener('hashchange', setFromHashIfChanged, false);
        return () => window.removeEventListener('hashchange', setFromHashIfChanged, false);
    }, [currentValue, hashKey]);

    return [
        currentValue,
        (newVal: string) => {
            setCurrentValue(newVal);
            const hashObj = readHash();
            const entries = Object.entries({ ...hashObj, [hashKey]: newVal }).filter(([_, v]) => v);
            const [hash] = window.location.hash.split('?');
            const entriesString = entries.map(([k, v]) => (v === true || !v ? k : [k, v].join('='))).join('&');
            window.location.hash = `${ hash }${ entries.length ? `?${ entriesString }` : '' }`;
        }
    ];
}

/** Same as `useHash` but for numbers */
export function useNumberHash(hashKey: string, defaultVal: number): [number, (t: number) => void] {
    const [strVal, setStrVal] = useHash(hashKey);
    const num = Number.parseInt(strVal, 10);

    return [strVal && !isNaN(num) ? num : defaultVal, (n: number) => setStrVal(n + '')];
}
