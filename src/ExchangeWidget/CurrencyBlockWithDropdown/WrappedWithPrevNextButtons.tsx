import React from 'react';
import { Button } from '../Button';

export const WrappedWithPrevNextButtons = ({
    prev,
    next,
    children
}: {
    prev: () => void;
    next: () => void;
    children: React.ReactNode;
}) => {
    const onKeyDown = e => {
        switch (e.code) {
            case 'ArrowRight':
                next();
                break;
            case 'ArrowLeft':
                prev();
                break;
            default:
                break;
        }
    };

    return (
        <>
            <Button onClick={ next } onKeyDown={ onKeyDown }>
                {'‹'}
            </Button>
            {children}
            <Button onClick={ prev } onKeyDown={ onKeyDown }>
                {'›'}
            </Button>
        </>
    );
};
