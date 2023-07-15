// Dependencies Imports
import { useEffect, useState, useRef } from 'react';
import RGL, { Responsive, WidthProvider, Layout } from 'react-grid-layout';

// Files Imports
import { OperationFlowProps, OperationLines } from './utils/types/Props';
import { FlowHead } from '../operation-flow-demo/FlowHead';
import { FlowTail } from '../operation-flow-demo/FlowTail';
import { createLayout, createPlaceholderLayout, prepLines, reorderMiddleLines } from './utils/Main';
import { getJSON, findMaxSequence, findMinSequence, findMaxY } from './utils/Base';
import { matchInternalShape } from './utils/Styling';
import { joinClassNames, randomId } from './utils/String';

// CSS Imports
import './css/index.css';

// Constants and Types
const ResponsiveGridLayout = WidthProvider(Responsive);
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
};

type DragState = {
    dragging: boolean;
    draggingItem?: Layout | undefined;
};

export function OperationFlow({ headText, tailText, operationLines }: OperationFlowProps, debugMode: boolean = false) {
    //=======================================================================================================
    // React Hooks
    const [flowState, setFlowState] = useState<FlowState>({
        headText: headText,
        tailText: tailText,
        operationLines: reorderMiddleLines(prepLines(operationLines)),
    });

    const [gridState, setGridState] = useState<GridState>({
        valueLayout: createLayout(operationLines),
        placeholderLayout: createPlaceholderLayout(operationLines),
        currentCols: findMaxSequence(operationLines) - findMinSequence(operationLines) + 1,
        currentRows: operationLines.length,
    });

    const [isDragging, setDragging] = useState<boolean>(false);

    useEffect(() => {
        console.log('Flow State: ', flowState);
        console.log('Grid State: ', gridState);

    }, [flowState, gridState]);
    //=======================================================================================================
    // Action Handler
    // const onDragStart = (layout: Layout[], oldItem: Layout, newItem: Layout) => {

    // };

    // const onDragStop = (layout: Layout[], oldItem: Layout, newItem: Layout) => {

    // };
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
                                // setDragging(true);
                                console.log('on Drag Col 1: ', layout, oldItem, newItem);
                            }}
                            onDragStop={(layout, oldItem, newItem) => {
                                setDragging(false);
                                console.log('on Drag Stop Col 1: ', layout, oldItem, newItem);
                            }}
                            onDrop={(layout, item) => {
                                setDragging(false);
                                console.log('on Drop Col 1: ', layout, item);
                            }}
                            isDroppable={true} isDraggable={true}
                            cols={gridState.currentCols} rowHeight={50}
                            draggableHandle='.drag-handle' 
                            compactType={null}
                            style={{
                                position: 'absolute',
                                top: '50%',
                                transform: 'translateY(-50%)',
                            }} 
                            useCSSTransforms={true}
                        >
                            {
                                gridState.valueLayout?.map((item, index) => {
                                    return (
                                        <div key={`${item.i}-${randomId(5, 10)}`}
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
                        <GridLayout
                            onDrag={(layout, oldItem, newItem) => {}}
                            onDragStop={(layout, oldItem, newItem) => {}}
                            onDrop={(layout, item, event) => {
                                console.log('Dropped');
                            }}
                            cols={gridState.currentCols}
                            rowHeight={50}
                            isDroppable={true}
                            draggableHandle='.drag-handle'
                            compactType={null}
                            style={{
                                position: 'absolute',
                                top: '50%',
                                transform: 'translateY(-50%)',
                            }}
                        >
                            {
                                gridState.valueLayout?.map((item, index) => {
                                    return (
                                        <div key={`${item.i}-${randomId(5, 10)}`}
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
                            }å
                        </GridLayout>
                    </div> */}

                    {/* Placeholder Grid */}
                    <div className='grid-placeholder-container'>
                        <GridLayout
                            onDrag={(layout, oldItem, newItem) => {}}
                            onDragStop={(layout, oldItem, newItem) => {}}
                            onDrop={(layout, item, event) => {
                                console.log('On Drop 2:');
                            }}
                            cols={gridState.currentCols}
                            rowHeight={50} isDroppable={true}
                            draggableHandle='.drag-handle'
                            compactType={'vertical'}
                            style={{
                                position: 'absolute',
                                top: '50%',
                                transform: 'translateY(-50%)',
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
                                            }}
                                            className={joinClassNames(
                                                'drag-handle'
                                            )}
                                        >
                                            <div className={
                                                joinClassNames(
                                                    isDragging ? matchInternalShape('placeholder', 'md') : ''
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