import { Currency } from './utils';

const inMemoryCache = new Map<string, { result: any; expiration: number }>();
const CACHE_EXPIRATION = 10 * 60 * 1000;
const memoize = async <T>(key: string, fn: () => Promise<T>): Promise<T> => {
    if (inMemoryCache.has(key)) {
        const value = inMemoryCache.get(key);
        if (value && Date.now() < value.expiration) {
            return value.result;
        }
        inMemoryCache.delete(key);
    }
    const result = await fn();
    inMemoryCache.set(key, { result, expiration: Date.now() + CACHE_EXPIRATION });
    return result;
};

const getJson = async <T>(url: string): Promise<T> => {
    const amp = url.includes('?') ? '&' : '?';
    const apiKey = process.env.REACT_APP_FREE_CURRCONV_API_KEY;
    const host = `${ window.location.protocol }//free.currconv.com`;
    const completeUrl = `${ host }${ url }${ amp }apiKey=${ apiKey }`;
    return memoize(completeUrl, async () => (await fetch(completeUrl)).json());
};

const mockData: Record<string, [string, string, Record<string, number>]> = {
    SGD: ['Singapore dollar', '$S', { MYR: 3.11, USD: 0.74 }],
    MYR: ['Malaysian Ringgit', 'RM', { SGD: 1 / 3.11, USD: 0.24 }],
    USD: ['United States Dollar', '$', { MYR: 1 / 0.24, SGD: 1 / 0.74 }]
};

const mockedCurrencies: Record<string, number> = Object.fromEntries(
    Object.entries(mockData)
        .map(([from, [, , toMap]]) => {
            return Object.entries(toMap).map(([to, rate]) => [`${ from }_${ to }`, rate]);
        })
        .flat()
);

const allCurrencies: Currency[] = Object.entries(mockData).map(([id, [currencyName, currencySymbol]]) => ({
    id,
    currencySymbol,
    currencyName
}));

const pause = (timeout: number) => new Promise(s => setTimeout(s, timeout));

export const freeCurrconvApi = {
    CACHE_EXPIRATION,

    flushCache() {
        inMemoryCache.clear();
    },

    async getExactChangeRate(currencyFrom: string, currencyTo: string, useMock = false): Promise<number> {
        const currenciesKey = `${ currencyFrom }_${ currencyTo }`;

        return memoize(currenciesKey + useMock, async () => {
            if (useMock) {
                await pause(1000);
                return mockedCurrencies[currenciesKey];
            } else {
                // like {"USD_PHP":51.176979}
                const data = await getJson<Record<string, number>>(`/api/v7/convert?compact=ultra&q=${ currenciesKey }`);
                return data[currenciesKey];
            }
        });
    },

    async getAllRates(currencyFrom: string, useMock = false): Promise<Record<string, number>> {
        return memoize(currencyFrom + useMock, async () => {
            await pause(3000);
            return Object.fromEntries(
                Object.entries(mockedCurrencies)
                    .filter(([key]) => key.startsWith(currencyFrom))
                    .map(([key, val]) => [key.split('_')[1], val])
            );
        });
    },

    async getMyBalances(useMock = false): Promise<Record<string, number>> {
        await pause(300);
        return Object.fromEntries(Object.keys(mockData).map(currency => [currency, Math.round(Math.random() * 100)]));
    },

    async getCurrencies(useMock = false): Promise<Currency[]> {
        if (useMock) {
            await pause(300);
            return Object.values(allCurrencies);
        } else {
            const { results } = await getJson<{ results: Record<string, Currency> }>(`/api/v7/currencies`);
            return Object.values(results);
        }
    }
};

export const test = async () => {
    console.log(await Promise.all([freeCurrconvApi.getExactChangeRate('USD', 'PHP'), freeCurrconvApi.getCurrencies()]));
};
