import React from 'react';
import { createRoot } from 'react-dom/client';

import '@/assets/index.css';

import App from '@/App';

const node: HTMLElement | null = document.getElementById('app') || document.createElement('div');
const root = createRoot(node);

const renderRoot = (Application: any): void => {
    root.render(
        <Application />
    );
};

renderRoot(App);