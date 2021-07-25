import styled, { createGlobalStyle } from 'styled-components/macro';
import { Theme, themes } from 'utils';

export const GlobalStyle = createGlobalStyle`
  body {
    background: ${ ({ theme }: { theme: Theme }) => theme.active };
    color: ${ ({ theme }) => theme.text };
  }

  select {
    margin: 0;
  }

  .pseudo-input,
  select,
  button {
    border-radius: 4px;
    border: 1px solid ${ ({ theme }) => theme.lightBorder };
    color: ${ ({ theme }) => theme.text };
    cursor: pointer;

    &:hover, &:focus, &.focused {
      &:not([disabled]) {
        box-shadow: 0 0 4px #999;
        border-color: ${ ({ theme }) => theme.text };
        outline: none;  
      }
    }

    &[disabled] {
      cursor: not-allowed;
      background: ${ ({ theme }) => theme.disabled };
      border-color: ${ ({ theme }) => theme.disabledText };
      color: ${ ({ theme }) => theme.disabledText };
    }
  }
`;

GlobalStyle.defaultProps = {
    theme: themes.default
};

export const AppStyles = styled.div`
    align-items: center;
    display: flex;
    flex-direction: column;
    margin: auto;
    max-width: 600px;
    padding: 0 8px;
    position: relative;
    height: 100vh;
`;

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
