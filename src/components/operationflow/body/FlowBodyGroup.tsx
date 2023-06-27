import { FlowBody } from '@/components/operationflow/body/FlowBody';
import { operationLines } from '@/components/operationflow/OperationFlow';
import { joinClassNames } from '@/utils/String';
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
    
    return(
        <div className={
            joinClassNames(
                'grid grid-cols-1',
                matchGap(operationLinesState),
            )
        }>
            {operationLinesState.map((line, index) => (
                <FlowBody key={index} operationList={line.operationList} type={line.type}/>
            ))}
        </div>
    );
}