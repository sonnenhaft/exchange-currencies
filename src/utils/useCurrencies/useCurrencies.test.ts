import { renderHook, act } from '@testing-library/react-hooks';

import { useCurrencies } from './useCurrencies';

describe('useCurrencies', function () {
    test('init properly with default value', () => {
        const { result } = renderHook(() => useCurrencies('currencies', 'USD_EUR'));
        const { onCurrenciesChanged, ...rest } = result.current;
        expect(rest).toEqual({ from: 'USD', to: 'EUR' });
    });

    test('it should set hash properly', () => {
        const initValue = 'USD_EUR';
        const { result } = renderHook(() => useCurrencies('currencies', initValue));
        expect(window.location.hash.endsWith(initValue)).not.toBe(true);

        const NEW_FROM = 'USD';
        const NEW_TO = 'SGD';
        act(() => {
            result.current.onCurrenciesChanged({ from: NEW_FROM, to: NEW_TO });
        });
        expect(window.location.hash.endsWith(initValue)).not.toBe(true);
        expect(window.location.hash.endsWith(`${ NEW_FROM }_${ NEW_TO }`)).toBe(true);
        expect(result.current.to).toBe(NEW_TO);
        expect(result.current.from).toBe(NEW_FROM);
    });
});
