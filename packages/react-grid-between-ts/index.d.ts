/* eslint-disable no-redeclare */

import * as React from 'react';

export as namespace ReactGridLayoutBetween;
export = ReactGridLayoutBetween;

declare class ReactGridLayoutBetween extends React.Component<ReactGridLayoutBetween.ReactGridLayoutBetweenProps> {}

declare namespace ReactGridLayoutBetween {
    interface ReactGridLayoutBetweenProps {
        compactType?: 'horizontal' | 'vertical' | null;
        layout?: Layout;
        onLayoutChange?: (layout: Layout) => void;
    }

    interface Layout {
        containerWidth: number;
        containerHeight: number;
        calWidth: number;
        rowHeight: number;
        col: number;
        margin: [number, number];
        containerPadding: [number, number];
    }
}
