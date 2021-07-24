import React from 'react';

import { CurrencyWithBalance, roundNumber, Setter } from 'utils';

import { CustomTextInput } from 'CustomTextInput';

import { CurrencyBlockWithDropdownStyles, YourBalanceBlock } from './CurrencyBlockWithDropdown.styles';
import { WrappedWithPrevNextButtons } from './WrappedWithPrevNextButtons';

export interface CurrencyBlockWithDropdownProps {
    value: string;
    onChange?: Setter<string>;
    total: number;
    from: string;
    setTotal: Setter<number>;
    balances: Record<string, CurrencyWithBalance>;
    rate?: number | null;
}

export const CurrencyBlockWithDropdown = (props: CurrencyBlockWithDropdownProps) => {
    const { value, onChange, from, total, setTotal, balances, rate } = props;
    const currencies = Object.values(balances);
    const next = () => {
        if (onChange) {
            const val = currencies.findIndex(({ name }) => name === value) - 1;
            onChange(currencies[val < 0 ? currencies.length - 1 : val].name);
        }
    };
    const prev = () => {
        if (onChange) {
            const val = currencies.findIndex(({ name }) => name === value) + 1;
            onChange(currencies[val > currencies.length - 1 ? 0 : val].name);
        }
    };

    const toSymbol = balances[value].symbol;
    return (
        <CurrencyBlockWithDropdownStyles>
            <WrappedWithPrevNextButtons next={ next } prev={ prev } visible={ !!onChange }>
                <select value={ value } onChange={ e => onChange && onChange(e.target.value) }>
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
