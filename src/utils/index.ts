import { memo } from 'react';

export function roundNumber(num: number): string {
    const twoDigits = Number.parseFloat(num + '').toFixed(4);
    // to prevent case where $0.01 = €0.01
    const flooredValue = twoDigits.substring(0, twoDigits.length - 2);

    // max 2 digits after dot, no zeroes in the end
    return Number.parseFloat(flooredValue) + '';
}

export const areEqual =
    (keys: string[]): Parameters<typeof memo>[1] =>
    (from, to) =>
        keys.every(key => from[key] === to[key]);

export interface Setter<T> {
    (newValue: T): void;
}

export interface CurrencyWithBalance {
    name: string;
    symbol: string;
    balance: number;
}

export interface Theme {
    background: string;
    text: string;
    active: string;
    lightBorder: string;
}

export const themes: Record<string, Theme> = {
    default: {
        background: 'white',
        active: '#f2f2f2',
        text: '#494949',
        lightBorder: '#cccccc'
    },
    dark: {
        background: '#2864d0',
        active: '#11387a',
        text: 'white',
        lightBorder: '#c2c2c2'
    }
};

export { useCurrencies } from './useCurrencies';
export { useHash, useNumberHash } from './useHash';
export { useAsync } from './useAsync';
