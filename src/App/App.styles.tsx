import styled, { createGlobalStyle } from 'styled-components';
import { Theme, themes } from 'utils';

export const GlobalStyle = createGlobalStyle`
  body {
    background: ${ ({ theme }: { theme: Theme }) => theme.active };
  }
  select {
    margin: 0;
  }
`;

GlobalStyle.defaultProps = {
    theme: themes.default
};

export const AppStyles = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    color: ${ ({ theme }) => theme.text };
    max-width: 600px;
    position: relative;
    margin: auto;
    padding: 0 8px;
`;

AppStyles.defaultProps = {
    theme: themes.default
};

export const AbsoluteRight = styled.div`
    display: flex;
    justify-content: flex-end;
    padding: 8px;
    margin-top: -2px;

    > button {
        margin-left: 16px;
    }
`;
