import React from 'react';
import styled from 'styled-components/macro';

import { areEqual, CurrencyWithBalance, roundNumber, Setter } from 'utils';

const StyledCenteredSelect = styled.select`
    display: flex;
    font-weight: bold;
    font-size: 16px;
    padding: 8px;
    background: ${ ({ theme }) => theme.background };
`;

interface GlobalCurrencyDropdownProps {
    toCurrencyName: string;
    fromCurrencyName: string;
    setToValue: Setter<string>;
    balances: Record<string, CurrencyWithBalance>;
    allRates?: Record<string, number>;
}

export const GlobalCurrencyDropdown = React.memo((props: GlobalCurrencyDropdownProps) => {
    const { toCurrencyName, fromCurrencyName, setToValue, balances, allRates } = props;

    return (
        <StyledCenteredSelect value={ toCurrencyName } onChange={ e => setToValue(e.target.value) }>
            {Object.values(balances)
                .filter(({ name }) => name !== fromCurrencyName)
                .map(({ name, symbol }) => {
                    let rate = allRates?.[name];

                    return (
                        <option value={ name } key={ name }>
                            {balances[fromCurrencyName].symbol} 1{' = '}
                            {symbol} {rate ? roundNumber(rate) : 'Loading...'}
                        </option>
                    );
                })}
        </StyledCenteredSelect>
    );
}, areEqual<GlobalCurrencyDropdownProps>(['toCurrencyName', 'fromCurrencyName', 'balances', 'allRates']));
