import { joinClassNames } from "@/utils/String";

export type ShapeTextBoxProps = {
    children?: string | JSX.Element | JSX.Element[];
    lineWeight?: number; // in px
    lineLength?: number; // in px
    lineColor?: string; // in hex
    className?: string; // for inputting additional properties into div
};

const defaultProperties = {
    common: 'min-h-1 min-w-64 horizontal-line',
    divClassName: '',
    lineWeight: 'h-1',
    lineLength: 'w-96',
    lineColor: 'bg-white',
};


export function Line({
    children,
    lineWeight, lineLength, lineColor,
    className,
}: ShapeTextBoxProps) {
    return (
        <div className={
            joinClassNames(
                // Common properties
                defaultProperties.common,

                // Line Weight
                lineWeight ? `h-${lineWeight/4}` : defaultProperties.lineWeight,
                lineLength ? `w-${lineLength/4}` : defaultProperties.lineLength,

                // Line Color
                lineColor ? lineColor : defaultProperties.lineColor,

                // Additional properties
                className ? className : defaultProperties.divClassName,
            )
        }>
            {children}
        </div>
    );
}