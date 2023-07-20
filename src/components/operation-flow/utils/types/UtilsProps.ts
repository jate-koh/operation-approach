import { Layout } from 'react-grid-layout';

export type RowMap = {
    [y: number]:  Layout[];
};
    
export type ColumnMap = {
    [x: number]: Layout[];
};

export type RowPopulationMap = {
    [y: number]: number;
}