// Dependencies Imports
import React, { useEffect, useState } from 'react';
import RGL, { WidthProvider, Layout } from 'react-grid-layout';

// Files Imports
import { FlowHead } from '../operation-flow-demo/FlowHead';
import { FlowTail } from '../operation-flow-demo/FlowTail';

import { OperationFlowProps, OperationLines } from './utils/types/Props';
import { RowMap, ColumnMap } from './utils/types/UtilsProps';

import { createLayout, createPlaceholderLayout, prepLines, reorderMiddleLines } from './utils/LineUtils';
import { getJSON, findMaxSequence, findMinSequence } from './utils/BaseUtils';
import { checkColsUsage, checkRowUsage, populateMiddle, cutUnusedRow, recreatePlaceholderLayout} from './utils/LayoutUtils';

import { matchInternalShape } from './utils/Styling';
import { joinClassNames } from './utils/String';

// CSS Imports
import './css/index.css';

// Constants and Types
const GridLayout = WidthProvider(RGL);

type FlowState = {
    headText: string;
    tailText: string;
    operationLines: OperationLines;
}

type GridState = {
    valueLayout?: Layout[] | undefined;
    placeholderLayout?: Layout[] | undefined;
    currentCols: number; // Lengths
    currentRows: number; // Number of Lines
    middleRow: number;
    RowMapping?: RowMap | undefined;
    ColumnMapping?: ColumnMap | undefined;
};

type DragState = {
    dragging: boolean;
    draggingItem?: Layout | undefined;
};

