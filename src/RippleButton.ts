import styled from 'styled-components/macro';

// Material "ripple" button - https://codepen.io/finnhvman/pen/jLXKJw
export const RippleButton = styled.button`
    background-position: center;
    background-color: ${ ({ theme }) => theme.background };
    font-size: 40px;
    font-weight: bold;
    line-height: 40px;
    outline: none;
    padding: 7px 12px 10px 12px;
    transition: background 0.8s;

    &:hover {
        background: ${ ({ theme }) => theme.active }
            radial-gradient(circle, transparent 1%, ${ ({ theme }) => theme.background } 1%) center/70000%;
    }

    &:active {
        background-color: ${ ({ theme }) => theme.active };
        background-size: 100%;
        transition: background 0s;
    }
`;

export const NormalButton = styled(RippleButton)`
    font-size: 16px;
    font-weight: normal;
    line-height: 16px;
    padding: 8px 12px;
`;
