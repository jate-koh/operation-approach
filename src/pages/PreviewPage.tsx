import { Operationflow, operationFlowProps } from '@/components/operationflow/OperationFlow';
import { testProps } from '@/pages/TestProps';

export function PreviewPage() {
    return (
        <Operationflow 
            operationLines={testProps.operationLines}
            headText={testProps.headText}
            tailText={testProps.tailText}
        />
    );
}

// ARCHIVE
// <DndProvider backend={HTML5Backend}>
//     <div className="flex justify-center min-h-screen items-center">
//         <ShapeTextBox 
//             text='ปฎิบัติการทางบก' shapeType='rectangle'
//             hasSolid={{enabled: true}} textClassName='text-black'
//             shrinkable={false} className='w-[256px] h-[128px]'
//         />
//         <Line lineWeight={4} lineColor='bg-white'>
//             <ShapeTextBox
//                 text='D001' shapeType='circle'
//                 hasSolid={{enabled: true}} textClassName='text-black'
//                 shrinkable={false} className='w-[64px] h-[64px]'
//             />

//             <ShapeTextBox
//                 text='D002' shapeType='circle'
//                 hasSolid={{enabled: true}} textClassName='text-black'
//                 shrinkable={false} className='w-[64px] h-[64px]'
//             />
//         </Line>
        
//         <ShapeTextBox 
//             text='เพื่อเอาชนะการรุกราน' shapeType='rectangle'
//             hasSolid={{enabled: true}} textClassName='text-black'
//             shrinkable={false} className='w-[256px] h-[128px]'
//         />
//     </div>
// </DndProvider>