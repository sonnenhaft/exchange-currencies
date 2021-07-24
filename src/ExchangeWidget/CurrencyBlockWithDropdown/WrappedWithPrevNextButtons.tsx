import React from 'react';

import { RippleButton } from 'ExchangeWidget/RippleButton';

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
            <RippleButton onClick={ next } onKeyDown={ onKeyDown }>
                {'‹'}
            </RippleButton>
            {children}
            <RippleButton onClick={ prev } onKeyDown={ onKeyDown }>
                {'›'}
            </RippleButton>
        </>
    );
};
