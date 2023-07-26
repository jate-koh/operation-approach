// File Imports
import OperationFlow from '@/components/operation-flow/OperationFlow';
import OperationGroup from '@/components/operation-flow/OperationGroup';

import { ColumnRegionConfigs, OperationGroupProps } from '@/components/operation-flow/utils/types/Props';

// Props Imports
import { generateProps } from '@/pages/Demo';
import { testProps } from '@/pages/Test';

const domainProps: OperationGroupProps = generateProps(1, 15);
const regionProps: ColumnRegionConfigs = [
    {   
        regionNum: 0,
        regionName: 'Prepare Provision',
        regionDescription: '30 days' //number
    },
    {
        regionNum: 1,
        regionName: 'Raiding',
        regionDescription: '15 - 20 days' //number
    },
];

export function PreviewPage() {
    return (
        <div className='flex justify-center items-center min-h-screen'>
            {/* <OperationFlow {...testProps} />
            <OperationFlow {...testProps} />
            <OperationFlow {...testProps} /> */}

            <OperationGroup {...domainProps} {...regionProps} />
        </div>
    );
}

export default PreviewPage;