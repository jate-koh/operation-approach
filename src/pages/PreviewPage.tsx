import { OperationFlowGrid } from '@/components/operation-grid-demo/OperationFlowGrid';
import { testProps } from '@/pages/TestProps';

export function PreviewPage() {
    return (
        <div className='flex justify-center'>
            <OperationFlowGrid 
                operationLines={testProps.operationLines}
            />
        </div>
    );
}