// Dependencies Imports
import { useEffect, useState } from 'react';

// Files Imports
import { OperationGroupProps, Domains, ColumnRegionConfigs } from './utils/types/Props';
import { OperationFlow } from './OperationFlow';

// CSS Imports
import './css/index.css';

// Constants and Types
type GroupState = {
    id: string;
    groupName: string;
    domains: Domains | undefined;
}

export function OperationGroup({id, groupName, domains}: OperationGroupProps, regionConfigs?: ColumnRegionConfigs) {
    //=======================================================================
    // React Hooks
    const [groupState, setGroupState] = useState<GroupState>({
        id: '',
        groupName: '',
        domains: undefined,
    });

    // Run on Initialization
    useEffect(() => {
        // Initialize Group State
        setGroupState({
            id: id,
            groupName: groupName ? groupName : '',
            domains: domains ? domains : undefined,
        });
    }, []);

    //=======================================================================
    // Render
    return (
        <div className='graph-group'>
            {
                groupState.domains?.map((domain, index) => {
                    return (
                        <OperationFlow key={`${id}${index}`} {...domain} {...regionConfigs} />
                    );
                })
            }
        </div>
    );
}

export default OperationGroup;