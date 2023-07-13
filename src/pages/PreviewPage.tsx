// File Imports
import { OperationFlow } from '@/components/operation-flow/OperationFlow';

// Props Imports
import { testProps } from '@/pages/TestProps';

export function PreviewPage() {
    return (
        <div className='flex justify-center items-center min-h-screen'>
            <OperationFlow {...testProps} />
        </div>
    );
}