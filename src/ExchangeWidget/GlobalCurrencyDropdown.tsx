import React from 'react';
import styled from 'styled-components';
import { Currency, Setter, areEqual, roundNumber } from 'utils';

const StyledCenteredSelect = styled.select`
    background: #0e5dd1;
    border-color: #1c6ee2;
    border-radius: 4px;
    color: white;
    cursor: pointer;
    display: flex;
    font-weight: bold;
    font-size: 12px;
    margin: 1px 1px 8px 1px;
    min-width: 155px;
    padding: 8px;

    &:focus {
        border-color: white;
    }
`;

interface GlobalCurrencyDropdownProps {
    to: string;
    from: string;
    setToValue: Setter<string>;
    currencies: Currency[];
    currentRate?: number | null;
    allRates?: Record<string, number>;
}

export const GlobalCurrencyDropdown = React.memo(
    ({ currencies, from, to, setToValue, allRates, currentRate }: GlobalCurrencyDropdownProps) => {
        const initialCurrency = currencies.find(({ id }) => id === from);
        return (
            <StyledCenteredSelect value={ to } onChange={ e => setToValue(e.target.value) }>
                {currencies
                    .filter(({ id }) => id !== from)
                    .map(({ id, currencySymbol }) => {
                        let rate: number | undefined = allRates?.[id];
                        if (id === to && currentRate) {
                            rate = currentRate;
                        }

                        return (
                            <option value={ id } key={ id }>
                                {initialCurrency?.currencySymbol || initialCurrency?.id || from} 1{' = '}
                                {currencySymbol || id} {rate ? roundNumber(rate) : 'Loading...'}
                            </option>
                        );
                    })}
            </StyledCenteredSelect>
        );
    },
    areEqual(['to', 'from', 'data', 'currentRate', 'allRates'])
);
