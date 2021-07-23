import { useHash } from '../useHash/useHash';
import { useCallback } from 'react';

export const useCurrencies = (hashKey: string, from_to_defaultVal: string) => {
    const [currencies, setCurrencies] = useHash(hashKey, from_to_defaultVal);
    const [from, to] = (currencies || from_to_defaultVal).split('_');

    return {
        from,
        to,
        onCurrenciesChanged: useCallback(
            (p: { from?: string; to?: string }) => {
                setCurrencies([p.from || from, p.to || to].join('_'));
            },
            [from, to, setCurrencies]
        )
    };
};