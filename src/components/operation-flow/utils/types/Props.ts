//================================================================
// Operation Group
export type Period = {
    id: string;
    num: number;
    name: string;
    description?: string;
    duration: number;
}
export type ColumnSettings = {
    type: 'period' | 'calendar' | 'none',
    minColumn: number,
    maxColumn: number,
    unit: 'day' | 'week' | 'month' | 'year',
    periods?: Period[];
    calendar?: any; // To be defined
}

export type DomainProp = {
    children?: string | JSX.Element | JSX.Element[];
    regionSettings: ColumnSettings;
    operationLines: OperationLines;
    headText: string;
    tailText: string;
};
export type Domains = DomainProp[];

export type OperationGroupProps = {
    id: string;
    groupName?: string | undefined;
    domains: Domains;
    regionSettings: ColumnSettings;
};
//================================================================
// Operation Flow
export type OperationJSON = {
    sequence: number;
    region: number;
    id?: string;
    key?: string;
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

export type OperationFlowProps = DomainProp;

//================================================================
// Operation Flow Grid
// Deprecated. This is not used anymore.
export type OperationFlowGridProps = {
    operationLines: OperationLines;
};
//================================================================
