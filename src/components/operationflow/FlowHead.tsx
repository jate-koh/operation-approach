import { ShapeTextBox } from '@/components/common/ShapeTextBox';

export type FlowHeadProps = {
    text: string;
};

export function FlowHead({
    text
}: FlowHeadProps) {
    return (
        <ShapeTextBox 
            shapeType='rectangle' text={text} hasSolid={{enabled: true}}
            textClassName='text-black' shrinkable={false} className='w-[256px] h-[128px]'
        />
    );
}