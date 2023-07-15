// Files Imports
import { OperationLine, OperationJSON } from './types/Props';
import { joinStrings } from './String';

// Constant
// WARNING: Using TailwindCSS
export const internalStyling = {
    shape: [
        'circle',
        'square',
        // 'triangle',
        'diamond',
        'placeholder'
    ],
    base: {
        sm: 'w-[32px] h-[32px]',
        md: 'w-[48px] h-[48px]',
        lg: 'w-[64px] h-[64px]',
    },
    color: {
        default: 'bg-white',
    },
};

//========================================================================
export const lineIsInvis = ( operationLine: OperationLine ): string => {
    return operationLine.type === 'sub' ? 'invisible' : ''; // If the line is a subline, return 'invisible' to hide it
}

export const matchInternalShape = ( nodeShape: OperationJSON | string | undefined, nodeSize?: 'sm' | 'md' | 'lg', nodeColor?: string ): string => {
    let shape: string = '';
    if ( !nodeShape ) shape = 'circle';
    if ( typeof nodeShape === 'string' ) shape = nodeShape;
    if ( typeof nodeShape === 'object' && nodeShape.shapeType) shape = nodeShape.shapeType;
    let size = nodeSize ? nodeSize : 'lg';
    let color = nodeColor ? nodeColor : undefined;

    shape = shape.toLowerCase();
    if (!internalStyling.shape.includes(shape)) {
        console.log('Shape not found in internal styling. Using default shape instead.');
        shape = 'circle';
    }

    if (!internalStyling.base[size]) {
        console.log('Size not found in internal styling. Using default size instead.');
        size = 'lg';
    }

    if (color && !color.startsWith('bg-')) {
        console.log('Color not found in internal styling. Using default color instead.');
        color = undefined;
    }

    return joinStrings(
        shape,
        internalStyling.base[size],
        color ? color : 
            shape === 'placeholder' ? 'bg-red-500/50' : internalStyling.color.default,
    );
};
//========================================================================