import { useCallback, useEffect, useState } from 'react';

export const useAsync = <Result, Error>(
    createPromise: (...params: any) => Promise<Result>,
    isImmediate?: boolean
): [
    data: Result | undefined,
    runAsync: (...params: Parameters<typeof createPromise>) => Promise<Result>,
    isLoading: boolean,
    error: Error | undefined
] => {
    const [isLoading, setLoading] = useState(false);
    const [hasTriggeredImmediately, setTriggeredImmediately] = useState<boolean | undefined>(false);
    const [error, setError] = useState<Error>();
    const [data, setData] = useState<Result>();

    const runAsync = useCallback(async (...params: Parameters<typeof createPromise>) => {
        setLoading(true);
        setData(undefined);
        setError(undefined);
        try {
            const data = await createPromise(...params);
            setData(data);
            return data;
        } catch (err) {
            setError(err);
            throw err;
        } finally {
            setLoading(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (isImmediate && !hasTriggeredImmediately) {
            setTriggeredImmediately(true);
            runAsync();
        }
    }, [isImmediate, hasTriggeredImmediately, runAsync]);

    return [data, runAsync, isLoading, error];
};
