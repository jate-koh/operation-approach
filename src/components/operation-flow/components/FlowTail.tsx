// Files Imports
import { OperationFlowProps } from '../utils/types/Props';
import { FlowShape } from './FlowShape';

import './css/index.css';

export function FlowTail({ headText }: OperationFlowProps) {

    return (
        <FlowShape text={headText} 
            shapeType='rectangle'
            hasSolid={{enabled: true}} textClassName='text-black'
            shrinkable={true} className='w-[256px] h-[128px]'
        />
    );
}