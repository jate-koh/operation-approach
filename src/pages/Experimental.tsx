// Files Import
import OperationFlow from '@/components/operation-flow/OperationFlow';
import { randomId } from '@/utils/String';

// Dependencies Import
import React from 'react';
import ReactGridLayoutBetween from 'packages/react-grid-between-ts';
import RGL, { WidthProvider, Layout, Responsive } from 'react-grid-layout';


// Test Props
function generateLayout() {
    // Create a layout with Random number of elements
    let layout: Layout[] = [];
    let element = Math.floor(Math.random() * 100) + 1;
    for (let i = 0; i < element; i++) {
        layout.push({
            i: randomId(10, 20),
            x: Math.floor(Math.random() * 10),
            y: Math.floor(Math.random() * 10),
            w: 1,
            h: 1,
        });
    }
    return layout;
}

const GridLayout = WidthProvider(RGL);
const ResponsiveGridLayout = WidthProvider(Responsive);

type LayoutState = {
    layout?: Layout[] | undefined,
    cols: number,
    dragging: boolean,
    draggingItem?: Layout | undefined,
};

export function Experimental() {

    const [layoutState, setLayoutState] = React.useState<LayoutState>({
        layout: generateLayout(),
        cols: 12,
        dragging: false,
        draggingItem: undefined,
    });
    let counter: number = 0;

    return (

        <div className='flex flex-col'>

            <ReactGridLayoutBetween
                compactType={'vertical'}       
            >
                <div className='bg-red-500'>1</div>
            </ReactGridLayoutBetween>
            {/* <div
                className="bg-white w-[10rem] h-[5rem]"
                draggable={true}
                // this is a hack for firefox
                // Firefox requires some kind of initialization
                // which we can do by adding this attribute
                // @see https://bugzilla.mozilla.org/show_bug.cgi?id=568313
                onDragStart={e => e.dataTransfer.setData("text/plain", "")}
                data-grid={{x: 0, y: 0, w: 1, h: 1}}
            >
                Droppable Element
            </div>
            <GridLayout
                isResizable={false} isDraggable={true}
                isDroppable={true} droppingItem={layoutState.draggingItem}
                compactType={'vertical'} measureBeforeMount={true}
                rowHeight={64} draggableHandle='.drag-handle'
                // onDrag={(layout, oldItem, newItem) => {
                //     setLayoutState({
                //         ...layoutState,
                //         dragging: true,
                //         draggingItem: newItem,
                //     });
                //     console.log('X', newItem.x, 'Y', newItem.y);
                // }}
                onDragStart={(layout, oldItem, newItem) => {
                    setLayoutState({
                        ...layoutState,
                        dragging: true,
                        draggingItem: newItem,
                    });
                }}
                onDragStop={(layout, oldItem, newItem) => {
                    setLayoutState({
                        ...layoutState,
                        dragging: false,
                        draggingItem: undefined,
                    });
                }}
                onDrop={(layout, dropItem) => {
                    console.log('Dropped', layout, dropItem);
                }}
                cols={layoutState.cols}
            >
                { layoutState.layout?.map((item) => {
                    return (
                        <div key={`item-${item.i}`} 
                            draggable={true}
                            className='bg-red-500 drag-handle'
                            data-grid={{x: item.x, y: item.y, w: item.w, h: item.h, i: item.i}}
                        >
                            {counter++}
                        </div>
                    );
                })}
            </GridLayout>
            <GridLayout
                isResizable={false} isDraggable={true}
                isDroppable={true} droppingItem={layoutState.draggingItem}
                compactType={'vertical'} measureBeforeMount={true}
                rowHeight={64} draggableHandle='.drag-handle'
                // onDrag={(layout, oldItem, newItem) => {
                //     setLayoutState({
                //         ...layoutState,
                //         dragging: true,
                //         draggingItem: newItem,
                //     });
                //     console.log('X', newItem.x, 'Y', newItem.y);
                // }}
                onDragStart={(layout, oldItem, newItem) => {
                    setLayoutState({
                        ...layoutState,
                        dragging: true,
                        draggingItem: newItem,
                    });
                }}
                onDragStop={(layout, oldItem, newItem) => {
                    setLayoutState({
                        ...layoutState,
                        dragging: false,
                        draggingItem: undefined,
                    });
                }}
                onDrop={(layout, oldItem, newItem) => {
                    console.log('Dropped');
                }}
                cols={layoutState.cols}
            >
                { layoutState.layout?.map((item) => {
                    return (
                        <div key={`item-${item.i}`} 
                            draggable={true}
                            className='bg-red-500 drag-handle'
                            data-grid={{x: item.x, y: item.y, w: item.w, h: item.h, i: item.i}}
                        >
                            {counter++}
                        </div>
                    );
                })}
            </GridLayout> */}
        </div>
    );
}

export default Experimental;