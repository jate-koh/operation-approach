import { operationList } from '@/components/operationflow/OperationFlow';
import { Line } from '@/components/common/Line';
import React, { useRef, useState } from 'react';
import { joinClassNames } from '@/utils/String';

export type flowBodyProps = {
    children?: string | JSX.Element | JSX.Element[];
    operationList: operationList;
    type: 'main' | 'sub';
};

export function FlowBody({
    children,
    operationList,
    type,
}: flowBodyProps) {
    //====================================================================================================//
    // Dragging and Sort
    const [operationState, setOperation] = useState<operationList>(operationList);

    const dragItem = useRef<any>(null);
    const dragOverItem = useRef<any>(null);

    const handleSort = () => {   
        let list = [...operationState];

        // Check link of dragged item
        if (dragItem.current.link) {
            // Get the item in the list that is linked to the dragged item
            let linkedItem = list.find((item) => item.id === dragItem.current.link?.id);
            console.log(linkedItem);
        }
        
        // Save and remove dragged item
        let draggedItemContent = list.splice(dragItem.current, 1)[0];

        // Swap dragged item with the item dragged over
        list.splice(dragOverItem.current, 0, draggedItemContent);

        // Reset the reference
        dragItem.current = null;
        dragOverItem.current = null;

        setOperation(list);
        console.log(list);
    };
    
    const onDragEnd = (event: React.DragEvent<HTMLDivElement>, index: number) => {
        console.log('drag end', index);
    };

    const onDragStart = (event: React.DragEvent<HTMLDivElement>, index: number) => {
        console.log('drag start', index);
    };

    const onDragOver = (event: React.DragEvent<HTMLDivElement>, index: number) => {
        console.log('drag over', index);
    };

    const onDragEnter = (event: React.DragEvent<HTMLDivElement>, index: number) => {
        console.log('drag enter', index);
    };

    //====================================================================================================//
    // Class Names
    const isInvisible = (type: 'main' | 'sub') => {
        console.log(type);
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

    const flowBodyLength = {
        base: 'h-2',
        short: {
            margin: 'm-[16px]',
            length: 'w-[384px]'
        },
        medium: {
            margin: 'm-[16px]',
            length: 'w-[640px]'
        },
        long: {
            margin: 'm-[16px]',
            length: 'w-[768px]'
        },
        extraLong: {
            margin: 'm-[16px]',
            length: 'w-[1024px]'
        },
    };

    const flowAdjustment = (operationList: operationList) => {
        let operationLength = operationList.length;
        if (operationLength <= 3) {
            return flowBodyLength.short;
        } else if (operationLength <= 5) {
            return flowBodyLength.medium;
        } else if (operationLength <= 8) {
            return flowBodyLength.long;
        } else {
            return flowBodyLength.extraLong;
        }
    };

    //====================================================================================================//

    return (
        <Line 
            className={
                joinClassNames(
                    flowBodyLength.base,
                    flowAdjustment(operationList).length,
                )
            }
            lineColor={
                joinClassNames(
                    isInvisible(type),
                )
            }
        >
            {
                operationState.map((operation, index) => {
                    return (
                        <div 
                            // OnClick Events
                            onClick={() => console.log(operation.id)}

                            // Drag Events
                            draggable
                            onDragStart={(event) => {
                                // If the dragged item is placeholder, do nothing
                                if (operation.shapeType === 'placeholder') {
                                    return;
                                }
                                dragItem.current = index;
                                onDragStart(event, index);
                            }}
                            onDragEnter={(event) => {
                                dragOverItem.current = index;
                                onDragEnter(event, index);
                            }}
                            onDragEnd={(event) => {
                                if (operation.shapeType != 'placeholder') 
                                    handleSort();
                                onDragEnd(event, index);
                            }}
                            
                            // Styling
                            key={index}
                            className={
                                joinClassNames(
                                    // flowAdjustment(operationList).margin,
                                    flowBodyLength.medium.margin,
                                    matchShapeClass(operation.shapeType),
                                    'hover:cursor-pointer'
                                )
                            }
                        >
                            <h1 className="">
                                {operation.id}
                            </h1>
                        </div>
                    );
                })
            }
        </Line>
    );
}

// ARCHIVE
// <ShapeTextBox 
//     key={operation.id}
//     shapeType={operation.shapeType}
//     text={operation.id}
//     hasSolid={{enabled: true}}
//     textClassName='text-black'
//     className='w-[64px] h-[64px] m-[16px]'
// />