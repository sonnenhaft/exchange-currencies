import { useEffect, useState } from 'react';
import { freeCurrconvApi } from '../freeCurrconvApi';

export const useCacheCleanByInterval = (fn: () => Promise<any>, deps: any[]) => {
    const [intervalTriggeredRefresh, setIntervalTriggeredRefresh] = useState(false);

    useEffect(() => {
        const timeout = setInterval(async () => {
            freeCurrconvApi.flushCache();
            setIntervalTriggeredRefresh(true);
        }, freeCurrconvApi.CACHE_EXPIRATION);

        return () => clearTimeout(timeout);
    }, [intervalTriggeredRefresh]);

    useEffect(() => {
        if (intervalTriggeredRefresh) {
            fn();
            setIntervalTriggeredRefresh(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [...deps, intervalTriggeredRefresh]);
};
