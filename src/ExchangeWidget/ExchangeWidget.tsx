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
    const { from: fromCurrencyName, to: toCurrencyName } = selectedCurrencies;
    const swapCurrencies = () => onCurrenciesChanged({ to: fromCurrencyName, from: toCurrencyName });
    const setToValue = toCurrencyName =>
        toCurrencyName === fromCurrencyName ? swapCurrencies() : onCurrenciesChanged({ to: toCurrencyName });
    const setFromValue = fromCurrencyName =>
        toCurrencyName === fromCurrencyName ? swapCurrencies() : onCurrenciesChanged({ from: fromCurrencyName });

    const exchangeCurrencies = () => {
        if (!allRates) {
            return;
        }
        balances[fromCurrencyName].balance = balances[fromCurrencyName].balance - total;
        balances[toCurrencyName].balance = balances[toCurrencyName].balance + total * allRates[toCurrencyName];
        props.saveBalances({ ...balances });
    };

    const exchangeDisabled =
        !allRates ||
        !total ||
        total > balances[fromCurrencyName].balance ||
        total < -balances[toCurrencyName].balance / allRates[toCurrencyName] ||
        Math.abs(total * allRates[toCurrencyName]) < 0.01 ||
        Math.abs(total) < 0.01;

    return (
        <CurrencyBlock>
            <Centered>
                <GlobalCurrencyDropdown
                    toCurrencyName={ toCurrencyName }
                    fromCurrencyName={ fromCurrencyName }
                    setToValue={ setToValue }
                    balances={ balances }
                    allRates={ allRates }
                />
            </Centered>

            <ExchangeWidgetStyles>
                <CurrencyBlockWithDropdown
                    currencyName={ fromCurrencyName }
                    setCurrencyName={ setFromValue }
                    fromCurrencyName={ fromCurrencyName }
                    total={ total }
                    setTotal={ setTotal }
                    balances={ balances }
                    rate={ -1 }
                />

                <MiddleSwapButton onClick={ swapCurrencies } />

                <CurrencyBlockWithDropdown
                    currencyName={ toCurrencyName }
                    setCurrencyName={ setToValue }
                    fromCurrencyName={ fromCurrencyName }
                    total={ total }
                    setTotal={ setTotal }
                    balances={ balances }
                    rate={ allRates && allRates[toCurrencyName] }
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
