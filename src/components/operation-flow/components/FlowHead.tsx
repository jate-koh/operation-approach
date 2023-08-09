// Files Imports
import { OperationFlowProps } from '../utils/types/Props';
import { FlowShape } from './FlowShape';

type FlowHeadProps = {
    text: string
}

export function FlowHead({ text }: FlowHeadProps ) {

    return (
        <FlowShape text={text} 
            shapeType='rounded-rectangle'
            hasSolid={{enabled: true}} textClassName='text-black'
            shrinkable={true} className='w-[150px] h-[64px]'
        />
    );
}