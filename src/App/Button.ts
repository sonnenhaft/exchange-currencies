import styled from 'styled-components';

// Material "ripple" button - https://codepen.io/finnhvman/pen/jLXKJw
export const Button = styled.button`
    background-position: center;
    transition: background 0.8s;

    &:hover {
        background: #47a7f5 radial-gradient(circle, transparent 1%, #47a7f5 1%) center/15000%;
    }

    &:active {
        background-color: #6eb9f7;
        background-size: 100%;
        transition: background 0s;
    }

    border: none;
    border-radius: 2px;
    padding: 12px 18px;
    font-size: 16px;
    font-weight: bold;
    text-transform: uppercase;
    cursor: pointer;
    color: white;
    background-color: #2196f3;
    box-shadow: 0 0 4px #999;
    outline: none;
`;
