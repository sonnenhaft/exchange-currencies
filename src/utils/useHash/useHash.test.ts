import { fireEvent } from '@testing-library/react';
import { renderHook, act } from '@testing-library/react-hooks';

import { useNumberHash } from './useHash';

describe('useHash', function () {
    test('init properly with default value', () => {
        const INIT_DEFAULT_VAL = 22;
        const { result: r } = renderHook(() => useNumberHash('test', INIT_DEFAULT_VAL));
        expect(r.current[0]).toBe(INIT_DEFAULT_VAL);

        const NEXT_VAL = 33;
        act(() => r.current[1](NEXT_VAL));
        expect(r.current[0]).toBe(NEXT_VAL);
    });

    test('Invalid number should degrade to default value', () => {
        const INIT_DEFAULT_VAL = 22;
        const { result: r } = renderHook(() => useNumberHash('test', INIT_DEFAULT_VAL));
        act(() => r.current[1]('abd' as unknown as number)); // for test purposes
        expect(r.current[0]).toBe(INIT_DEFAULT_VAL);
    });

    test('Should take data from hash if hash changed', () => {
        const INIT_DEFAULT_VAL = 22;
        const { result: r } = renderHook(() => useNumberHash('test', INIT_DEFAULT_VAL));
        expect(r.current[0]).toBe(INIT_DEFAULT_VAL);

        const HASH_VALUE = 99;
        window.location.hash = `?test=${ HASH_VALUE }`;

        act(() => {
            fireEvent(window, new CustomEvent('hashchange'));
        });
        expect(r.current[0]).toBe(HASH_VALUE);
    });
});
