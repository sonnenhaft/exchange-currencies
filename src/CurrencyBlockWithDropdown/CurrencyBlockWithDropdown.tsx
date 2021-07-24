import React from 'react';

import { CurrencyWithBalance, roundNumber, Setter } from 'utils';

import { CustomTextInput } from 'CustomTextInput';

import { CurrencyBlockWithDropdownStyles, YourBalanceBlock } from './CurrencyBlockWithDropdown.styles';
import { WrappedWithPrevNextButtons } from './WrappedWithPrevNextButtons';

export interface CurrencyBlockWithDropdownProps {
    currencyName: string;
    setCurrencyName: Setter<string>;
    total: number;
    fromCurrencyName: string;
    setTotal: Setter<number>;
    balances: Record<string, CurrencyWithBalance>;
    rate?: number | null;
}

export const CurrencyBlockWithDropdown = (props: CurrencyBlockWithDropdownProps) => {
    const { currencyName, setCurrencyName, fromCurrencyName, total, setTotal, balances, rate } = props;
    const currencies = Object.values(balances).map(({ name }) => name);
    const next = () => {
        const val = currencies.findIndex(currency => currency === currencyName) - 1;
        setCurrencyName(currencies[val < 0 ? currencies.length - 1 : val]);
    };
    const prev = () => {
        const val = currencies.findIndex(currency => currency === currencyName) + 1;
        setCurrencyName(currencies[val > currencies.length - 1 ? 0 : val]);
    };

    const toSymbol = balances[currencyName].symbol;
    return (
        <CurrencyBlockWithDropdownStyles>
            <WrappedWithPrevNextButtons next={ next } prev={ prev }>
                <select value={ currencyName } onChange={ e => setCurrencyName(e.target.value) }>
                    {currencies.map(name => (
                        <option value={ name } key={ name }>
                            {name}
                        </option>
                    ))}
                </select>

                <CustomTextInput rate={ rate } value={ total } setValue={ setTotal } symbol={ toSymbol } />

                <YourBalanceBlock>
                    <span>
                        You have&nbsp;&nbsp;{toSymbol} {roundNumber(balances[currencyName].balance)}
                    </span>

                    {rate && currencyName !== fromCurrencyName && (
                        <span>
                            {toSymbol} 1 = {balances[fromCurrencyName].symbol} {roundNumber(1 / rate)}
                        </span>
                    )}
                </YourBalanceBlock>
            </WrappedWithPrevNextButtons>
        </CurrencyBlockWithDropdownStyles>
    );
};
