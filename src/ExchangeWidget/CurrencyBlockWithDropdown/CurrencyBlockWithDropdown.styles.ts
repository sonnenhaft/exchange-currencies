import styled from 'styled-components';

export const CurrencyBlockWithDropdownStyles = styled.div`
    color: white;
    display: flex;
    height: 150px;
    background: linear-gradient(0deg, rgb(23 88 197) 0%, rgb(62 124 228) 100%);
    position: relative;
    align-items: center;

    .currency-near-input,
    select,
    input {
        border: 1px solid transparent;
        border-radius: 0;
        margin: 1px;
        background: none;
        color: white;
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

    .currency-near-input {
        //line-height: 130px;
    }
`;

export const YourBalanceBlock = styled.div`
    font-size: 16px;
    position: absolute;
    left: 57px;
    right: 64px;
    bottom: 20px;
    display: flex;
    justify-content: space-between;
`;
