import styled from 'styled-components/macro';
import { themes } from '../utils';

export const CustomTextInputStyles = styled.div`
    border: 1px solid ${ ({ theme }) => theme.lightBorder };
    border-radius: 4px;
    display: flex;
    margin-right: 8px;
    align-items: center;
    width: 100%;

    &.focused {
        border: 1px solid ${ ({ theme }) => theme.text };

        .currency-near-input {
            color: ${ ({ theme }) => theme.text };
        }
    }

    .currency-near-input {
        font-size: 30px;
        padding: 8px;
        color: ${ ({ theme }) => theme.lightBorder };
    }

    input {
        background: none;
        border-color: transparent;
        color: ${ ({ theme }) => theme.text };
        display: block;
        font-size: 35px;
        text-align: right;
        width: 100%;
        padding: 6px 4px 6px 0;

        &:focus {
            border-color: transparent;
            outline: none;
        }
    }
`;

CustomTextInputStyles.defaultProps = {
    theme: themes.default
};
