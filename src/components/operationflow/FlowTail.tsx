import { ShapeTextBox } from "@/components/common/ShapeTextBox";

export type FlowTailProps = {
    text: string;
};

export function FlowTail({
    text
}: FlowTailProps) {
    return (
        <ShapeTextBox 
            shapeType='rectangle' text={text} hasSolid={{enabled: true}}
            textClassName='text-black' shrinkable={false} className='w-[256px] h-[280px]'
        />
    );
}