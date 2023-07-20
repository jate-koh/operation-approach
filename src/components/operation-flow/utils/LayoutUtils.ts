// Dependencies Imports
import { Layout } from 'react-grid-layout';

// Files Imports
import { RowMap, ColumnMap, RowPopulationMap } from './types/UtilsProps';
import { randomId } from './String';

//================================================================
// Layout Population Check
export function checkRowUsage(layout: Layout[]): RowMap {
    let rowUsage: RowMap = {};
    layout.forEach((layoutItem) => {
        if (rowUsage[layoutItem.y]) {
            rowUsage[layoutItem.y].push(layoutItem);
        } else {
            rowUsage[layoutItem.y] = [layoutItem];
        }
    });
    return rowUsage;
}

export function checkColsUsage(layout: Layout[]): ColumnMap {
    let colsUsage: ColumnMap = {};
    layout.forEach((layoutItem) => {
        if (colsUsage[layoutItem.x]) {
            colsUsage[layoutItem.x].push(layoutItem);
        } else {
            colsUsage[layoutItem.x] = [layoutItem];
        }
    });
    return colsUsage;
}
//================================================================
// Layout Operations
function sortLayout(layout: Layout[], sortBy?: 'x' | 'y'): Layout[] {
    let sort = sortBy ? sortBy : 'y';
    layout.sort((a, b) => {
        if (sort === 'y') {
            if (a.y > b.y) {
                return 1;
            } else if (a.y < b.y) {
                return -1;
            } else {
                return 0;
            }
        } else {
            if (a.x > b.x) {
                return 1;
            } else if (a.x < b.x) {
                return -1;
            } else {
                return 0;
            }
        }
    });
    return layout;
}

function swapRow(rowMap: RowMap, row1: number, row2: number): RowMap {
    let temp = rowMap[row1];
    rowMap[row1] = rowMap[row2];
    rowMap[row2] = temp;
    rowMap = updateRow(rowMap);
    return rowMap;
}

function updateRow(rowMap: RowMap): RowMap {
    // Update Y value of each layout item
    Object.keys(rowMap).forEach((key) => {
        rowMap[parseInt(key)].forEach((layoutItem) => {
            layoutItem.y = parseInt(key);
        });
    });
    return rowMap;
}

export function convertRowMap(rowMap: RowMap): Layout[] {
    // Convert rowMap to layout
    let layout: Layout[] = [];
    Object.keys(rowMap).forEach((key) => {
        layout = layout.concat(rowMap[parseInt(key)]);
    });
    return layout;
}

export function convertColsMap(colsMap: ColumnMap): Layout[] {
    // Convert colsMap to layout
    let layout: Layout[] = [];
    Object.keys(colsMap).forEach((key) => {
        layout = layout.concat(colsMap[parseInt(key)]);
    });
    return sortLayout(layout, 'y');
}
//================================================================
// Value Layout Extension
export function cutUnusedRow(layout: Layout[]): [Layout[], number] {
    let rowMap: RowMap = checkRowUsage(layout);
    let usedIndex: number[] = [];
    Object.keys(rowMap).forEach((key) => {
        usedIndex.push(parseInt(key)); 
    });

    // Check if number is sequential and find out which number is missing
    usedIndex.sort((a, b) => a - b);
    let missingIndex: number = 0;
    let continuous: boolean = true;
    for (let i = 0; i < usedIndex.length - 1; i++) {
        if (usedIndex[i] + 1 !== usedIndex[i + 1]) {
            continuous = false;
            missingIndex = usedIndex[i] + 1;
            break;
        }
    }
    if (!continuous) {
        // Move last row to missing index
        rowMap[missingIndex] = rowMap[usedIndex[usedIndex.length - 1]];
        delete rowMap[usedIndex[usedIndex.length - 1]];
    }
    rowMap = updateRow(rowMap);
    layout = convertRowMap(rowMap);
    // console.log( continuous ? 'No row is cut' : `Row ${usedIndex[usedIndex.length - 1]} is cut`);
    return [ layout, continuous ? usedIndex.length : usedIndex[usedIndex.length - 1] ];
}
//================================================================
// Value Layout Population
export function populateMiddle(layout: Layout[], middleIndex: number): Layout[] {
    console.log('Middle Index: ', middleIndex);
    let rowMap = checkRowUsage(layout);
    let colsMap = checkColsUsage(layout);

    // Step 1 - Make sure the middle row is the most populated row
    // Find the index of most populated row
    let maxRow: number = 0;
    let maxRowLength: number = 0;
    Object.keys(rowMap).forEach((key) => {
        if (rowMap[parseInt(key)].length > maxRowLength) {
            maxRow = parseInt(key);
            maxRowLength = rowMap[parseInt(key)].length;
        }
    });
    // If the most populated row is not middle row, and the middle it has population more than middle row
    console.log('Max Row: ', maxRow, '\nMiddle Row: ', middleIndex);
    if (maxRow !== middleIndex && rowMap[maxRow].length > rowMap[middleIndex].length) 
        rowMap = swapRow(rowMap, maxRow, middleIndex);

    // Step 2 - Make the rows in the middle/inside more populated than outer rows
    // Split Row Map into 2 parts with the middle row as the divider
    let rowMap1: RowMap = {};
    let rowMap2: RowMap = {};
    Object.keys(rowMap).forEach((key) => {
        if (parseInt(key) < middleIndex) rowMap1[parseInt(key)] = rowMap[parseInt(key)];
        else if (parseInt(key) >= middleIndex) rowMap2[parseInt(key)] = rowMap[parseInt(key)];
    });

    // Sort the 2 parts by length
    // Sort first part in ascending order
    Object.keys(rowMap1).forEach((key) => {
        if (rowMap1[parseInt(key)].length > rowMap1[parseInt(key) + 1]?.length) {
            swapRow(rowMap1, parseInt(key), parseInt(key) + 1);
        }
    });

    // Sort second part in descending order
    Object.keys(rowMap2).forEach((key) => {
        if (rowMap2[parseInt(key)].length < rowMap2[parseInt(key) + 1]?.length) {
            swapRow(rowMap2, parseInt(key), parseInt(key) + 1);
        }
    });

    // Combine the 2 parts back together
    rowMap = { ...rowMap1, ...rowMap2 };
    layout = convertRowMap(rowMap);
    return layout;
}

//================================================================
// Placeholder Layout Operations
export function recreatePlaceholderLayout(currentRows: number, currentCols: number ) {
    let layout: Layout[] = [];
    for (let i = 0; i < currentRows; i++) {
        for (let j = 0; j < currentCols; j++) {
            layout.push({
                i: randomId(5, 10),
                x: j,
                y: i,
                w: 1,
                h: 1,
            });
        }
    }
    return layout;
}

//================================================================