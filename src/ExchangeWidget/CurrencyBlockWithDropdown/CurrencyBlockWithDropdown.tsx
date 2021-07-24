import React, { useMemo } from 'react';

import { Currency, Setter, roundNumber } from 'utils';

import { CustomTextInput } from 'ExchangeWidget/CustomTextInput';

import { YourBalanceBlock, CurrencyBlockWithDropdownStyles } from './CurrencyBlockWithDropdown.styles';
import { WrappedWithPrevNextButtons } from './WrappedWithPrevNextButtons';

export interface CurrencyBlockWithDropdownProps {
    value: string;
    from: string;
    total: number;
    balance: number;
    setTotal: Setter<number>;
    onChange: Setter<string>;
    currencies: Currency[];
    rate?: number | null;
}

export const CurrencyBlockWithDropdown = (props: CurrencyBlockWithDropdownProps) => {
    const { value, from, onChange, currencies, balance, total, setTotal, rate } = props;
    const next = () => {
        const val = currencies.findIndex(({ id }) => id === value) - 1;
        onChange(currencies[val < 0 ? currencies.length - 1 : val].id);
    };
    const prev = () => {
        const val = currencies.findIndex(({ id }) => id === value) + 1;
        onChange(currencies[val > currencies.length - 1 ? 0 : val].id);
    };

    const [toSymbol, fromSymbol] = useMemo(() => {
        const toSymbol = currencies.find(({ id }) => id === value)?.currencySymbol || value;
        const fromSymbol = currencies.find(({ id }) => id === from)?.currencySymbol || from;
        return [toSymbol, fromSymbol];
    }, [currencies, value, from]);

    return (
        <CurrencyBlockWithDropdownStyles>
            <WrappedWithPrevNextButtons next={ next } prev={ prev }>
                <select value={ value } onChange={ e => onChange(e.target.value) }>
                    {currencies.map(({ id }) => (
                        <option value={ id } key={ id }>
                            {id}
                        </option>
                    ))}
                </select>

                <div className="currency-near-input">{toSymbol}</div>
                <CustomTextInput rate={ rate } value={ total } setValue={ setTotal } />

                <YourBalanceBlock>
                    <span>
                        You have&nbsp;&nbsp;{toSymbol} {balance}
                    </span>

                    {rate && value !== from && (
                        <span>
                            {toSymbol} 1 = {fromSymbol} {roundNumber(1 / rate)}
                        </span>
                    )}
                </YourBalanceBlock>
            </WrappedWithPrevNextButtons>
        </CurrencyBlockWithDropdownStyles>
    );
};
