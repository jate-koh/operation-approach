// Files Imports
import { OperationFlowProps } from '../utils/types/Props';
import { FlowShape } from './FlowShape';

type FlowHeadProps = {
    text: string
}

export function FlowHead({ text }: FlowHeadProps ) {

    return (
        <FlowShape text={text} 
            shapeType='rectangle'
            hasSolid={{enabled: true}} textClassName='text-black'
            shrinkable={true} className='w-[256px] h-[128px]'
        />
    );
}