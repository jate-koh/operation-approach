import React from 'react';
// import { createRoot } from 'react-dom/client';
import { render } from 'react-dom';

import '@/assets/index.css';

import App from '@/App';

// React 17
const root = document.getElementById('app');
render(
    <App />,
    root
);


// React 18
/*
const node: HTMLElement | null = document.getElementById('app') || document.createElement('div');
const root = ReactDOM.createRoot(node);

const renderRoot = (Application: any): void => {
    root.render(
        <Application />
    );
};

renderRoot(App);
*/