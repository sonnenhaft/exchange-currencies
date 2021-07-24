import React from 'react';
import styled from 'styled-components';

import { areEqual, CurrencyWithBalance, roundNumber, Setter, themes } from 'utils';

const StyledCenteredSelect = styled.select`
    background: ${ ({ theme }) => theme.background };
    border-color: ${ ({ theme }) => theme.text };
    border-radius: 4px;
    color: ${ ({ theme }) => theme.text };
    cursor: pointer;
    display: flex;
    font-weight: bold;
    font-size: 16px;
    padding: 8px;

    &:focus {
        border-color: ${ ({ theme }) => theme.text };
    }
`;

StyledCenteredSelect.defaultProps = {
    theme: themes.default
};

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
}, areEqual(['toCurrencyName', 'fromCurrencyName', 'balances', 'allRates']));
