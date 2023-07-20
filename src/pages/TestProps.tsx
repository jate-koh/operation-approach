import { OperationFlowProps } from '@/components/operation-flow/utils/types/Props';
import { randomId } from '@/utils/String';

const min: number = 20;
const max: number = 99;

function randomNodeId(min?: number, max?: number): string {
    // Randomize the ID of the node in this format: [D|E][000-099]{3}
    let id = '';
    let prefix = ['D', 'E'];
    let minNum = min || 0;
    let maxNum = max || 99;
    id += prefix[Math.floor(Math.random() * prefix.length)];
    id += Math.floor(Math.random() * (maxNum - minNum + 1) + minNum).toString().padStart(3, '0');
    return id;
}

function randomShape(): string {
    let shape = ['diamond', 'circle'];
    return shape[Math.floor(Math.random() * shape.length)];
}

export const testProps: OperationFlowProps = {
    operationLines: [
        {
            line: randomId(10, 20),
            type: 'main',
            operationList: [
                {
                    sequence: 1,
                    id: 'D001',
                    shapeType: 'diamond',
                },
                {
                    sequence: 2,
                    id: 'E001',
                    shapeType: 'circle',
                },
                {
                    sequence: 3,
                    id: 'E002',
                    shapeType: 'circle',
                },
                {
                    sequence: 4,
                    id: 'E003',
                    shapeType: 'circle',
                },
                {
                    sequence: 5,
                    id: 'D002',
                    shapeType: 'diamond',
                },
                {
                    sequence: 6,
                    id: 'E005',
                    shapeType: 'circle',
                },
                {
                    sequence: 7,
                    id: 'E004',
                    shapeType: 'circle',
                },
            ],
        },
        {
            line: randomId(10, 20),
            type: 'sub',
            operationList: [
                {
                    sequence: 1,
                    id: randomNodeId(min, max),
                    shapeType: randomShape(),
                },
                {
                    sequence: 4,
                    id: randomNodeId(min, max),
                    shapeType: randomShape(),
                },
                {
                    sequence: 5,
                    id: randomNodeId(min, max),
                    shapeType: randomShape(),
                },
            ]
        },
        {
            line: randomId(10, 20),
            type: 'sub',
            operationList: [
                {
                    sequence: 2,
                    id: randomNodeId(min, max),
                    shapeType: randomShape(),
                }
            ]
        },
        {
            line: 'C27fsE4',
            type: 'sub',
            operationList: [
                {
                    sequence: 1,
                    id: 'D007',
                    shapeType: 'diamond',
                },
            ],
        },
    ],
    headText: 'ปฎิบัติการทางบก',
    tailText: 'เพื่อเอาชนะการรุกราน',
};
