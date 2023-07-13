// Dependencies Imports
import { useEffect, useState } from 'react';
import { Responsive, WidthProvider, Layout } from 'react-grid-layout';

// Files Imports
import { OperationFlowProps, OperationLines } from './utils/types/Props';
import { FlowHead } from '../operation-flow-demo/FlowHead';
import { FlowTail } from '../operation-flow-demo/FlowTail';
import { lineIsInvis, matchInternalShape } from './utils/Styling';
import { joinClassNames } from './utils/String';

// CSS Imports
import './css/index.css';

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

export function OperationFlow({ headText, tailText, operationLines }: OperationFlowProps, debugMode: boolean = false) {
    //=======================================================================================================
    // React Hooks
    const [flowState, setFlowState] = useState<FlowState>({
        headText: headText,
        tailText: tailText,
        operationLines: operationLines
    });

    const [gridState, setGridState] = useState<GridState>({
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
    // Render

    return (
        <div className='graph-container'>
            {/* Graph Head Node */}
            <div className='graph-start-node'>
                <FlowHead {...{text: headText}} />
            </div>

            {/* Graph Middle Line */}
            <div className='graph-line bg-white' />

            {/* Graph Body */}
            <div className='graph-body'>
                <h1 className='text-red-500'>HI</h1>
                {/* Cols Extender */}
                <div className='col-ext-wrapper'>
                    <div className='col-ext-hovzone'>
                        <div className='col-extender bg-red-500'>
                            <button className='add-button bg-red-500'>
                                <h1 className='text-black'>+</h1>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Graph Tail Node */}
            <div className='graph-end-node'>
                <FlowTail {...{text: tailText}} />
            </div>
        </div>
    );
}