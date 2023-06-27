import { Operationflow, operationFlowProps } from '@/components/operationflow/OperationFlow';
import { testProps } from '@/pages/TestProps';

export function PreviewPage() {
    return (
        <Operationflow 
            operationLines={testProps.operationLines}
            headText={testProps.headText}
            tailText={testProps.tailText}
        />
    );
}