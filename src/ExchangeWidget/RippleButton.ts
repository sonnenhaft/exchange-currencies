import styled from 'styled-components';

// Material "ripple" button - https://codepen.io/finnhvman/pen/jLXKJw
export const RippleButton = styled.button`
    background-position: center;
    transition: background 0.8s;

    &:hover {
        background: #11387a radial-gradient(circle, transparent 1%, #2864d0 1%) center/70000%;
        box-shadow: 0 0 4px #999;
    }

    &:active {
        background-color: rgba(17, 56, 122, 0.84);
        background-size: 100%;
        transition: background 0s;
    }

    border: none;
    border-radius: 2px;
    padding: 7px 12px 4px 12px;
    line-height: 40px;
    font-size: 40px;
    font-weight: bold;
    text-transform: uppercase;
    cursor: pointer;
    color: white;
    background-color: #2864d0;
    outline: none;
`;

export const NormalButton = styled(RippleButton)`
    line-height: 16px;
    font-size: 16px;
    padding: 8px 12px;
    font-weight: normal;

    &:hover {
        background: #11387a radial-gradient(circle, transparent 1%, #2864d0 1%) center/15000%;
    }
`;
