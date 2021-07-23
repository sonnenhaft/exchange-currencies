import React, { useCallback, useEffect, useState } from 'react';
import { areEqual, roundNumber, Setter } from '../../utils';

interface CustomTextInputProps {
    rate?: number | null;
    value: number;
    setValue: Setter<number>;
}

function getSafeNumber(value: string): [number, string] {
    const isNegative = value.includes('-') && !value.endsWith('+');
    const noSignsStr = value.replace(/[+-]/g, '');
    // replace all dots except last https://stackoverflow.com/questions/9694930/remove-all-occurrences-except-last/28673744
    const singleOrNoDotsStr = noSignsStr.replace(/[.,](?=.*[.,])/g, '').replace(/[,]/g, '.');
    const withoutLeadingZeros = singleOrNoDotsStr.replace(/^0+/, '');
    return [
        Number.parseFloat(singleOrNoDotsStr.replace(/ /g, '') || '0') * (isNegative ? -1 : 1),
        `${ singleOrNoDotsStr ? (isNegative ? '-' : '+') : '' }${
            singleOrNoDotsStr.length === 1 ? singleOrNoDotsStr : withoutLeadingZeros
        }`
    ];
}

export const CustomTextInput = React.memo((props: CustomTextInputProps) => {
    const { rate, value, setValue } = props;
    const [stringValue, setStringValue] = useState('');
    const [numberValue, setNumberValue] = useState(0);
    const onChange = useCallback(
        (value: string) => {
            if (rate) {
                const [safeNumber, safeString] = getSafeNumber(value);
                setStringValue(safeString);
                const innerNumber = safeNumber * rate;
                setNumberValue(innerNumber);
                setValue(innerNumber);
            }
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [rate]
    );

    useEffect(() => {
        if (rate) {
            if (numberValue !== value) {
                const [num, str] = getSafeNumber(roundNumber(value / rate));
                setNumberValue(num);
                setStringValue(str);
            }
        } else {
            setStringValue('Loading...  ');
        }
    }, [rate, value, numberValue]);

    return (
        // of course ideally on mobile here to have 'number' so proper keyboard selected
        // but to add "plus" in front, in browser, without playing with content editable
        // I chosen text input with custom validations
        <input
            type="text"
            disabled={ !rate }
            value={ stringValue }
            onKeyDown={ e => {
                // preventing non numeric keydown
                if (!e.shiftKey && !e.ctrlKey && !e.altKey && !e.metaKey) {
                    if (e.key.length === 1 && !/^[0-9,.+\- ]{1,1}/.test(e.key)) {
                        e.preventDefault();
                    }
                }
            } }
            onChange={ e => onChange(e.target.value) }
        />
    );
}, areEqual(['value', 'rate']));
