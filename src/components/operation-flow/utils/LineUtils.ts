// Files Imports
import { OperationJSON, OperationLines, OperationLine } from './types/Props';
import { findMaxSequence, findMinSequence } from './BaseUtils';
import { randomId } from './String';

// Dependencies Imports
import { Layout } from 'react-grid-layout';

// References
/*  type operationLines = {
    line: string,
    type: main | sub,
    operationList: operationJSON[],
} */

//========================================================================
// Line Processing Functions
export function prepLines(operationLines: OperationLines): OperationLines {
    // If there is even amount of lines, add a blank line
    // if (operationLines.length % 2 === 0) {
    //     operationLines.push({
    //         line: randomId(10, 20),
    //         type: 'sub',
    //         operationList: [],
    //     });
    // }
    return operationLines;
}

export function reorderMiddleLines(operationLines: OperationLines): OperationLines {
    let middleIndex: number = Math.floor(operationLines.length / 2);
    let temp: OperationLines = operationLines;
    let mid: OperationLine | undefined = undefined;

    // Find line that have type 'main' and splice it from the array
    operationLines.forEach((line) => {
        if (line.type === 'main') {
            temp.splice(temp.indexOf(line), 1);
            mid = line;
        }
    });

    if (!mid) {
        console.log('No line with type \'main\' found. The lines is not reordered.');
        return operationLines;
    }
    // Reinsert the line that have type 'main' to the middle of the array
    temp.splice(middleIndex, 0, mid);
    return temp;

}


export function createLayout(operationLines: OperationLines): Layout[] {
    let maxSequence: number = findMaxSequence(operationLines);
    let minSequence: number = findMinSequence(operationLines);

    let layout: Layout[] = [];
    let lineCounter: number = 0;
    operationLines.forEach((line) => {
        let temp = line.operationList;
        // console.log(temp);
        temp.forEach((operation) => {
            // console.log({
            //     i: operation.id ? operation.id : randomId(5, 10),
            //     x: operation.sequence - minSequence,
            //     y: lineCounter,
            //     w: 1,
            //     h: 1,
            // });
            // console.log(operation);
            layout.push({
                i: operation.id ? operation.id : randomId(5, 10),
                x: operation.sequence - minSequence,
                y: lineCounter,
                w: 1,
                h: 1,
            });
        });
        lineCounter++;
    });
    return layout;
}

export function createPlaceholderLayout(operationLines: OperationLines): Layout[] {
    let maxSequence = findMaxSequence(operationLines);
    let minSequence = findMinSequence(operationLines);

    let layout: Layout[] = [];
    for (let i = 0; i < operationLines.length; i++) {
        for (let j = minSequence; j <= maxSequence; j++) {
            layout.push({
                i: randomId(5, 10),
                x: j - minSequence,
                y: i,
                w: 1,
                h: 1,
            });
        }
    }
    return layout;
}
//========================================================================