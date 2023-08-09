// Dependencies Imports
import { useEffect, useState } from 'react';

// Files Imports
import { OperationGroupProps, Domains, ColumnSettings } from './utils/types/Props';
import { OperationFlow } from './OperationFlow';

// CSS Imports
import './css/index.css';

// Constants and Types
type GroupState = {
    id: string; 
    groupName: string;
    regionSettings: ColumnSettings | undefined;
    domains: Domains | undefined;
}

const defaultRegionSettings: ColumnSettings = {
    type: 'none',
    minColumn: 20,
    maxColumn: 30,
    unit: 'day',
}

export function OperationGroup({id, groupName, domains, regionSettings}: OperationGroupProps) {
    //=======================================================================
    // React Hooks
    const [groupState, setGroupState] = useState<GroupState>({
        id: '',
        groupName: '',
        regionSettings: undefined,
        domains: undefined,
    });

    // Run on Initialization
    useEffect(() => {
        // Initialize Group State
        setGroupState({
            id: id,
            groupName: groupName ? groupName : '',
            regionSettings: regionSettings ? regionSettings : defaultRegionSettings,
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
                        <OperationFlow key={`${id}${index}`} 
                            {...domain}
                            regionSettings={regionSettings}
                        />
                    );
                })
            }
        </div>
    );
}

export default OperationGroup;