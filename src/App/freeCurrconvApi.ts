const getJson = async <T>(url: string): Promise<T> => {
    const amp = url.includes('?') ? '&' : '?';
    const apiKey = process.env.REACT_APP_FREE_CURRCONV_API_KEY;
    const host = `${ window.location.protocol }//free.currconv.com`;
    return await (await fetch(`${ host }${ url }${ amp }apiKey=${ apiKey }`)).json();
};

type Currencies = Record<
    string,
    {
        id: string; // like EUR
        currencyName: string; // like 'Japanese Yen'
        currencySymbol?: string; // like '$'
    }
>;

export const freeCurrconvApi = {
    async getCurrency(currencyFrom: string, currencyTo: string): Promise<number> {
        const currenciesKey = `${ currencyFrom }_${ currencyTo }`;
        // like {"USD_PHP":51.176979}
        const data = await getJson<Record<string, number>>(`/api/v7/convert?compact=ultra&q=${ currenciesKey }`);
        // const data = { [currenciesKey]: 51.176979 };
        return data[currenciesKey];
    },

    async getCurrencies(): Promise<Currencies> {
        return (await getJson<{ results: Currencies }>(`/api/v7/currencies`)).results;
    }
};

export const test = async () => {
    console.log(await Promise.all([freeCurrconvApi.getCurrency('USD', 'PHP'), freeCurrconvApi.getCurrencies()]));
};
