import { FlowHead } from '@/components/operationflow/FlowHead';
import { FlowTail } from '@/components/operationflow/FlowTail';
import { FlowBodyGroup } from '@/components/operationflow/body/FlowBodyGroup';
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
        line: number;
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
    return(
        <DndProvider backend={HTML5Backend}>
            <div className="flex justify-center min-h-screen items-center">
                <FlowHead text={headText} />
                <FlowBodyGroup operationLines={operationLines} />
                <FlowTail text={tailText} />
            </div>
        </DndProvider>
    );
}