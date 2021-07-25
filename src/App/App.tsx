import React, { useEffect, useMemo, useState } from 'react';
import { ThemeProvider } from 'styled-components/macro';

import { CurrencyWithBalance, themes, useAsync, useCurrencies, useHash, useNumberHash } from 'utils';

import { ExchangeWidget } from 'ExchangeWidget';
import { NormalButton } from 'RippleButton';
import { balanceAndRatesApi } from 'balanceAndRatesApi';
import { ThemeSwitchWrapper, AppStyles, GlobalStyle } from './App.styles';

export const App = () => {
    const [isMocked, setMocked] = useHash<boolean>('mocked', false);
    const [isDark, setDark] = useHash<boolean>('dark', false);

    const [total, setTotal] = useNumberHash('toConvert', 10);
    const { from, to, onCurrenciesChanged } = useCurrencies('currencies', 'PLN_EUR');

    const [apiBalances, , isLoading] = useAsync(() => balanceAndRatesApi.fetchMyBalances(), true);

    // here should be "save balance" api instead of mocks
    const [balances, saveBalances] = useState<Record<string, CurrencyWithBalance> | null>(null);
    useEffect(() => {
        if (apiBalances) {
            saveBalances(apiBalances);
        }
    }, [apiBalances]);

    const [ratesWithExpiration, fetchUSDBaseRates, , error] = useAsync((isMocked: boolean) =>
        balanceAndRatesApi.fetchUSDBaseRates(isMocked)
    );

    useEffect(() => {
        if (!ratesWithExpiration || !ratesWithExpiration.expiration) {
            return;
        }
        const timeout = setTimeout(() => fetchUSDBaseRates(isMocked), ratesWithExpiration.expiration - Date.now());
        return () => clearTimeout(timeout);
    }, [ratesWithExpiration, isMocked, fetchUSDBaseRates]);

    useEffect(() => {
        fetchUSDBaseRates(isMocked);
    }, [isMocked, fetchUSDBaseRates]);

    const { rates } = ratesWithExpiration || {};
    const [usdRates, setUsdRates] = useState<Record<string, number>>();
    useEffect(() => {
        if (rates) {
            // preventing "loading" case
            setUsdRates(rates);
        }
    }, [rates]);

    const allRates = useMemo(() => {
        if (!usdRates) {
            return usdRates;
        } else {
            return Object.fromEntries(
                Object.entries(usdRates).map(([currency, usdRate]) => [currency, usdRate / usdRates[from]])
            );
        }
    }, [usdRates, from]);

    const errorOrEmptyData = !isLoading && (error || !balances);
    const theme = isDark ? themes.dark : themes.default;

    return (
        <ThemeProvider theme={ theme }>
            <GlobalStyle theme={ theme } />

            <ThemeSwitchWrapper>
                {isMocked && <NormalButton onClick={ () => setMocked(false) }>Disable 𓆟</NormalButton>}

                <NormalButton onClick={ () => setDark(!isDark) }>
                    {isDark ? 'To day theme ☼' : 'To night theme ☽'}
                </NormalButton>
            </ThemeSwitchWrapper>

            <AppStyles>
                {isLoading && <div>Loading...</div>}
                {errorOrEmptyData && (
                    <div>
                        {error && (
                            <>
                                API error happened, try to{' '}
                                <NormalButton onClick={ () => setMocked(true) }>Use Mocks 𓆟</NormalButton>
                            </>
                        )}

                        {!error && <>Can not load currencies</>}
                    </div>
                )}

                {!errorOrEmptyData && balances && (
                    <ExchangeWidget
                        selectedCurrencies={ { from, to } }
                        onCurrenciesChanged={ onCurrenciesChanged }
                        total={ total }
                        setTotal={ setTotal }
                        balances={ balances }
                        saveBalances={ saveBalances }
                        allRates={ allRates }
                    />
                )}
            </AppStyles>
        </ThemeProvider>
    );
};
