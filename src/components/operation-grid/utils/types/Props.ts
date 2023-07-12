
//================================================================
export type OperationJSON = {
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

export type OperationList = OperationJSON[];

export type OperationLine = {
    line: string;
    type: 'main' | 'sub';
    operationList: OperationJSON[];
};

export type OperationLines = OperationLine[];

export type OperationFlowProps = {
    children?: string | JSX.Element | JSX.Element[];
    operationLines: OperationLines;
    headText: string;
    tailText: string;
};

export type OperationFlowGridProps = {
    operationLines: OperationLines;
};
//================================================================
