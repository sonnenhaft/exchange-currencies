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
    align-items: center;
    color: ${ ({ theme }) => theme.text };
    display: flex;
    flex-direction: column;
    margin: auto;
    max-width: 600px;
    padding: 0 8px;
    position: relative;
    height: 100vh;
`;

AppStyles.defaultProps = {
    theme: themes.default
};

export const ThemeSwitchWrapper = styled.div`
    display: flex;
    justify-content: flex-end;
    margin-top: -2px;
    padding: 8px;
    margin-bottom: 40px;

    > button {
        margin-left: 16px;
    }
`;
