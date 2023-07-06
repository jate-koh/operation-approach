import { operationJSON, operationLines, operationList } from '@/components/operation-flow/OperationFlow';
import { findMaxSequence, processLines, reorderLines, 
    createGridArray, handleOverflow, reorderCols, 
    insertColumns, extendLine
} from '@/components/operation-grid/GridHelper';
import { ShapeTextBox } from '@/components/common/ShapeTextBox';
import { joinClassNames } from '@/utils/String';

import { useEffect, useState } from 'react';
import { Responsive, WidthProvider, Layout } from 'react-grid-layout';

export type operationFlowGridProps = {
    operationLines: operationLines;
};

type gridState = {
    dragging: boolean;
    draggingItem: Layout | undefined;
}

const ResponsiveGridLayout = WidthProvider(Responsive);

export function OperationFlowGrid({ operationLines }: operationFlowGridProps ) {

    //====================================================================================================//
    // React Hooks
    const [operationLinesState, setOperationLines] = useState<operationLines>(processLines(reorderLines(operationLines)));
    const [currentMaxLength, setMaxLength] = useState<number>(findMaxSequence(operationLines));
    const [currentGridArray, setGridArray] = useState<operationJSON[]>(createGridArray(operationLinesState));
    const [amountOfLines, setLinesAmount] = useState<number>(operationLinesState.length);
    const [currentLayout, setLayout] = useState<Layout[]>([]);
    useEffect(() => {
        console.log('Effect Layout', currentLayout);
        console.log('Effect Max Length', currentMaxLength);
        console.log('Effect Op Line', operationLinesState);
        console.log('Effect Grid Array', currentGridArray);
    }, [currentLayout, currentMaxLength, operationLinesState, currentGridArray]);

    // States
    const [gridState, setGridState] = useState<gridState>({
        dragging: false,
        draggingItem: undefined,
    });

    //====================================================================================================//
    // Styling Adjustments

    // Line Visibility
    const isInvisible = (type: 'main' | 'sub') => {
        if (type === 'main') {
            return '';
        }
        else if (type === 'sub') {
            return 'bg-transparent';
        }
        else {
            return '';
        }
    };

    // Shape Class
    const matchShapeClass = (shapeType: string | undefined) => {
        let shape = shapeType;
        if (shape != undefined) {
            shape = shape.toLowerCase();
            switch (shape) {
            case 'circle':
                return 'circle w-[64px] h-[64px] bg-white';
            case 'diamond':
                return 'diamond w-[64px] h-[64px] bg-white';
            case 'placeholder':
                return 'placeholder w-[64px] h-[64px]';
            default:
                return 'circle w-[64px] h-[64px] bg-white';
            }
        }
        else {
            return 'placeholder';
        }
    };

    //====================================================================================================//
    // Grid Operations
    const addLine = () => {
    };

    // Function to handle when dragging starts
    const onDragStart = (newItem: Layout) => {
        setGridState({
            dragging: true,
            draggingItem: newItem,
        });
        console.log('X', gridState.draggingItem?.x, 'Y', gridState.draggingItem?.y);
    };

    // Function to handle when dragging ends
    const onDragEnd = (layout: Layout[], oldItem: Layout, newItem: Layout) => {
        console.log('Drag End', layout, oldItem, newItem);

        let hasChangedCols: boolean = oldItem.x !== newItem.x;
        let moveToNewRow: boolean = newItem.y >= amountOfLines;
        let result: Layout[] | undefined;
        let endLayout: Layout[] = layout;

        // Handle Move to New Row
        // if (moveToNewRow) {
        //     console.log('Move to New Row');
        // }
        // Handle Overflow, if new item changes column
        if (hasChangedCols) {
            result = handleOverflow(layout, currentMaxLength);
        }

        result = reorderCols(result, oldItem.x);
        if (result) endLayout = insertColumns(endLayout, result, oldItem.x);
        result = reorderCols(result ? result : layout, newItem.x);
        if (result) endLayout = insertColumns(endLayout, result, newItem.x);
        else return;
        // console.log('End Layout', endLayout);

        setGridState({
            dragging: false,
            draggingItem: undefined,
        });
        setLayout(endLayout);

    };

    //====================================================================================================//

    return (
        <div className='flex items-center w-[80%]'>
            <ShapeTextBox
                shapeType='rectangle' text={'Header'} hasSolid={{enabled: true}}
                textClassName='text-black' shrinkable={true} className='w-[256px] h-[128px]'
            />
            <div className='graph-line bg-white w-[70%]' style={{}} />
            <div className='grid-container' style={{}}>
                <ResponsiveGridLayout 
                    onDrag={(layout, oldItem, newItem) => { onDragStart(newItem); }}
                    onDragStop={(layout, oldItem, newItem) => { onDragEnd(layout, oldItem, newItem); } }
                    cols={{lg: currentMaxLength, md: currentMaxLength, sm: currentMaxLength, xs: currentMaxLength, xxs: currentMaxLength}}
                    isResizable={false} isDraggable={true}
                    layouts={{lg: currentLayout, md: currentLayout, sm: currentLayout, xs: currentLayout, xxs: currentLayout}}
                    compactType={'vertical'}
                    rowHeight={64} draggableHandle='.drag-handle' >
                    {
                        currentGridArray.map((line, index) => {
                            return (
                                <div key={`${line.id ? line.id : 'placeholder'}-${index}`} 
                                    data-grid={{
                                        x: line.sequence - 1,
                                        y: Math.floor(index / currentMaxLength),
                                        w: 1,
                                        h: 1,
                                        i: line.id ? line.id : line.sequence.toString(),
                                    }}
                                    className={
                                        joinClassNames(
                                            line.shapeType != 'placeholder' ? 'drag-handle' : ''
                                        )
                                    }
                                    style={{width: '0px'}}>
                                    <div className={
                                        joinClassNames(
                                            line.shapeType != 'placeholder' ? 'circle w-[64px] h-[64px] bg-white mr-0' : 
                                                !gridState.dragging ?  'placeholder w-[64px] h-[64px] mr-0' :
                                                    gridState.draggingItem?.x === line.sequence - 1 && gridState.draggingItem?.y === Math.floor(index / currentMaxLength) ? 'circle w-[64px] h-[64px] bg-red-500/80 mr-0' : '',
                                        )
                                    }
                                    >
                                        <h1>{line.id}</h1>
                                        {/* <h1 className=' text-green-500'>{line.sequence - 1} {Math.floor(index / currentMaxLength)}</h1> */}
                                    </div>
                                </div>
                            );
                        })
                    }
                </ResponsiveGridLayout>   
            </div>
            <div className='w-[5%] add-line-wrapper hover:bg-white'>
                {/* <div className='' /> */}
                <button className='add-button bg-white' 
                    onClick={(event) => {
                        setMaxLength(currentMaxLength + 1);
                        setOperationLines(extendLine(operationLinesState));
                        setGridArray(createGridArray(operationLinesState));
                    }} 
                >
                    <h1 className='text-black'>+</h1>
                </button>
            </div>
            <ShapeTextBox 
                shapeType='rectangle' text={'Tail'} hasSolid={{enabled: true}}
                textClassName='text-black' shrinkable={true} className='w-[256px] h-[128px]'
            />
        </div>
    );
}

