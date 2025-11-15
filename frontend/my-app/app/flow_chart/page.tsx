import { ReactFlow, Background, Controls, MiniMap } from '@xyflow/react';
import '@xyflow/react/dist/style.css';


export default function FlowChart() {
    const initialNodes = [
        {
            id: 'n1',
            position: { x: 0, y: 0 },
            data: { label: 'Node 1' },
            type: 'input',
        },
        {
            id: 'n2',
            position: { x: 100, y: 100 },
            data: { label: 'Node 2' },
        },
        {
            id: 'n3',
            position: { x: 100, y: 150 },
            data: { label: 'Node 3' },
        },
    ];
    const initialEdges = [
        {
            id:'n1-n2',
            source: 'n1',
            target: 'n2',
            type: 'step',
            label: 'edge label',
        },{
            id:'n1-n2',
            source: 'n1',
            target: 'n2',
            type: 'step',
            label: 'edge label',
        }
    ]
    return (
    <div  style={{ maxHeight: 'calc(100% - 40px)',height: 'calc(100% - 40px)', maxWidth:'calc(100% - 40px)', border: '1px solid black', borderRadius:'5px', margin:'40px' }}>
        <ReactFlow nodes={initialNodes} edges={initialEdges}>
            <MiniMap nodeStrokeWidth={2} />
            <Background />
            <Controls />
        </ReactFlow>
    </div>
    );
}