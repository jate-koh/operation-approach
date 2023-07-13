// Files Imports
import { matchInternalShape } from '../utils/Styling';
import { joinClassNames } from '../utils/String';

export type FlowShapeProps = {
    children?: string;

    // Shape Properties
    shapeType?: string;
    shapeWidth?: number; // in px
    shapeHeight?: number; // in px
    hasSolid?: { // if shape has solid color
        enabled: boolean,
        class?: string
    }; 
    hasBorder?: { // if shape has border
        enabled: boolean,
        class?: string
    };
    shrinkable?: boolean; // if shape can shrink

    // Text properties
    text?: string; // text to display within the shape
    isBold?: boolean; // if text is bold
    isItalic?: boolean; // if text is italic
    isUnderline?: boolean; // if text is underlined

    // Class properties
    className?: string; // for inputting additional properties into div
    textClassName?: string; // for inputting additional properties into text
};


const defaultProperties = {
    divClassName: '',
    shape: 'rectangle',
    shapeWidth: 'w-64',
    shapeHeight: 'h-32',
    background: 'bg-white',
    border: 'bg-slate-900 border-white border-2',
    textColor: 'text-black',
    textSize: 'text-2xl',
    shrink: 'flex-shrink',
};

//================================================
// Render

export function FlowShape({ 
    children,
    shapeType, shapeWidth, shapeHeight, shrinkable,
    hasSolid, hasBorder,
    isBold, isItalic, isUnderline, 
    className, textClassName,
    text 
}: FlowShapeProps ) {
    return (
        <div className={
            joinClassNames(
                // Shape Properties
                className ? '' : defaultProperties.divClassName,
                className ? className : '',

                // Shape Type
                matchInternalShape(shapeType ? shapeType : defaultProperties.shape),

                // Shape Width and Height
                shapeWidth ? `w-[${shapeWidth}px]` : defaultProperties.shapeWidth,
                shapeHeight ? `h-[${shapeHeight}px]` : defaultProperties.shapeHeight,

                // Shape Shrinkable
                shrinkable ? defaultProperties.shrink : 'flex-none',

                // Shape Background
                hasSolid && hasSolid.class ? hasSolid.class : // if hasSolid.class is not null
                    hasSolid && hasSolid?.enabled ? defaultProperties.background : '', // if hasSolid.enabled is true but no hasSolid.class is provided
                hasBorder && hasBorder.class ? hasBorder.class : // if hasBorder.class is not null
                    hasBorder && hasBorder?.enabled ? defaultProperties.border : '', // if hasBorder.enabled is true but no hasBorder.class is provided
            )

        }>
            <h1 className={
                joinClassNames(
                    // Text color and size
                    textClassName ? '' : joinClassNames(
                        defaultProperties.textColor,
                        defaultProperties.textSize,
                        
                    ),
                    textClassName ? textClassName : '',
                    
                    // Text decoration
                    isBold ? 'font-bold' : '',
                    isItalic ? 'italic' : '',
                    isUnderline ? 'underline' : '',
                )
            }>
                {
                    // If children is not null, display children
                    children ? children : 
                    // If children is null, display text
                    // If text is null, display default text
                        text ? text : 'Text'
                }
            </h1>
        </div>  
    );
}

//================================================