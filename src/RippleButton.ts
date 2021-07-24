import styled from 'styled-components';
import { themes } from './utils';

// Material "ripple" button - https://codepen.io/finnhvman/pen/jLXKJw
export const RippleButton = styled.button`
    background-position: center;
    transition: background 0.8s;

    &:hover {
        background: ${ ({ theme }) => theme.active }
            radial-gradient(circle, transparent 1%, ${ ({ theme }) => theme.background } 1%) center/70000%;
        box-shadow: 0 0 4px #999;
    }

    &:active {
        background-color: ${ ({ theme }) => theme.active };
        background-size: 100%;
        transition: background 0s;
    }

    &[disabled] {
        opacity: 0.3;
        cursor: not-allowed;
    }

    padding: 7px 12px 10px 12px;
    line-height: 40px;
    font-size: 40px;
    font-weight: bold;
    cursor: pointer;
    outline: none;

    border: 1px solid ${ ({ theme }) => theme.text };
    border-radius: 4px;
    background-color: ${ ({ theme }) => theme.background };
    color: ${ ({ theme }) => theme.text };
`;

export const NormalButton = styled(RippleButton)`
    line-height: 16px;
    font-size: 16px;
    padding: 8px 12px;
    font-weight: normal;

    &:hover {
        background: ${ ({ theme }) => theme.active }
            radial-gradient(circle, transparent 1%, ${ ({ theme }) => theme.background } 1%) center/15000%;
    }
`;

NormalButton.defaultProps = RippleButton.defaultProps = {
    theme: themes.default
};
