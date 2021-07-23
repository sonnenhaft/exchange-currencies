import { Button } from './Button';
import React from 'react';
import styled from 'styled-components';

const ExchangeMiddleButtonStyles = styled.div`
    width: 100%;
    text-align: center;

    & button {
        z-index: 1;
        position: absolute;
        background: none;
        transform: translate(0, -50%);
    }
`;

export const ExchangeMiddleButton = ({ onClick }: { onClick: () => void }) => (
    <ExchangeMiddleButtonStyles>
        <Button onClick={ onClick }>⇵</Button>
    </ExchangeMiddleButtonStyles>
);
