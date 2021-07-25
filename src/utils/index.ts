import { memo } from 'react';

export function roundNumber(num: number): string {
    const twoDigits = Number.parseFloat(num + '').toFixed(4);
    // to prevent case where $0.01 = €0.01
    const flooredValue = twoDigits.substring(0, twoDigits.length - 2);

    // max 2 digits after dot, no zeroes in the end
    return Number.parseFloat(flooredValue) + '';
}

export const areEqual =
    <Props>(keys: (keyof Props)[]): Parameters<typeof memo>[1] =>
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
    active: string;
    disabled: string;
    disabledText: string;
    text: string;
    lightBorder: string;
}

export const themes: Record<string, Theme> = {
    default: {
        background: 'white',
        active: '#f2f2f2',
        disabled: '#e4e4e4',
        disabledText: '#b3b3b3',
        text: '#494949',
        lightBorder: '#cccccc'
    },
    dark: {
        background: '#2864d0',
        active: '#11387a',
        disabled: '#728499',
        disabledText: '#abbfd5',
        text: 'white',
        lightBorder: '#c2c2c2'
    }
};

export { useCurrencies } from './useCurrencies';
export { useHash, useNumberHash } from './useHash';
export { useAsync } from './useAsync';
