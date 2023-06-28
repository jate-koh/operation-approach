import { Line } from '@/components/common/Line';
import { FlowBody } from '@/components/operationflow/body/FlowBody';
import { operationLines, operationList } from '@/components/operationflow/OperationFlow';
import { joinClassNames } from '@/utils/String';

import { Droppable, Draggable ,DragDropContext, DropResult } from 'react-beautiful-dnd';
import { useState } from 'react';

export type flowBodyGroupProps = {
    operationLines: operationLines;
};

export function FlowBodyGroup( { operationLines }: flowBodyGroupProps ) {
    //====================================================================================================//
    // Length Adjustment
    const findMaxSequence = (operationLines: operationLines) => {
        let maxSequence = 0;
        operationLines.forEach((line) => {
            if (line.operationList.length > maxSequence) {
                maxSequence = line.operationList.length;
            }
        });
        return maxSequence;
    };

    const findLowestSequence = (operationLines: operationLines) => {
        let lowestSequence = 99;
        operationLines.forEach((line) => {
            line.operationList.forEach((operation) => {
                if (operation.sequence < lowestSequence) {
                    lowestSequence = operation.sequence;
                }
            });
        });
        return lowestSequence;
    };

    const adjustLines = (operationLines: operationLines) => {
        // Start counting from the lowest sequence
        let lowestSequence = findLowestSequence(operationLines);
        let maxSequence = findMaxSequence(operationLines);
        let index = 0; // Keep track of the index of the certain operationList
        operationLines.forEach((line) => {
            index = 0;
            let temp = line.operationList;

            console.log(line.operationList);
            console.log('Lowest Seq: ' + lowestSequence, 'Length: ' + line.operationList.length, 'Max Seq: ' + maxSequence);
           
            // Iterate through each operation in the line equal to maxSequence
            for (let i = lowestSequence; i <= maxSequence && index < line.operationList.length; i++) {
               
                console.log('Current index: ' + index, 'Loop Seq: ' + i);
                // If the current index is lower than the length of the operationList
                if (index < line.operationList.length) {
                    console.log('Current Seq: ' + line.operationList[index].sequence);
                    // If the current operation's sequence is not equal to the current index
                    if ( line.operationList[index].sequence && line.operationList[index].sequence != i) {
                        // Fragment the operationList before the current index
                        let before = temp.slice(0, index);
                        console.log('Before: ')
                        console.log(before)
                        
                        // Fragment the operationList after the current index
                        let after = temp.slice(index, temp.length);
                        console.log('After: ')
                        console.log(after)
                        
                        // Insert a placeholder operation at the current index
                        before.push({
                            sequence: i,
                            shapeType: 'placeholder',
                        });

                        // Merge the two fragments
                        temp = before.concat(after);
                        
                        console.log('Placeholder inserted at index: ' + index);
                        console.log(temp);
                        index++;
                    } else {
                        // Move on to the next operation
                        index++;
                    }
                }
            }

            // If the length of the temp is still lower than the maxSequence
            if (temp.length < maxSequence) {
                // Calculate the number of placeholders needed
                let placeholderCount = maxSequence - temp.length;
                
                // Insert the placeholders
                for (let i = 0; i < placeholderCount; i++) {
                    temp.push({
                        sequence: lowestSequence + temp.length + i,
                        shapeType: 'placeholder',
                    });
                }
                console.log(temp);
            }
            // Replace the operationList with the adjusted one
            line.operationList = temp;
        });
        return operationLines;
    };

    const [operationLinesState, setOperationLines] = useState<operationLines>(adjustLines(operationLines));

    //====================================================================================================//
    // Line Adjustment
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
    // Gap Adjustments
    const gaps = {
        small: 'gap-20',
        medium: 'gap-20',
        large: 'gap-32',
    };

    const matchGap = (operationLines: operationLines) => {
        let length = operationLines.length;
        if (length == 2) {
            return gaps.small;
        } else if (length == 3) {
            return gaps.medium;
        } else if (length > 4) {
            return gaps.large;
        }
    };
    //====================================================================================================//
    // Drag and Drop
    const onDragEnd = (result: DropResult) => {
        const { source, destination } = result;

        // If the user drops the item outside of the droppable area
        if (!destination) {
            return;
        }

        // If the user drops the item in the same droppable area
        if (source.droppableId === destination.droppableId) {
            const operationLines = reorder(
                operationLinesState,
                source.droppableId,
                source.index,
                destination.index
            );
            setOperationLines(operationLines);
        // If the user drops the item in a different droppable area
        } else {
            const operationLines = move(
                operationLinesState,
                source.droppableId,
                destination.droppableId,
                source.index,
                destination.index
            );
            setOperationLines(operationLines);
        }
    };

    const reorder = (
        operationLines: operationLines,
        droppableId: string,
        startIndex: number,
        endIndex: number
    ) => {
        const line = operationLines.find((line) => line.type === droppableId);
        if (!line) {
            return operationLines;
        }
        const result = Array.from(line.operationList);
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);
        return operationLines.map((line) => {
            if (line.type === droppableId) {
                return {
                    ...line,
                    operationList: result,
                };
            }
            return line;
        });
    };

    const move = (
        operationLines: operationLines,
        sourceDroppableId: string,
        destinationDroppableId: string,
        sourceIndex: number,
        destinationIndex: number
    ) => {
        const sourceLine = operationLines.find(
            (line) => line.type === sourceDroppableId
        );
        const destinationLine = operationLines.find(
            (line) => line.type === destinationDroppableId
        );
        if (!sourceLine || !destinationLine) {
            return operationLines;
        }
        const sourceClone = Array.from(sourceLine.operationList);
        const destinationClone = Array.from(destinationLine.operationList);
        const [removed] = sourceClone.splice(sourceIndex, 1);
        destinationClone.splice(destinationIndex, 0, removed);
        return operationLines.map((line) => {
            if (line.type === sourceDroppableId) {
                return {
                    ...line,
                    operationList: sourceClone,
                };
            } else if (line.type === destinationDroppableId) {
                return {
                    ...line,
                    operationList: destinationClone,
                };
            }
            return line;
        });
    };

    //====================================================================================================//
    
    return(
        <DragDropContext onDragEnd={(result) => onDragEnd(result) }>
            <div className={
                joinClassNames(
                    'grid grid-cols-1',
                    matchGap(operationLinesState),
                )
            }>
                {operationLinesState.map((line, index) => (
                    <Droppable droppableId={line.line.toString()} key={index}>
                        {
                            (provided, snapshot) => {
                                return (
                                    <div
                                        {...provided.droppableProps}
                                        ref={provided.innerRef}
                                    >
                                        <Line key={index}
                                            className={
                                                joinClassNames(
                                                    flowBodyLength.base,
                                                    flowAdjustment(line.operationList).length,
                                                )
                                            }
                                            lineColor={
                                                joinClassNames(
                                                    snapshot.isDraggingOver ? 'bg-red-500' : isInvisible(line.type),
                                                )
                                            }
                                        >
                                            {
                                                line.operationList.map((operation, index) => {
                                                    return (
                                                        <Draggable
                                                            key={operation.id}
                                                            draggableId={operation.id ? operation.id : operation.sequence.toString()}
                                                            index={index}
                                                        >
                                                            {
                                                                (provided, snapshot) => {
                                                                    return (
                                                                        <div
                                                                            ref={provided.innerRef}
                                                                            {...provided.draggableProps}
                                                                            {...provided.dragHandleProps}
                                                                            className='circle w-[64px] h-[64px] bg-white'
                                                                        >
                                                                            <h1>
                                                                                {operation.id}
                                                                            </h1>
                                                                        </div>
                                                                    );
                                                                }
                                                            }
                                                        </Draggable>
                                                    );
                                                })    
                                            }
                                        </Line>
                                    </div>
                                );
                            }
                        }

                        {/* <Line key={index} 
                            className={
                                joinClassNames(
                                    flowBodyLength.base,
                                    flowAdjustment(line.operationList).length,
                                )
                            }
                            lineColor={
                                joinClassNames(
                                    isInvisible(line.type),
                                )
                            }
                        >
                            <FlowBody key={index} operationList={line.operationList}/>
                        </Line> */}
                    </Droppable>
                ))}
            </div>
        </DragDropContext>
    );
}