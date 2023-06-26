import { operationFlowProps } from '@/components/operationflow/OperationFlow';

export const testProps: operationFlowProps = {
    operationLines: [
        {
            line: 1,
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
            line: 2,
            operationList: [
                {
                    sequence: 1,
                    id: 'D003',
                    shapeType: 'diamond',
                },
                {
                    sequence: 4,
                    id: 'E006',
                    shapeType: 'circle',
                },
                {
                    sequence: 5,
                    id: 'E007',
                    shapeType: 'circle',
                },
            ]
        },
        {
            line: 3,
            operationList: [
                {
                    sequence: 2,
                    id: 'D004',
                    shapeType: 'diamond',
                }
            ]
        },
    ],
    headText: 'ปฎิบัติการทางบก',
    tailText: 'เพื่อเอาชนะการรุกราน',
};