export function OperationFlow({ headText, tailText, operationLines }: OperationFlowProps, debugMode: boolean = false) {
    //=======================================================================================================
    // React Hooks
    const [flowState, setFlowState] = useState<FlowState>({
        headText: '',
        tailText: '',
        operationLines: [],
    });

    const [gridState, setGridState] = useState<GridState>({
        currentCols: 0,
        currentRows: 0,
        middleRow: 0,
    });

    const [dragState, setDragState] = useState<DragState>({
        dragging: false,
        draggingItem: undefined,
    });

    // Run on Init
    useEffect(() => {
        // Init Flow State
        setFlowState({
            headText: headText,
            tailText: tailText,
            operationLines: reorderMiddleLines(prepLines(operationLines)),
        });

        // Init Grid State
        setGridState({
            valueLayout: createLayout(operationLines),
            placeholderLayout: createPlaceholderLayout(operationLines),
            currentCols: findMaxSequence(operationLines) - findMinSequence(operationLines) + 1,
            currentRows: operationLines.length,
            middleRow: Math.floor(operationLines.length / 2),
        });
    }, []);

    // Run on Update
    useEffect(() => {
        console.log('Flow State: ', flowState);
    }, [flowState]);
    useEffect(() => {
        console.log('Grid State: ', gridState);
    }, [gridState]);
    //=======================================================================================================
    // Action Handler
    const onDragStart = (layout: Layout[], oldItem: Layout, newItem: Layout) => {
        setDragState({
            ...dragState,
            dragging: true,
            draggingItem: newItem,
        });
        console.log('X', newItem.x, 'Y', newItem.y);
    };

    const onDragStop = (layout: Layout[], oldItem: Layout, newItem: Layout) => {
        setDragState({
            ...dragState,
            dragging: false,
            draggingItem: undefined,
        });
        // console.log('New Layout: ', layout);
        // console.log('Col Map', checkColsUsage(layout), '\nRow Map', checkRowUsage(layout));

        /** Rows Sorting
         *  Sort based on Y-axis with the information from Row Map
         *  1. Check if there is any unused (empty) row: if yes, cut it by swapping it with the last row
         *  2. Attempt to populate the row in the middle of the grid
         *      2.1 Make sure that middle is row is the most populated row: if not, swap it with the most populated row
         *      2.2 Split grid into 2 parts: top and bottom. Sort top in ascending order, while sort bottom in descending order.
         */
        // Cut unused row
        let rows: number = 0;
        [layout, rows] = cutUnusedRow(layout);
        console.log('Rows: ', rows, '\nLayout: ', layout);

        // Populate middle row
        layout = populateMiddle(layout, Math.floor(rows / 2));
        

        /** Cols Sorting
         * 
         * 
        */
        // TODO: Use Col Map to sort the cols


        // Recreate Placeholder Layout
        let placeholderLayout: Layout[] = recreatePlaceholderLayout(rows, gridState.currentCols);

        // Update Grid State
        setGridState({
            ...gridState,
            valueLayout: layout,
            placeholderLayout: placeholderLayout,
            currentRows: rows,
            middleRow: Math.floor(rows / 2),
        });
    };
    //=======================================================================================================
    // Render

    return (
        <div className='graph-container h-[800px]'>
            {/* Graph Head Node */}
            <div className='graph-start-node'>
                <FlowHead {...{text: headText}} />
            </div>

            {/* Graph Middle Line */}
            <div className='graph-line bg-white' />

            {/* Graph Body */}
            <div className='graph-body'>
                <div className='grid-body'>
                    {/* Value Grid */}
                    <div className='grid-container'>
                        <GridLayout
                            onDrag={(layout, oldItem, newItem) => {
                                onDragStart(layout, oldItem, newItem);
                            }}
                            onDragStop={(layout, oldItem, newItem) => {
                                onDragStop(layout, oldItem, newItem);
                            }}
                            onDrop={(layout, item) => {
                                console.log('on Drop Col 1: ', layout, item);
                            }}
                            isDroppable={true} isDraggable={true}
                            cols={gridState.currentCols} maxRows={gridState.currentRows} rowHeight={50} draggableHandle='.drag-handle' 
                            compactType={null} useCSSTransforms={true}
                            style={{
                                position: 'absolute',
                                top: '50%',
                                transform: gridState.currentRows % 2 === 0 ? 'translateY(-153px)' : 'translateY(-50%)',
                            }} 
                        >
                            {
                                gridState.valueLayout?.map((item, index) => { 
                                    return (
                                        <div key={`${item.i}`}
                                            draggable={true}
                                            data-grid={{
                                                x: item.x,
                                                y: item.y,
                                                w: item.w,
                                                h: item.h,
                                                i: item.i,
                                            }}
                                            className={joinClassNames(
                                                'drag-handle'
                                            )}
                                        >
                                            <div className={
                                                joinClassNames(
                                                    getJSON(flowState.operationLines, item.i) === undefined ? '' : matchInternalShape(getJSON(flowState.operationLines, item.i), 'md'),
                                                )
                                            }>
                                                <h1>
                                                    {item.i}
                                                </h1>
                                            </div>
                                        </div>
                                    );
                                })
                            }
                        </GridLayout>
                    </div>

                    {/* Placeholder Grid */}
                    <div className='grid-placeholder-container'>
                        <GridLayout
                            onDrag={(layout, oldItem, newItem) => {}}
                            onDragStop={(layout, oldItem, newItem) => {}}
                            onDrop={(layout, item, event) => {
                                console.log('On Drop 2:');
                            }}
                            cols={gridState.currentCols} rowHeight={50} maxRows={gridState.currentRows} 
                            isDroppable={true} draggableHandle='.drag-handle'
                            compactType={'vertical'}
                            style={{
                                position: 'absolute',
                                top: '50%',
                                transform: gridState.currentRows % 2 === 0 ? 'translateY(-153px)' : 'translateY(-50%)',
                            }}
                        >
                            {
                                gridState.placeholderLayout?.map((item, index) => {
                                    return (
                                        <div key={item.i}
                                            draggable={true}
                                            data-grid={{
                                                x: item.x,
                                                y: item.y,
                                                w: item.w,
                                                h: item.h,
                                                i: item.i,
                                                id: 'test',
                                            }}
                                            className={joinClassNames(
                                                'drag-handle'
                                            )}
                                        >
                                            <div className={
                                                joinClassNames(
                                                    !dragState.dragging ? '' : 
                                                        dragState.draggingItem && (dragState.draggingItem.x === item.x && dragState.draggingItem.y) === item.y ? 
                                                            matchInternalShape('placeholder', 'md') : ''
                                                )
                                            }>
                                            </div>
                                        </div>
                                    );
                                })
                            }
                        </GridLayout>
                    </div>
                </div>
                {/* Cols Extender */}
                <div className='col-ext-wrapper'>
                    <div className='col-ext-hovzone'>
                        <div className='col-extender bg-red-500'>
                            <button 
                                onClick={() => {
                                    console.log('Add Col');
                                }}
                                className='add-button bg-red-500'>
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

export default OperationFlow;