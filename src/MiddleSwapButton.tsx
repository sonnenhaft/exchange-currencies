import React from 'react';
import styled from 'styled-components/macro';

import { RippleButton } from './RippleButton';
import { themes } from './utils';

const MiddleSwapButtonStyles = styled.div`
    text-align: center;

    & button {
        background: transparent;
        border: none;
        border-radius: 4px;
        padding: 4px 2px 0;
        position: absolute;
        margin-top: 2px;
        transform: translate(-50%, -50%);
        z-index: 1;

        & > svg > path {
            fill: ${ ({ theme }) => theme.text };
        }
    }
`;

MiddleSwapButtonStyles.defaultProps = {
    theme: themes.default
};

// https://www.iconfinder.com/icons/326707/swap_vert_icon
export const MiddleSwapButton = ({ onClick }: { onClick: () => void }) => (
    <MiddleSwapButtonStyles>
        <RippleButton onClick={ onClick }>
            <svg height="34" viewBox="0 0 14 18" width="34">
                <path
                    d="M11,14 L11,7 L9,7 L9,14 L6,14 L10,18 L14,14 L11,14 L11,14 Z M4,0 L0,4 L3,4 L3,11 L5,11 L5,4 L8,4 L4,0 L4,0 Z"
                    fill="#000000"
                    stroke="none"
                    strokeWidth="1"
                />
            </svg>
        </RippleButton>
    </MiddleSwapButtonStyles>
);
