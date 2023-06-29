import { Operationflow, operationFlowProps } from '@/components/operation-flow/OperationFlow';
import { OperationFlowGrid } from '@/components/operation-grid/OperationFlowGrid';
import { testProps } from '@/pages/TestProps';

export function PreviewPage() {
    return (
    // <Operationflow 
    //     operationLines={testProps.operationLines}
    //     headText={testProps.headText}
    //     tailText={testProps.tailText}
    // />
        <OperationFlowGrid 
            operationLines={testProps.operationLines}
        />

    );
}