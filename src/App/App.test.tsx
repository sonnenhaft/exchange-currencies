import React from 'react';
import { prettyDOM, render, screen } from '@testing-library/react';

import { App } from './App';

const isDebug = false;

test('renders learn react link', () => {
    const dom = render(<App />);
    if (isDebug) {
        console.log(prettyDOM(dom.container.firstChild as any));
    }

    expect(screen.getByText(/loading/i)).toBeInTheDocument();
});
