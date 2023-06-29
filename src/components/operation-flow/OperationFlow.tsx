import { FlowHead } from '@/components/operation-flow/FlowHead';
import { FlowTail } from '@/components/operation-flow/FlowTail';
import { FlowBodyGroup } from '@/components/operation-flow/body/FlowBodyGroup';

import { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

export type operationJSON = {
    sequence: number;
    id?: string;
    shapeType: string | 'placeholder';
    description?: string;
    link?: {
        id: string;
        positon: 'before' | 'after';
        allowQueueJump: boolean,
    };
}


export type operationList = operationJSON[];

export type operationLines = {
        line: string;
        type: 'main' | 'sub';
        operationList: operationJSON[];
}[];

export type operationFlowProps = {
    children?: string | JSX.Element | JSX.Element[];
    operationLines: operationLines;
    headText: string;
    tailText: string;
};

export function Operationflow({
    children,
    operationLines,
    headText, tailText,
}: operationFlowProps ) {

    const [currentHeadText, setHeadText] = useState<string>(headText);
    const [currentTailText, setTailText] = useState<string>(tailText);
    const [operationLinesState, setOperationLinesState] = useState<operationLines>(operationLines);
    
    return(
        <DndProvider backend={HTML5Backend}>
            <div className="flex justify-center min-h-screen items-center">
                <FlowHead text={currentHeadText} />
                <FlowBodyGroup operationLines={operationLinesState} />
                <FlowTail text={currentTailText} />
            </div>
        </DndProvider>
    );
}