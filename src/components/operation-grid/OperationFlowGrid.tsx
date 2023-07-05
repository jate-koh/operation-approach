import { operationJSON, operationLines, operationList } from '@/components/operation-flow/OperationFlow';
import { joinClassNames, randomId } from '@/utils/String';

import { useEffect, useState } from 'react';
import { Responsive, WidthProvider, Layout } from 'react-grid-layout';
import { ShapeTextBox } from '../common/ShapeTextBox';

export type operationFlowGridProps = {
    operationLines: operationLines;
};

const ResponsiveGridLayout = WidthProvider(Responsive);

export function OperationFlowGrid({ operationLines }: operationFlowGridProps ) {

    //====================================================================================================//
    // Operation Lines Processing
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

            // console.log(line.operationList);
            // console.log('Lowest Seq: ' + lowestSequence, 'Length: ' + line.operationList.length, 'Max Seq: ' + maxSequence);
           
            // Iterate through each operation in the line equal to maxSequence
            for (let i = lowestSequence; i <= maxSequence && index < line.operationList.length; i++) {
               
                // console.log('Current index: ' + index, 'Loop Seq: ' + i);
                // If the current index is lower than the length of the operationList
                if (index < line.operationList.length) {
                    // console.log('Current Seq: ' + line.operationList[index].sequence);
                    // If the current operation's sequence is not equal to the current index
                    if ( line.operationList[index].sequence && line.operationList[index].sequence != i) {
                        // Fragment the operationList before the current index
                        let before = temp.slice(0, index);
                        // console.log('Before: ')
                        // console.log(before);
                        
                        // Fragment the operationList after the current index
                        let after = temp.slice(index, temp.length);
                        // console.log('After: ')
                        // console.log(after);
                        
                        // Insert a placeholder operation at the current index
                        before.push({
                            sequence: i,
                            shapeType: 'placeholder',
                        });

                        // Merge the two fragments
                        temp = before.concat(after);
                        
                        // console.log('Placeholder inserted at index: ' + index);
                        // console.log(temp);
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
                    // console.log('PLACEHOLDER', lowestSequence, temp.length, i);
                    temp.push({
                        sequence: lowestSequence + temp.length,
                        shapeType: 'placeholder',
                    });
                }
                // console.log(temp);
            }
            // Replace the operationList with the adjusted one
            // console.log(temp);
            line.operationList = temp;
        });
        return operationLines;
    };

    const reorderLines = (operationLines: operationLines) => {
        let temp = operationLines;

        // If there is even number of lines
        if (temp.length % 2 === 0) {
            // Add another line with type: sub
            temp.push({
                // Randomly generate an id from 10 to 20 characters
                line: randomId(10, 20),
                type: 'sub',
                operationList: [],
            });
        }

        // Find the middle line index
        let middleLineIndex = Math.floor(temp.length / 2);

        // Find which line has type: main
        let mainLineIndex = 0;
        for (let i = 0; i < temp.length; i++) {
            if (temp[i].type === 'main') {
                mainLineIndex = i;
                break;
            }
        }

        // Swap the middle line with the main line
        let middleLine = temp[middleLineIndex];
        temp[middleLineIndex] = temp[mainLineIndex];
        temp[mainLineIndex] = middleLine;

        // console.log(temp);
        return temp;
    };

    const createGridArray = (operationLines: operationLines) => {
        let gridArray: operationJSON[] = [];
        operationLines.forEach((line) => {
            line.operationList.forEach((operation) => {
                gridArray.push(operation);
            });
        });
        // console.log(gridArray);

        return gridArray;
    };

    // Hook States
    const [operationLinesState, setOperationLines] = useState<operationLines>(adjustLines(reorderLines(operationLines)));
    const [currentMaxLength, setMaxLength] = useState<number>(findMaxSequence(operationLines));
    const [currentGridArray, setGridArray] = useState<operationJSON[]>(createGridArray(operationLinesState));
    const [amountOfLines, setLinesAmount] = useState<number>(operationLinesState.length);

    //====================================================================================================//
    // Line Class Adjustment
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
        small: 'gap-16',
        medium: 'gap-16',
        large: 'gap-16',
    };

    const matchGap = (operationLines: operationLines) => {
        let length = operationLines.length;
        if (length == 2) {
            return gaps.small;
        } else if (length == 3) {
            return gaps.medium;
        } else if (length >= 4) {
            return gaps.large;
        }
    };
    //====================================================================================================//
    // Grid Layout
    const createLayout = currentGridArray.map((line, index) => {
        return {
            x: line.sequence - 1,
            y: index,
            w: 1,
            h: 1,
            i: line.id ? line.id : line.sequence.toString(),
        };
    });
    
    const handleOverflow = (layout: Layout[]): Layout[] | undefined => {
        let temp = layout;
        
        // Find number of element in each column
        let columnCount = new Array(currentMaxLength).fill(0);

        // Fill columnCount with number of elements in each column
        temp.forEach((element) => {
            columnCount[element.x] += 1;
        });
        // columnCount.forEach((count, index) => {
        //     console.log(`Column ${index} has ${count} elements`);
        // });

        // Find the column with the lowest and highest number of elements
        let lowestColumnIndex: number = 0;
        let highestColumnIndex: number = 0;
        for (let i = 0; i < columnCount.length; i++) {
            if (columnCount[i] < columnCount[lowestColumnIndex]) {
                lowestColumnIndex = i;
            }
            if (columnCount[i] > columnCount[highestColumnIndex]) {
                highestColumnIndex = i;
            }
        }
        // console.log(`Column ${lowestColumnIndex} has the lowest number of elements`);
        // console.log(`Column ${highestColumnIndex} has the highest number of elements`);

        // Find placeholder elements in highest column
        // and place them in the lowest column at the last row
        let placeholderElements: Layout = {
            x: 0,
            y: 0,
            w: 1,
            h: 1,
            i: '',
        };
        temp.forEach((element, index) => {
            if (element.x === highestColumnIndex && element.i.includes('placeholder')) {
                // Found placeholder element
                placeholderElements = element;
                return;
            }
        });

        if (!placeholderElements) return;

        // Move every element in the lowest column down by 1 row
        temp.forEach((element, index) => {
            if (element.x === lowestColumnIndex) {
                element.y += 1;
            }
        });

        // Place placeholder element in the top row of the lowest column
        placeholderElements.y = 0;
        placeholderElements.x = lowestColumnIndex;

        return temp;
    };
    
    const onDragEnd = (layout: Layout[], oldItem: Layout, newItem: Layout) => {
        console.log('Drag End', layout, oldItem, newItem);
        // Handle Overflow
        let result = handleOverflow(layout);
        if (result) setLayout(result);
    };
    
    // Hook States
    const [currentLayout, setLayout] = useState<Layout[]>([]);

    useEffect(() => {
        console.log('Effect Layout', currentLayout);
    }, [currentLayout]);

    //====================================================================================================//

    return (
        <div className='flex items-center w-[80%]'>
            <ShapeTextBox
                shapeType='rectangle' text={'Header'} hasSolid={{enabled: true}}
                textClassName='text-black' shrinkable={true} className='w-[256px] h-[128px]'
            />
            <div className='graph-line bg-white w-[80%]' style={{}}></div>
            <div className='grid-container' style={{}}>
                <ResponsiveGridLayout onDragStop={(layout, oldItem, newItem) => onDragEnd(layout, oldItem, newItem)} 
                    cols={{lg: currentMaxLength, md: currentMaxLength, sm: currentMaxLength, xs: currentMaxLength, xxs: currentMaxLength}}
                    isResizable={false} isDraggable={true}
                    layouts={{lg: currentLayout, md: currentLayout, sm: currentLayout, xs: currentLayout, xxs: currentLayout}}
                    compactType={'vertical'}
                    rowHeight={64} draggableHandle='.drag-handle' >
                    {
                        currentGridArray.map((line, index) => {
                            return (
                                <div key={`${line.id ? line.id : 'placeholder'}-${index}`} data-grid={{
                                    x: line.sequence - 1,
                                    y: index,
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
                                            line.shapeType != 'placeholder' ? 'circle w-[64px] h-[64px] bg-white mr-0' : 'circle w-[64px] h-[64px] bg-red-500 mr-0',
                                        )
                                    }
                                    >
                                        <h1>{line.id}</h1>
                                    </div>
                                </div>
                            );
                        })
                    }
                </ResponsiveGridLayout>
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