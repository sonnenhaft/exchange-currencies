import React from 'react';

import { CurrencyWithBalance, roundNumber, Setter } from 'utils';

import { CustomTextInput } from 'CustomTextInput';

import { CurrencyBlockWithDropdownStyles, YourBalanceBlock } from './CurrencyBlockWithDropdown.styles';
import { WrappedWithPrevNextButtons } from './WrappedWithPrevNextButtons';

export interface CurrencyBlockWithDropdownProps {
    value: string;
    from: string;
    total: number;
    balances: Record<string, CurrencyWithBalance>;
    setTotal: Setter<number>;
    onChange: Setter<string>;
    rate?: number | null;
}

export const CurrencyBlockWithDropdown = (props: CurrencyBlockWithDropdownProps) => {
    const { value, from, onChange, balances, total, setTotal, rate } = props;
    const currencies = Object.values(balances);
    const next = () => {
        const val = currencies.findIndex(({ name }) => name === value) - 1;
        onChange(currencies[val < 0 ? currencies.length - 1 : val].name);
    };
    const prev = () => {
        const val = currencies.findIndex(({ name }) => name === value) + 1;
        onChange(currencies[val > currencies.length - 1 ? 0 : val].name);
    };

    const toSymbol = balances[value].symbol;
    return (
        <CurrencyBlockWithDropdownStyles>
            <WrappedWithPrevNextButtons next={ next } prev={ prev }>
                <select value={ value } onChange={ e => onChange(e.target.value) }>
                    {currencies.map(({ name }) => (
                        <option value={ name } key={ name }>
                            {name}
                        </option>
                    ))}
                </select>

                <CustomTextInput rate={ rate } value={ total } setValue={ setTotal } symbol={ toSymbol } />

                <YourBalanceBlock>
                    <span>
                        You have&nbsp;&nbsp;{toSymbol} {roundNumber(balances[value].balance)}
                    </span>

                    {rate && value !== from && (
                        <span>
                            {toSymbol} 1 = {balances[from].symbol} {roundNumber(1 / rate)}
                        </span>
                    )}
                </YourBalanceBlock>
            </WrappedWithPrevNextButtons>
        </CurrencyBlockWithDropdownStyles>
    );
};
