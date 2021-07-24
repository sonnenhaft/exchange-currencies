import { CurrencyWithBalance } from './utils';

export const balanceAndRatesApi = {
    async fetchMyBalances(): Promise<Record<string, CurrencyWithBalance>> {
        await new Promise(s => setTimeout(s, 300)); // simulating delay

        const storedValue = localStorage.getItem('myBalances');
        if (storedValue) {
            return JSON.parse(localStorage.getItem('myBalances') as string);
        }

        const createBalance = () => Math.round(Math.random() * 100);
        return {
            PLN: { name: 'PLN', symbol: 'zł', balance: createBalance() },
            EUR: { name: 'EUR', symbol: '€', balance: createBalance() },
            USD: { name: 'USD', symbol: '$', balance: createBalance() }
        };
    },

    async fetchUSDBaseRates(useMock = false): Promise<{ rates: Record<string, number>; expiration: number }> {
        const TEN_MINUTES = 10 * 60 * 1000;
        if (useMock) {
            return { rates: { EUR: 0.85, PLN: 1 / 0.26, USD: 1 }, expiration: Date.now() + TEN_MINUTES };
        }
        // I know that it wont work in safari by default because of security policies
        const cacheValue = localStorage.getItem('fetchUSDBaseRates');
        if (cacheValue) {
            const valueWithExpiration = JSON.parse(cacheValue || '{}');
            if (valueWithExpiration && Date.now() < valueWithExpiration.expiration) {
                return valueWithExpiration;
            } else {
                localStorage.removeItem('fetchUSDBaseRates');
            }
        }

        const app_id = process.env.REACT_APP_OPENEXCHANGERATES_APP_ID;
        const completeUrl = `https://openexchangerates.org/api/latest.json?app_id=${ app_id }`;
        const {
            rates
        }: {
            disclaimer: string;
            license: string;
            timestamp: number;
            base: string;
            rates: Record<string, number>;
        } = await (await fetch(completeUrl)).json();

        const fullResult = { rates, expiration: Date.now() + TEN_MINUTES };
        localStorage.setItem('fetchUSDBaseRates', JSON.stringify(fullResult));
        return fullResult;
    }
};
