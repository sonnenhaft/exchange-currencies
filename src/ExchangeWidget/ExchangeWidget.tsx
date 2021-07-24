import React from 'react';

import { CurrencyWithBalance, Setter } from 'utils';
import { NormalButton } from 'RippleButton';

import { CurrencyBlockWithDropdown } from '../CurrencyBlockWithDropdown';
import { MiddleSwapButton } from '../MiddleSwapButton';
import { CurrencyBlock, ExchangeWidgetStyles, Centered } from './ExchangeWidget.styles';
import { GlobalCurrencyDropdown } from '../GlobalCurrencyDropdown';

interface SelectedCurrencies {
    from: string;
    to: string;
}

interface ExchangeWidgetProps {
    selectedCurrencies: SelectedCurrencies;
    onCurrenciesChanged: Setter<Partial<SelectedCurrencies>>;
    total: number;
    setTotal: Setter<number>;
    balances: Record<string, CurrencyWithBalance>;
    saveBalances: Setter<Record<string, CurrencyWithBalance>>;
    allRates?: Record<string, number>;
}

export const ExchangeWidget = (props: ExchangeWidgetProps) => {
    const { selectedCurrencies, onCurrenciesChanged, total, setTotal, balances, allRates } = props;
    const { from, to } = selectedCurrencies;
    const swapCurrencies = () => onCurrenciesChanged({ to: from, from: to });
    const setToValue = to => (to === from ? swapCurrencies() : onCurrenciesChanged({ to }));
    const setFromValue = from => (from === to ? swapCurrencies() : onCurrenciesChanged({ from }));

    const exchangeCurrencies = () => {
        if (!allRates) {
            return;
        }
        balances[from].balance = balances[from].balance - total;
        balances[to].balance = balances[to].balance + total * allRates[to];
        props.saveBalances({ ...balances });
    };

    const exchangeDisabled =
        !allRates || !total || total > balances[from].balance || total < -balances[to].balance / allRates[to];

    return (
        <CurrencyBlock>
            <Centered>
                <GlobalCurrencyDropdown
                    to={ to }
                    from={ from }
                    setToValue={ setToValue }
                    balances={ balances }
                    allRates={ allRates }
                />
            </Centered>

            <ExchangeWidgetStyles>
                <CurrencyBlockWithDropdown
                    value={ from }
                    onChange={ setFromValue }
                    from={ from }
                    total={ total }
                    setTotal={ setTotal }
                    balances={ balances }
                    rate={ -1 }
                />

                <MiddleSwapButton onClick={ swapCurrencies } />

                <CurrencyBlockWithDropdown
                    value={ to }
                    onChange={ setToValue }
                    from={ from }
                    total={ total }
                    setTotal={ setTotal }
                    balances={ balances }
                    rate={ allRates && allRates[to] }
                />
            </ExchangeWidgetStyles>

            <Centered>
                <NormalButton onClick={ exchangeCurrencies } disabled={ exchangeDisabled }>
                    Exchange
                </NormalButton>
            </Centered>
        </CurrencyBlock>
    );
};
