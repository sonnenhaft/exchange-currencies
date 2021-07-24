import styled from 'styled-components';
import { themes } from './utils';

export const RippleButton = styled.button`
    background-position: center;
    background-color: ${ ({ theme }) => theme.background };
    border: 1px solid ${ ({ theme }) => theme.text };
    border-radius: 4px;
    color: ${ ({ theme }) => theme.text };
    cursor: pointer;
    font-size: 40px;
    font-weight: bold;
    line-height: 40px;
    outline: none;
    padding: 7px 12px 10px 12px;
    transition: background 0.8s;

    &:hover:not([disabled]) {
        background: ${ ({ theme }) => theme.active }
            radial-gradient(circle, transparent 1%, ${ ({ theme }) => theme.background } 1%) center/20000%;
        box-shadow: 0 0 4px #999;
    }

    &:active {
        background-color: ${ ({ theme }) => theme.active };
        background-size: 100%;
        transition: background 0s;
    }

    &[disabled] {
        cursor: not-allowed;
        background: ${ ({ theme }) => theme.disabled };
        border-color: ${ ({ theme }) => theme.disabledText };
        color: ${ ({ theme }) => theme.disabledText };
    }
`;
// Material "ripple" button - https://codepen.io/finnhvman/pen/jLXKJw

export const NormalButton = styled(RippleButton)`
    font-size: 16px;
    font-weight: normal;
    line-height: 16px;
    padding: 8px 12px;
`;

NormalButton.defaultProps = RippleButton.defaultProps = {
    theme: themes.default
};
