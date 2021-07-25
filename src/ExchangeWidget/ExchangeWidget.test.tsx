import React, { useState } from 'react';
import { render, screen } from '@testing-library/react';

import { ExchangeWidget } from './ExchangeWidget';
import { CurrencyWithBalance } from '../utils';
import { getMockedBalances, MOCKED_RATES } from '../balanceAndRatesApi';

const MockedExchange = ({ init }: { init: { from: string; to: string } } = { init: { from: 'USD', to: 'EUR' } }) => {
    const [currencies, setCurrencies] = useState(init);
    const onCurrenciesChanged = ({ to, from }: { from?: string; to?: string }) =>
        setCurrencies({
            to: to || currencies.to,
            from: from || currencies.from
        });
    const [balances, saveBalances] = useState<Record<string, CurrencyWithBalance>>(getMockedBalances);
    const [total, setTotal] = useState(10);
    return (
        <ExchangeWidget
            selectedCurrencies={ currencies }
            onCurrenciesChanged={ onCurrenciesChanged }
            total={ total }
            setTotal={ setTotal }
            balances={ balances }
            saveBalances={ saveBalances }
            allRates={ MOCKED_RATES }
        />
    );
};

describe('ExchangeWidget', () => {
    test('Should render exchange button when all data presented', () => {
        render(<MockedExchange init={ { from: 'EUR', to: 'USD' } } />);
        expect(screen.getByText(/Exchange/i)).toBeInTheDocument();
    });

    test('swap button should swap currencies in selects', () => {
        const { container } = render(<MockedExchange init={ { from: 'EUR', to: 'USD' } } />);
        const getPageSelectsState = () => Array.from(container.querySelectorAll('select')).map(t => t.value);
        expect(getPageSelectsState()).toEqual(['USD', 'EUR', 'USD']);

        // @ts-ignore
        let swapButton = container.querySelector('svg').parentElement as any;
        swapButton.click();
        expect(getPageSelectsState()).toEqual(['EUR', 'USD', 'EUR']);
    });
});
