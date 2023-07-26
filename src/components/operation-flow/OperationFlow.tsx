// Dependencies Imports
import React, { useEffect, useState } from 'react';
import RGL, { WidthProvider, Layout } from 'react-grid-layout';

// Files Imports
import { FlowHead } from '../operation-flow-demo/FlowHead';
import { FlowTail } from '../operation-flow-demo/FlowTail';

import { ColumnRegionConfigs, OperationFlowProps, OperationLines } from './utils/types/Props';
import { RowMap, ColumnMap } from './utils/types/UtilsProps';

import { createLayout, createPlaceholderLayout, prepLines, reorderMiddleLines } from './utils/LineUtils';
import { getJSON, findMaxSequence, findMinSequence } from './utils/BaseUtils';
import { populateMiddle, cutUnusedRow, recreatePlaceholderLayout} from './utils/LayoutUtils';

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
    regionConfigs?: ColumnRegionConfigs | undefined;
}

type RegionState = {
    regionConfigs: ColumnRegionConfigs;
    gridState: GridState;
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

export function OperationFlow({ headText, tailText, operationLines }: OperationFlowProps, regionConfigs: ColumnRegionConfigs, debugMode: boolean = false) {
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

    // Run on Initialization
    useEffect(() => {
        // Initialize Flow State
        setFlowState({
            headText: headText,
            tailText: tailText,
            operationLines: reorderMiddleLines(prepLines(operationLines)),
        });

        // Initialize Grid State
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

        // TODO: Add update when rows increase
        // Recreate Placeholder Layout
        let placeholderLayout: Layout[] = recreatePlaceholderLayout(gridState.currentRows, gridState.currentCols);

        // Update Grid State
        setGridState({
            ...gridState,
            valueLayout: layout,
            placeholderLayout: placeholderLayout,
        });
    };
    //=======================================================================================================
    // Render

    const defaultGridProps = {
        onDragStart: (layout: Layout[], oldItem: Layout, newItem: Layout) => {
            onDragStart(layout, oldItem, newItem);
        },
        onDrag: (layout: Layout[], oldItem: Layout, newItem: Layout) => {
            console.log('Dragging:', newItem);
        },
        onDragStop: (layout: Layout[], oldItem: Layout, newItem: Layout) => {
            onDragStop(layout, oldItem, newItem);
        },
        onDrop: (layout: Layout[], item: Layout, event: MouseEvent) => {
            console.log('Dropped:', item, '\nat', event.clientX, event.clientY);
        },
        isResizable: true, isDroppable: true, isDraggable: true, 
        cols: gridState.currentCols, maxRows: gridState.currentRows, 
        rowHeight: 50, draggableHandle: '.drag-handle',
    };

    return (
        <div className='graph-container'>
            {/* Graph Head Node */}
            <div className='graph-start-node'>
                <FlowHead {...{text: headText}} />
            </div>

            {/* Graph Middle Line */}
            <div className='graph-line bg-white' />

            Graph Body
            <div className='graph-body'>
                <div className='grid-body'>
                    {/* Value Grid */}
                    <div className='grid-container'>
                        {/* Column Region */}
                        <div className='absolute top-0 w-[100%] h-5 bg-orange-600' >
                        </div>
                        
                        <GridLayout
                            {...defaultGridProps}
                            isDroppable={true}
                            compactType={'vertical'}
                            style={{
                                position: 'absolute',
                                top: '50%',
                                transform: 'translateY(-35px)',
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

                    {/* <div className='grid-container'>

                        <div className='absolute top-0 w-[100%] h-5 bg-lime-600' >

                        </div>
                        <GridLayout
                            {...defaultGridProps}
                            isDroppable={true}
                            compactType={'vertical'}
                            style={{
                                position: 'absolute',
                                top: '50%',
                                transform: 'translateY(-35px)',
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
                                                'drag-handle', 'droppable-element'
                                            )}
                                            onDragStart={e => e.dataTransfer.setData('text/plain', '')}
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
                    </div> */}

                    {/* Placeholder Grid */}
                    <div className='grid-placeholder-container'>
                        <GridLayout
                            {...defaultGridProps}
                            onDrag={(layout, oldItem, newItem) => {}}
                            onDragStop={(layout, oldItem, newItem) => {}}
                            onDrop={(layout, item, event) => {}}
                            isDraggable={false} isDroppable={false} useCSSTransforms={true}
                            style={{
                                position: 'absolute',
                                top: '50%',
                                transform: 'translateY(-35px)',
                            }}
                        >
                            {
                                gridState.placeholderLayout?.map((item, index) => {
                                    return (
                                        <div key={item.i}
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
                                                        // dragState.draggingItem && (dragState.draggingItem.x === item.x && dragState.draggingItem.y) === item.y ? 
                                                        matchInternalShape('placeholder', 'md') 
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