// Files Imports
import { OperationLine, OperationJSON } from './types/Props';
import { joinStrings } from './String';

// Constant
// WARNING: Using TailwindCSS
export const internalStyling = {
    shape: [
        'circle',
        'square',
        'rounded-rectangle',
        'diamond',
        'placeholder'
    ],
    base: {
        skip: ' ',
        sm: 'w-[35px] h-[35px]',
        md: 'w-[48px] h-[48px]',
        lg: 'w-[64px] h-[64px]',
    },
    color: {
        skip: ' ',
        placeholder: 'bg-red-500/50',
        default: 'bg-white',
    },
    text: {
        skip: ' ',
        sm: 'text-xs font-semibold',
        md: 'text-sm',
        lg: 'text-base',
    }
};

//========================================================================
export const lineIsInvis = ( operationLine: OperationLine ): string => {
    return operationLine.type === 'sub' ? 'invisible' : ''; // If the line is a subline, return 'invisible' to hide it
}

export const matchInternalShape = ( 
    nodeShape: OperationJSON | string | undefined, 
    nodeSize?: 'sm' | 'md' | 'lg' | 'skip' , 
    nodeColor?: string | 'default' | 'skip',
    nodeTextSize?: 'sm' | 'md' | 'lg' | 'skip',
): string => {
    let shape: string = '';
    if ( !nodeShape ) shape = 'circle';
    if ( typeof nodeShape === 'string' ) shape = nodeShape;
    if ( typeof nodeShape === 'object' && nodeShape.shapeType) shape = nodeShape.shapeType;

    let size = nodeSize ? nodeSize : 'skip';
    let color = nodeColor ? nodeColor : 'default';
    let textSize = nodeTextSize ? nodeTextSize : 'skip';

    shape = shape.toLowerCase();
    if (!internalStyling.shape.includes(shape)) {
        console.log('Shape not found in internal styling. Using default shape instead.');
        shape = 'circle';
    }

    if (size && !internalStyling.base[size]) {
        console.log('Size not found in internal styling. Using default size instead.');
        size = 'lg';
    }

    if (color && !color.startsWith('bg-') && color !== 'skip' && color !== 'default') {
        console.log('Color: ' + color + ' not found in internal styling. Using default color instead.');
        color = 'bg-white';
    }

    if ( textSize && !internalStyling.text[textSize] ) {
        console.log('Text size not found in internal styling. Using default text size instead.');
        textSize = 'lg';
    }

    return joinStrings(
        shape,
        internalStyling.base[size],
        shape === 'placeholder' ? internalStyling.color.placeholder :
            color === 'default' ? internalStyling.color.default :
                color === 'skip' ? internalStyling.color.skip :
                    color.startsWith('bg-') ? color : internalStyling.color.default,
        internalStyling.text[textSize],
    );
};
//========================================================================