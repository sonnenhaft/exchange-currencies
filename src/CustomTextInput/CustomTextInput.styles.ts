import styled from 'styled-components';
import { themes } from '../utils';

export const CustomTextInputStyles = styled.div`
    margin-right: 12px;
    border: 1px solid ${ ({ theme }) => theme.lightBorder };
    display: flex;
    width: 100%;

    .currency-near-input {
        color: ${ ({ theme }) => theme.lightBorder };
    }

    &.focused {
        border: 1px solid ${ ({ theme }) => theme.text };

        .currency-near-input {
            color: ${ ({ theme }) => theme.text };
        }
    }

    input {
        border-radius: 4px;
        text-align: right;
        width: 100%;
        display: block;

        &:focus {
            outline: none;
            border-color: transparent;
        }
    }
`;

CustomTextInputStyles.defaultProps = {
    theme: themes.default
};
