import React, { useEffect } from 'react';
import styled from 'styled-components';

import { useCurrencies, useBoolHash, useNumberHash, useCacheCleanByInterval, useAsync } from 'utils';
import { freeCurrconvApi } from 'freeCurrconvApi';

import { NormalButton } from 'ExchangeWidget/RippleButton';
import { ExchangeWidget } from 'ExchangeWidget';

const AppStyles = styled.div`
    min-height: 100vh;
    font-size: calc(10px + 2vmin);
    display: flex;
    flex-direction: column;
    align-items: center;
    color: white;
    max-width: 600px;
    position: relative;
    margin: auto;
    padding: 40px 0;
`;

const AbsoluteRight = styled.div`
    position: absolute;
    right: 0;
    margin-top: -2px;
`;

export const App = () => {
    const [isMocked, setMocked] = useBoolHash('isMocked');
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

    return (
        <AppStyles>
            {isLoading && <div>Loading...</div>}
            {!isLoading && errorOrEmptyData && (
                <div>
                    {error && (
                        <>
                            API error happened, try to{' '}
                            <NormalButton onClick={ () => setMocked(true) }>Use Mocks</NormalButton>
                        </>
                    )}
                    {!error && <>Can not load currencies</>}
                </div>
            )}
            {isMocked && (
                <AbsoluteRight>
                    <NormalButton onClick={ () => setMocked(false) }>Disable Mocks</NormalButton>
                </AbsoluteRight>
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
    );
};
