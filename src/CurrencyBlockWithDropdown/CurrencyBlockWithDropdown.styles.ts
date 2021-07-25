import styled from 'styled-components/macro';
import { themes } from '../utils';

export const CurrencyBlockWithDropdownStyles = styled.div`
    align-items: center;
    display: flex;
    height: 150px;
    padding: 0 8px;
    position: relative;
    background: linear-gradient(0deg, ${ ({ theme }) => theme.active } 0%, ${ ({ theme }) => theme.background } 100%);

    select {
        height: 60px;
        background: none;
        width: 150px;
        font-size: 35px;
        margin: 0 8px;
        padding: 8px 0;
    }
`;

CurrencyBlockWithDropdownStyles.defaultProps = {
    theme: themes.default
};

export const YourBalanceBlock = styled.div`
    display: flex;
    font-size: 16px;
    justify-content: space-between;
    position: absolute;
    left: 57px;
    bottom: 20px;
    right: 64px;
`;
