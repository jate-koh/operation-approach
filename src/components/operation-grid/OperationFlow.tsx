// Dependencies Imports
import { useEffect, useState } from 'react';
import { Responsive, WidthProvider, Layout } from 'react-grid-layout';

// Files Imports
import { OperationFlowProps, OperationLines } from './utils/types/Props';
import { lineIsInvis, matchInternalShape } from './utils/Styling';
import { joinClassNames } from './utils/String';

// Constants and Types
const ResponsiveGridLayout = WidthProvider(Responsive);

type FlowState = {
    headText: string;
    tailText: string;
    operationLines: OperationLines;
}

type GridState = {
    dragging: boolean;
    draggingItem?: Layout | undefined;
    currentCols: number; // Lengths
    currentRows: number; // Number of Lines
    currentLayout: Layout[];
};

export function OperationFlow({ headText, tailText, operationLines }: OperationFlowProps) {
    //=======================================================================================================
    // React Hooks
    const [flowState, setFlow] = useState<FlowState>({
        headText: headText,
        tailText: tailText,
        operationLines: operationLines
    });

    const [gridState, setGrid] = useState<GridState>({
        dragging: false,
        currentCols: 0,
        currentRows: 0,
        currentLayout: []
    });

    useEffect(() => {
        console.log('Flow State: ', flowState);
        console.log('Grid State: ', gridState);

    }, [flowState, gridState]);
    //=======================================================================================================
}