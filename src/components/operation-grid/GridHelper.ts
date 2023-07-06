import { operationLines, operationJSON } from '@/components/operation-flow/OperationFlow';
import { randomId } from '@/utils/String';

import { Layout } from 'react-grid-layout';

// Operation Lines
/*  type operationLines = {
    line: string,
    type: main | sub,
    operationList: operationJSON[],
} */

//========================================================================
// Basic Functions
export function findMaxSequence(operationLines: operationLines): number {
    let highestSeq = 0;
    operationLines.forEach((line) => {
        if (line.operationList.length > highestSeq) {
            highestSeq = line.operationList.length;
        }
    });
    return highestSeq;
}

export function findMinSequence(operationLines: operationLines): number {
    let minSequence = 99;
    operationLines.forEach((line) => {
        line.operationList.forEach((operation) => {
            if (operation.sequence < minSequence) {
                minSequence = operation.sequence;
            }
        });
    });
    return minSequence;
}
//========================================================================
// Line Preparation
// Add a placeholder at every empty sequence
export function processLines(operationLines: operationLines): operationLines {
    let lowestSeq: number = findMinSequence(operationLines);
    let highestSeq: number  = findMaxSequence(operationLines);
    let index: number = 0; // Keep track of the index of the operationLines

    operationLines.forEach((line) => {
        index = 0;
        let temp = line.operationList;

        // console.log(line.operationList);
        // console.log('Lowest Seq: ' + lowestSequence, 'Length: ' + line.operationList.length, 'Max Seq: ' + maxSequence);
        
        // Iterate through each operation in the line equal to maxSequence
        for (let i = lowestSeq; i <= highestSeq && index < line.operationList.length; i++) {
            
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
        if (temp.length < highestSeq) {
            // Calculate the number of placeholders needed
            let placeholderCount = highestSeq - temp.length;
            
            // Insert the placeholders
            for (let i = 0; i < placeholderCount; i++) {
                // console.log('PLACEHOLDER', lowestSequence, temp.length, i);
                temp.push({
                    sequence: lowestSeq + temp.length,
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
}

// Reorder the lines so that the middle line is the main line
// If there is even number of lines, add another line with type: sub
export function reorderLines(operationLines: operationLines): operationLines {
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
}

// Create a grid array from the operationLines
// Array is used to order the operations in the grid
export function createGridArray(operationLines: operationLines): operationJSON[] {
    let gridArray: operationJSON[] = [];
    operationLines.forEach((line) => {
        line.operationList.forEach((operation) => {
            gridArray.push(operation);
        });
    });
    // console.log(gridArray);
    return gridArray;
}
//========================================================================
// Grid Operation Basic Functions
function searchLayout(layout: Layout[], x?: number, y?: number): number | undefined {
    let index: number | undefined = undefined;
    layout.forEach((element, i) => {
        if (element.x === x && element.y === y) {
            index = i;
        }
    });
    return index;
}

function scanLayout(layout: Layout[], keyword: string, negative?: boolean): number[] | undefined {
    let index: number[] = [];
    let neg: boolean = negative ? negative : false;
    layout.forEach((element, i) => {
        if (!neg) {
            if (element.i.includes(keyword)) {
                index.push(i);
            }
        } else {
            if (!element.i.includes(keyword)) {
                index.push(i);
            }
        }
    });
    if (index.length === 0) return;
    return index;
}

function spliceLayout(layout: Layout[], colNum?: number,  rowNum?: number ): Layout[] | undefined {
    let spliced: Layout[] = [];
    // If colNum is defined
    if (colNum) {
        layout.forEach((element, i) => {
            if (element.x === colNum) {
                if (!rowNum) spliced.push(element);
                else if (element.y === rowNum) spliced.push(element);
            }
        });
    }
    else {
        layout.forEach((element, i) => {
            if (element.y === rowNum) {
                spliced.push(element);
            }
        });
    }
    if (spliced.length === 0) return;
    return spliced;
}

function sortArray(layout: Layout[], descending?: boolean): Layout[] {
    let temp = layout;
    let desc = descending ? descending : false;
    if (!desc) 
        temp.sort((a, b) => {
            if (a.y > b.y) return 1;
            if (a.y < b.y) return -1;
            return 0;
        });
    else
        temp.sort((a, b) => {
            if (a.y < b.y) return 1;
            if (a.y > b.y) return -1;
            return 0;
        });
    return temp;
}

function sortPlaceholder(layout: Layout[], pos: 'top' | 'bottom'): Layout[] {
    let temp = layout;
    // top = placeholder is sort to top, bottom = placeholder is sort to bottom
    let top = pos === 'top' ? true : false;
    let res: Layout[] | undefined;

    for ( let i = 0; i < temp.length - 1; i++) {
        if (top) {
            if ( !temp[i].i.includes('placeholder') && temp[i+1].i.includes('placeholder') ) {
                res = swapRows(temp, i, i+1);
                res && (temp = res);
            }
        } else {
            if ( temp[i].i.includes('placeholder') && !temp[i+1].i.includes('placeholder') ) {
                // console.log('BOTTOM SWAP', temp, i, i+1);
                res = swapRows(temp, i+1, i);
                res && (temp = res);
            }
        }
    }
    return temp;
}

export function insertColumns(layout: Layout[], insertion: Layout[], colNum: number): Layout[] {
    let index: number = 0;
    let temp = layout;
    temp.forEach((element, i) => {
        if (element.x === colNum) {
            layout[i] = insertion[index++];
        }
        if (index > insertion.length) return;
    });
    return temp;
}
//========================================================================
// Grid Operation Composite Functions
// Handle overflow by moving the elements to the column with the lowest number of elements
export function handleOverflow(layout: Layout[], currentMaxLength: number): Layout[] | undefined {
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
    temp.forEach((element) => {
        if (element.x === highestColumnIndex && element.i.includes('placeholder')) {
            // Found placeholder element
            placeholderElements = element;
            return;
        }
    });

    if (!placeholderElements) return;

    // Move every element in the lowest column down by 1 row
    temp.forEach((element) => {
        if (element.x === lowestColumnIndex) {
            element.y += 1;
        }
    });

    // Place placeholder element in the top row of the lowest column
    placeholderElements.y = 0;
    placeholderElements.x = lowestColumnIndex;

    return temp;
}

export function swapRows(layout: Layout[], index_1: number, index_2: number): Layout[] | undefined {
    if ( index_1 === index_2 ) return;
    if ( index_1 < 0 || index_2 < 0 || index_1 > layout.length || index_2 > layout.length ) return;
    if (!layout) return;

    let row_1: Layout = layout[index_1];
    let row_2: Layout = layout[index_2];
    let temp: number = 0;

    // Swap the rows
    temp = row_2.y;
    row_2.y = row_1.y;
    row_1.y = temp;

    // Update the layout
    layout[index_1] = row_1;
    layout[index_2] = row_2;

    return layout;
}

export function reorderCols(layout: Layout[] | undefined, columnNum: number ): Layout[] | undefined {
    if (!layout) return;
    let columnElements: Layout[] = [];
    let searchIndex: number | undefined = undefined;

    // Scan all placeholder elements in the column
    let temp = spliceLayout(layout, columnNum);
    if (!temp) return;
    
    // Sort array by row number (y)
    temp = sortArray(temp);
    
    // Find index of placeholder elements and non-placeholder elements
    let placeholderIndexes = scanLayout(temp, 'placeholder');
    let elementsIndexes = scanLayout(temp, 'placeholder', true);
    let middleIndex = Math.floor(temp.length / 2);

    if ( !placeholderIndexes || !elementsIndexes || (
        elementsIndexes && elementsIndexes.length === 0 ) || 
        (placeholderIndexes && placeholderIndexes.length === 0) )
        // No placeholder elements or no non-placeholder elements
        // Do nothing
        return;

    if ( elementsIndexes.length === 1  && placeholderIndexes.includes(middleIndex) ) {
        // Swap the rows
        temp = swapRows(temp, placeholderIndexes.filter((element) => element === middleIndex)[0] , elementsIndexes[0]);
    }
    else if ( elementsIndexes.length > 1 ) {
        // Split the array into 2 arrays
        let firstHalf = temp.slice(0, middleIndex);
        let secondHalf = temp.slice(middleIndex, temp.length);

        // Sort the first half by descending order
        firstHalf = sortPlaceholder(firstHalf, 'top');
        console.log(firstHalf);
        secondHalf = sortPlaceholder(secondHalf, 'bottom');
        console.log(secondHalf);

        // Merge the 2 arrays
        temp = firstHalf.concat(secondHalf);
    }
    return temp;
}
//========================================================================