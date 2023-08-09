// File Imports
import OperationFlow from '@/components/operation-flow/OperationFlow';
import OperationGroup from '@/components/operation-flow/OperationGroup';

import { ColumnSettings , OperationGroupProps } from '@/components/operation-flow/utils/types/Props';

// Props Imports
import { generateProps } from '@/pages/Demo';
import { testProps } from '@/pages/Test';

const domainProps: OperationGroupProps = generateProps(1, 15);
const columnSettings: ColumnSettings = {
    type: 'period',
    minColumn: 25,
    maxColumn: 35,
    unit: 'day',
    periods: [
        {
            id: '1',
            num: 1,
            name: 'Period 1',
            duration: 20,
        },
        {
            id: '2',
            num: 2,
            name: 'Period 2',
            duration: 30,
        },
        {
            id: '3',
            num: 3,
            name: 'Period 3',
            duration: 40,
        },
    ]
}

export function PreviewPage() {
    return (
        <div className='flex justify-center items-center min-h-screen'>
            {/* <OperationFlow {...testProps} />
            <OperationFlow {...testProps} />
            <OperationFlow {...testProps} /> */}

            <OperationGroup {...domainProps} regionSettings={columnSettings} />
        </div>
    );
}

export default PreviewPage;