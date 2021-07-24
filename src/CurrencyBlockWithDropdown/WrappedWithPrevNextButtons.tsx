import React from 'react';

import { RippleButton } from 'RippleButton';

interface WrappedWithPrevNextButtonsProps {
    prev: () => void;
    next: () => void;
    children: React.ReactNode;
}

export const WrappedWithPrevNextButtons = (props: WrappedWithPrevNextButtonsProps) => {
    const { prev, next, children } = props;
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
