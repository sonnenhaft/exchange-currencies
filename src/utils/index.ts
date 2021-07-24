import { memo } from 'react';

export function roundNumber(num: number): string {
    const fixedThreeDigits = Number.parseFloat(num + '').toFixed(3);
    // to prevent case where EUR0.1=USD 0.1
    const flooredValue = Math.floor(Number(fixedThreeDigits) * 100) / 100;
    // max 2 digits after dot, no zeroes in the end
    return Number.parseFloat(flooredValue.toFixed(2)) + '';
}

export const areEqual =
    (keys: string[]): Parameters<typeof memo>[1] =>
    (from, to) =>
        keys.every(key => from[key] === to[key]);

export interface Setter<T> {
    (newValue: T): void;
}

export interface Currency {
    id: string; // like EUR
    currencyName: string; // like 'Japanese Yen'
    currencySymbol?: string; // like '$'
}

export const themes: Record<
    string,
    {
        background: string;
        text: string;
        active: string;
    }
> = {
    default: {
        background: 'white',
        active: '#f2f2f2',
        text: '#494949'
    },
    dark: {
        background: '#2864d0',
        active: '#11387a',
        text: 'white'
    }
};

export { useCurrencies } from './useCurrencies/useCurrencies';
export { useHash, useNumberHash } from './useHash/useHash';
export { useCacheCleanByInterval } from './useCacheCleanByInterval';
export { useAsync } from './useAsync';
