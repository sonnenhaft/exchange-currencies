import styled from 'styled-components';
import { themes } from '../../utils';

export const CurrencyBlockWithDropdownStyles = styled.div`
    display: flex;
    height: 150px;
    background: linear-gradient(0deg, ${ ({ theme }) => theme.active } 0%, ${ ({ theme }) => theme.background } 100%);
    position: relative;
    align-items: center;

    .currency-near-input,
    select,
    input {
        border: 1px solid transparent;
        border-radius: 0;
        margin: 1px;
        background: none;
        color: ${ ({ theme }) => theme.text };
        font-size: 35px;
        padding: 8px;

        &:focus {
            border-color: white;
        }
    }

    input {
        text-align: right;
        width: 100%;
    }

    select {
        cursor: pointer;
        margin: 0 8px !important;
    }

    select,
    .currency-near-input {
        width: 150px;
    }
`;

CurrencyBlockWithDropdownStyles.defaultProps = {
    theme: themes.default
};

export const YourBalanceBlock = styled.div`
    font-size: 16px;
    position: absolute;
    left: 57px;
    right: 64px;
    bottom: 20px;
    display: flex;
    justify-content: space-between;
`;
