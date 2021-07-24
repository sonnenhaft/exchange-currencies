import React from 'react';

import { RippleButton } from 'RippleButton';

interface WrappedWithPrevNextButtonsProps {
    prev: () => void;
    next: () => void;
    children: React.ReactNode;
    visible: boolean;
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

    const visibility = props.visible ? 'visible' : 'hidden';
    return (
        <>
            <RippleButton onClick={ next } onKeyDown={ onKeyDown } style={ { visibility } }>
                {'‹'}
            </RippleButton>
            {children}
            <RippleButton onClick={ prev } onKeyDown={ onKeyDown } style={ { visibility } }>
                {'›'}
            </RippleButton>
        </>
    );
};
