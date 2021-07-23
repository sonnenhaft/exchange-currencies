import { useCallback, useEffect, useState } from 'react';

export const useAsync = <Result, Error>(
    createPromise: (...params: any) => Promise<Result>,
    isImmediate?: false
): {
    isLoading: boolean;
    error?: Error;
    data?: Result;
    runAsync: (...params: Parameters<typeof createPromise>) => Promise<Result>;
} => {
    const [isLoading, setLoading] = useState(false);
    const [hasTriggeredImmediately, setTriggeredImmediately] = useState<boolean | undefined>(isImmediate);
    const [error, setError] = useState<Error>();
    const [data, setData] = useState<Result>();

    const runAsync = useCallback(
        async (...params: Parameters<typeof createPromise>) => {
            setLoading(true);
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
        },
        [createPromise]
    );

    useEffect(() => {
        if (isImmediate && !hasTriggeredImmediately) {
            setTriggeredImmediately(true);
            runAsync();
        }
    }, [isImmediate, hasTriggeredImmediately, runAsync]);

    return { isLoading, error, data, runAsync };
};
