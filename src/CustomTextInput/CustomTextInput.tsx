import React, { useEffect, useState } from 'react';
import cn from 'classnames';

import { areEqual, roundNumber, Setter } from 'utils';
import { pharseUserInput } from './pharseUserInput';
import { CustomTextInputStyles } from './CustomTextInput.styles';

export function getUpdatedValue(value: number, rate: number) {
    const num = value * rate;
    return pharseUserInput(roundNumber(num), num < 0);
}

interface CustomTextInputProps {
    rate?: number | null;
    value: number;
    setValue: Setter<number>;
    symbol: string;
}

export const CustomTextInput = React.memo((props: CustomTextInputProps) => {
    const { rate, value, setValue, symbol } = props;
    const [stringValue, setStringValue] = useState('');
    const [numberValue, setNumberValue] = useState(0);
    const onChange = (value: string) => {
        if (rate) {
            const [safeNumber, formattedString] = pharseUserInput(value);
            setStringValue(formattedString);
            const innerNumber = safeNumber / rate;
            setNumberValue(innerNumber);
            setValue(innerNumber);
        }
    };

    useEffect(() => {
        if (rate) {
            if (numberValue !== value) {
                const [safeNumber, formattedString] = getUpdatedValue(value, rate);
                setNumberValue(safeNumber);
                setStringValue(formattedString);
            }
        } else {
            setStringValue('Loading...  ');
        }
    }, [rate, value, numberValue]);

    const [focused, setFocused] = useState(false);
    return (
        // of course ideally on mobile here to have 'number' so proper keyboard selected
        // but to add "plus" in front, in browser, without playing with content editable
        // I chosen text input with custom validations
        <CustomTextInputStyles className={ cn('pseudo-input', { focused }) }>
            <div className="currency-near-input">{symbol}</div>

            <input
                type="text"
                inputMode="numeric"
                formNoValidate
                disabled={ !rate }
                onFocus={ () => setFocused(true) }
                onBlur={ () => setFocused(false) }
                value={ stringValue }
                onKeyDown={ e => {
                    // preventing non numeric keydown
                    if (!e.shiftKey && !e.ctrlKey && !e.altKey && !e.metaKey) {
                        if (e.key.length === 1 && !/^[0-9,.+-]{1,1}/.test(e.key)) {
                            e.preventDefault();
                        }
                    }
                } }
                onChange={ e => onChange(e.target.value) }
            />
        </CustomTextInputStyles>
    );
}, areEqual<CustomTextInputProps>(['value', 'rate', 'symbol']));
