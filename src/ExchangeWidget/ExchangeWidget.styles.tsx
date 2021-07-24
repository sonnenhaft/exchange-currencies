import styled from 'styled-components';
import { themes } from '../utils';

export const CurrencyBlock = styled.div`
    display: flex;
    flex-direction: column;
    position: relative;
`;

export const Centered = styled.div`
    display: flex;
    justify-content: center;

    & > button {
        min-width: 50%;
    }
`;

export const ExchangeWidgetStyles = styled.div`
    border: 1px solid ${ ({ theme }) => theme.lightBorder };
    border-radius: 4px;
    margin: 8px 0;
`;

ExchangeWidgetStyles.defaultProps = {
    theme: themes.default
};
