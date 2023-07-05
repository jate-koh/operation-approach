import { OperationFlowGrid } from '@/components/operation-grid/OperationFlowGrid';
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