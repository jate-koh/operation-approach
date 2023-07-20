// Dependencies Imports
import { Layout } from 'react-grid-layout';

// Files Imports
import { OperationJSON, OperationLines } from './types/Props';

//========================================================================
// Basic Functions for Operation Lines
export function findMaxSequence(operationLines: OperationLines): number {
    let highestSeq = 0;
    operationLines.forEach((line) => {
        if (line.operationList.length > highestSeq) {
            highestSeq = line.operationList.length;
        }
    });
    return highestSeq;
}

export function findMinSequence(operationLines: OperationLines): number {
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

export function getJSON(operationLines: OperationLines, id: string): OperationJSON | undefined {
    let json: OperationJSON | undefined = undefined;
    operationLines.forEach((line) => {
        line.operationList.forEach((operation) => {
            if (operation.id === id) {
                json = operation;
            }
        });
    });
    return json;
}
//========================================================================
// Basic Functions for Layout
export function findMaxY(Layout: Layout[]) {
    let maxY = 0;
    Layout.forEach((layout) => {
        if (layout.y > maxY) {
            maxY = layout.y;
        }
    });
    return maxY;
}

//========================================================================