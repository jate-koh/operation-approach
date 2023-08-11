import { OperationFlowProps, OperationGroupProps, OperationLines, OperationList, Domains } from '@/components/operation-flow/utils/types/Props';
import { randomId } from '@/utils/String';

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

function randomHeadText(): string {
    let minNum = 0;
    let maxNum = 99;
    return 'Mission ' + Math.floor(Math.random() * (maxNum - minNum + 1) + minNum).toString().padStart(3, '0');
}

function randomTailText(): string {
    let minNum = 0;
    let maxNum = 99;
    return 'Objective ' + Math.floor(Math.random() * (maxNum - minNum + 1) + minNum).toString().padStart(3, '0');
}

function checkDuplicateId(operationLines: OperationLines): boolean {
    let idList: string[] = [];
    operationLines.forEach((line) => {
        line.operationList.forEach((node) => {
            node.id && idList.push(node.id);
        });
    });
    // Iterate through the list of IDs and check if there is any duplicate
    for (let i = 0; i < idList.length; i++) {
        for (let j = i + 1; j < idList.length; j++) {
            if (idList[i] === idList[j]) {
                return true;
            }
        }
    }
    return false;
}
var bannedId: string[] = [
    'D000',
    'D001',
    'D002',
    'E001',
    'E002',
    'E003',
    'E004',
    'E005',
];
var usedIdStack: string[] = [];

function generateLine(nodeLimit: number, lineLimit: number): OperationLines {
    let line: OperationLines = [];
    let lineCount: number = Math.floor(Math.random() * (lineLimit - 1 + 1) + 1);

    line.push({
        line: randomId(10, 20),
        type: 'main',
        operationList: mainLine,
    });

    let nodeCounter: number = 0;
    for (let i = 0; i < lineCount; i++) {
        let elementCount = Math.floor(Math.random() * (10 - 1 + 1) + 1);
        let elements: OperationList = [];
        for (let j = 0; j < elementCount; j++) {
            if ( nodeCounter >= nodeLimit) break;
            let id: string;
            // console.log('Used ID Stack: ', usedIdStack);
            do id = randomNodeId();
            while (usedIdStack.includes(id) || bannedId.includes(id));
            elements.push({
                region: 0,
                sequence: Math.floor(Math.random() * (10 - 1 + 1) + 1),
                id: id,
                key: '_' + id,
                shapeType: randomShape(),
            });
            usedIdStack.push(id);
            nodeCounter++;
        }
        if ( nodeCounter >= nodeLimit) break;
        line.push({
            line: randomId(10, 20),
            type: 'sub',
            operationList: elements,
        });
    }
    return line;
}

export function generateProps(domainCount?: number, nodeLimit?: number,  lineLimit?: number): OperationGroupProps {
    usedIdStack = []; // Reset the stack
    
    let nodeLimiter: number = nodeLimit || 20;
    let lineLimiter: number = lineLimit || 4;
    let props: OperationGroupProps = {
        id: randomId(10, 20),
        groupName: 'Group ' + Math.floor(Math.random() * (99 - 0 + 1) + 0).toString().padStart(3, '0'),
        domains: [],
    };

    let generatedDomains: Domains = [];
    let count = domainCount || Math.floor(Math.random() * (10 - 1 + 1) + 1);
    for (let i = 0; i < count; i++) {
        generatedDomains.push({
            operationLines: generateLine(nodeLimiter, lineLimiter),
            headText: randomHeadText(),
            tailText: randomTailText(),
        });
    }
    props.domains = generatedDomains;

    return props;
}

const mainLine: OperationList = [
    {
        region: 0,
        sequence: 1,
        key: '_D001',
        id: 'D001',
        shapeType: 'diamond',
    },
    {
        region: 0,
        sequence: 2,
        id: 'E001',
        key: '_E001',
        shapeType: 'circle',
    },
    {
        region: 0,
        sequence: 3,
        id: 'E002',
        key: '_E002',
        shapeType: 'circle',
    },
    {
        region: 0,
        sequence: 4,
        id: 'E003',
        key: '_E003',
        shapeType: 'circle',
    },
    {
        region: 0,
        sequence: 5,
        id: 'D002',
        key: '_D002',
        shapeType: 'diamond',
    },
    {
        region: 0,
        sequence: 6,
        id: 'E005',
        key: '_E005',
        shapeType: 'circle',
    },
    {
        region: 0,
        sequence: 7,
        id: 'E004',
        key: '_E004',
        shapeType: 'circle',
    },
];