// <ReponsiveGridLayout onDragStop={(layout) => onDragEnd(layout)} cols={{lg: 1, md: 1, sm: 1}} 
//     rowHeight={64} className='layout' draggableHandle='.drag-handle' >
//     { operationLinesState.map((line, index) => {
//         return (
//             <div key={`${line.line}-${index}`}
//                 data-grid={{
//                     x: 0, // Set the initial x position
//                     y: index, // Set the initial y position based on index
//                     w: 1, // Set the width to 1 column
//                     h: 1, // Set the height to 4 rows
//                     i: line.line.toString(), // Use a unique identifier as the item key
//                     isBounded: true,
//                 }}
                
//             >
//                 <Line 
//                     className={joinClassNames(
//                         flowAdjustment(line.operationList).length,
//                         flowBodyLength.base
//                     )}
//                     lineColor={joinClassNames(
//                         isInvisible(line.type),
//                     )}
//                     data-grid={{
//                         x: 0, // Set the initial x position
//                         y: index, // Set the initial y position based on index
//                         w: 1, // Set the width to 1 column
//                         h: 1, // Set the height to 4 rows
//                         i: line.line.toString(), // Use a unique identifier as the item key
//                         static: true
//                     }}
                    
//                 >
//                     { line.operationList.map((operation, index) => {
//                         return (
//                             <div key={index} className='content'>
//                                 <div
//                                     className="circle w-[64px] h-[64px] bg-white drag-handle"
//                                     data-grid={{
//                                         x: index % 12, // Set the initial x position
//                                         y: Math.floor(index / 12), // Set the initial y position based on index
//                                         w: 1, // Set the width to 1 column
//                                         h: 4, // Set the height to 4 rows
//                                         i: operation.id ? operation.id : operation.sequence.toString(), // Use a unique identifier as the item key
//                                         isDraggable: true,
//                                     }}

//                                 >
//                                     <h1>{operation.id}</h1>
//                                 </div>
//                             </div>
//                         );
//                     })}
//                 </Line>
//             </div>
//         );   
//     })}
// </ReponsiveGridLayout>