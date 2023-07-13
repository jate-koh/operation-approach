// Files Imports
import { OperationLines } from './types/Props';

//========================================================================
// Basic Functions
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
//========================================================================