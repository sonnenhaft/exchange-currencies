import React from 'react';
import styled from 'styled-components';

import { useNumberHash } from './useHash';
import { Logo } from './Logo';
import { Button } from './Button';

const AppStyles = styled.div`
    text-align: center;
    background-color: #282c34;
    min-height: 100vh;
    font-size: calc(10px + 2vmin);
    color: white;
    //color: #61dafb; // link color
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

export const App = () => {
    const [count, setCount] = useNumberHash('counter', 1);

    return (
        <AppStyles>
            <Button onClick={ () => setCount(count + 1) } as="a">
                Counter: { count }
            </Button>

            <Logo/>
        </AppStyles>
    );
};
