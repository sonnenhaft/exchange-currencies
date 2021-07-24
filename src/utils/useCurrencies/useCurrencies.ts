import { useCallback } from 'react';

import { useHash } from 'utils/useHash/useHash';

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
