import React, { useEffect } from 'react';
import styled, { ThemeProvider, createGlobalStyle } from 'styled-components';

import { useCurrencies, useNumberHash, useCacheCleanByInterval, useAsync, useHash, themes } from 'utils';

import { ExchangeWidget } from 'ExchangeWidget';
import { NormalButton, RippleButton } from 'ExchangeWidget/RippleButton';
import { freeCurrconvApi } from 'freeCurrconvApi';

const GlobalStyle = createGlobalStyle`
  body {
    background: ${ ({ theme }) => {
        // @ts-ignore
        return theme.active;
    } };
  }
`;

GlobalStyle.defaultProps = {
    theme: themes.default
};

const AppStyles = styled.div`
    min-height: 100vh;
    font-size: calc(10px + 2vmin);
    display: flex;
    flex-direction: column;
    align-items: center;
    color: ${ ({ theme }) => theme.text };
    max-width: 600px;
    position: relative;
    margin: auto;
    padding: 40px 0;
`;

AppStyles.defaultProps = {
    theme: themes.default
};

const AbsoluteRight = styled.div`
    position: absolute;
    right: 20px;
    top: 20px;
    display: flex;
    justify-content: space-between;
    margin-top: -2px;

    > button {
        margin-left: 16px;
    }
`;

export const App = () => {
    const [isMocked, setMocked] = useHash<boolean>('mocked', false);
    const [isDark, setDark] = useHash<boolean>('dark', false);

    const [total, setTotal] = useNumberHash('toConvert', 1);
    const { from, to, onCurrenciesChanged } = useCurrencies('currencies', 'SGD_MYR');

    const [data, loadCurrencies, isLoading, error] = useAsync(async (useMock = false) =>
        Promise.all([freeCurrconvApi.getCurrencies(useMock), freeCurrconvApi.getMyBalances(useMock)])
    );
    const [currencies, balances] = data || [];

    useEffect(() => {
        loadCurrencies(isMocked);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isMocked]);

    const errorOrEmptyData = (!isLoading && error) || !currencies?.length;

    const [currentRate, getExactChangeRate] = useAsync(freeCurrconvApi.getExactChangeRate);
    const [allRates, getAllRates] = useAsync(freeCurrconvApi.getAllRates);

    useEffect(() => {
        getAllRates(from, isMocked);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [from, isMocked]);

    useCacheCleanByInterval(() => {
        return Promise.all([getExactChangeRate(from, to, isMocked), getAllRates(from)]);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [from, to, isMocked]);

    useEffect(() => {
        getExactChangeRate(from, to, isMocked);

        const interval = setInterval(async () => {}, freeCurrconvApi.CACHE_EXPIRATION / 2);

        return () => clearInterval(interval);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [from, to, isMocked]);

    const theme = isDark ? themes.dark : themes.default;
    return (
        <ThemeProvider theme={ theme }>
            <GlobalStyle theme={ theme } />
            <AbsoluteRight>
                {isMocked && <NormalButton onClick={ () => setMocked(false) }>Disable 𓆟</NormalButton>}

                <NormalButton onClick={ () => setDark(!isDark) }>
                    {isDark ? 'To day theme ☼' : 'To night theme ☽'}
                </NormalButton>
            </AbsoluteRight>

            <AppStyles>
                {isLoading && <div>Loading...</div>}
                {!isLoading && errorOrEmptyData && (
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

                {!isLoading && !errorOrEmptyData && currencies && balances && (
                    <ExchangeWidget
                        selectedCurrencies={ { from, to } }
                        onCurrenciesChanged={ onCurrenciesChanged }
                        total={ total }
                        setTotal={ setTotal }
                        balances={ balances }
                        currentRate={ currentRate }
                        currencies={ currencies }
                        allRates={ allRates }
                    />
                )}

                <br />
            </AppStyles>
        </ThemeProvider>
    );
};
