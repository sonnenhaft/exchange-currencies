import React from 'react';

import { GlobalCurrencyDropdown } from './GlobalCurrencyDropdown';
import { CurrencyBlockWithDropdown } from './CurrencyBlockWithDropdown';
import { ExchangeMiddleButton } from './ExchangeMiddleButton';
import { CurrencyBlock } from './ExchangeWidget.styles';
import { Currency, Setter } from 'utils';

type SelectedCurrencies = { from: string; to: string };

interface ExchangeWidgetProps {
    selectedCurrencies: SelectedCurrencies;
    onCurrenciesChanged: Setter<Partial<SelectedCurrencies>>;
    total: number;
    setTotal: Setter<number>;
    balances: Record<string, number>;
    currentRate?: number;
    allRates?: Record<string, number>;
    currencies: Currency[];
}

export const ExchangeWidget = (props: ExchangeWidgetProps) => {
    const { currencies, selectedCurrencies, total, onCurrenciesChanged, currentRate, setTotal, balances, allRates } =
        props;

    const { from, to } = selectedCurrencies;
    const swapCurrencies = () => onCurrenciesChanged({ to: from, from: to });
    const setToValue = to => (to === from ? swapCurrencies() : onCurrenciesChanged({ to }));
    const setFromValue = from => (from === to ? swapCurrencies() : onCurrenciesChanged({ from }));

    return (
        <>
            <GlobalCurrencyDropdown
                to={ to }
                from={ from }
                setToValue={ setToValue }
                currentRate={ currentRate }
                allRates={ allRates }
                currencies={ currencies }
            />

            <CurrencyBlock>
                <CurrencyBlockWithDropdown
                    value={ from }
                    from={ from }
                    onChange={ setFromValue }
                    currencies={ currencies }
                    total={ total }
                    setTotal={ setTotal }
                    rate={ 1 }
                    balance={ balances[from] || 0 }
                />

                <ExchangeMiddleButton onClick={ swapCurrencies } />

                <CurrencyBlockWithDropdown
                    value={ to }
                    from={ from }
                    onChange={ setToValue }
                    currencies={ currencies }
                    total={ total }
                    setTotal={ setTotal }
                    rate={ currentRate }
                    balance={ balances[to] || 0 }
                />
            </CurrencyBlock>
        </>
    );
};
