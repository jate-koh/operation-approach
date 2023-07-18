// Files Import
import OperationFlow from '@/components/operation-flow/OperationFlow';
import { randomId } from '@/utils/String';

// Dependencies Import
import React from 'react';
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
        <div className=''>
            <GridLayout
                isResizable={false} isDraggable={true}
                compactType={'vertical'} measureBeforeMount={true}
                rowHeight={64} draggableHandle='.drag-handle'
                onDrag={(layout, oldItem, newItem) => {
                    setLayoutState({
                        ...layoutState,
                        dragging: true,
                        draggingItem: newItem,
                    });
                    console.log('X', newItem.x, 'Y', newItem.y);
                }}
                cols={layoutState.cols}
            >
                { layoutState.layout?.map((item) => {
                    return (
                        <div key={`item-${item.i}`} 
                            className='bg-red-500 drag-handle'
                            data-grid={{x: item.x, y: item.y, w: item.w, h: item.h, i: item.i}}
                        >
                            {counter++}
                        </div>
                    );
                })}
            </GridLayout>
        </div>
    );
}

export default Experimental;