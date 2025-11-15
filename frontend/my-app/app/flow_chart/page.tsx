
'use client';
import { ReactFlow, Background, Controls, MiniMap, applyEdgeChanges, applyNodeChanges } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { useCallback, useEffect, useState } from 'react';


export default function FlowChart() {
    
    const [nodes, setNodes] =  useState([])
    const [edges, setEdges] =  useState([])
    const onNodesChange = useCallback((changes:any) => setNodes((nodesSnapshot) => applyNodeChanges(changes, nodesSnapshot)),
        [],
    );
    const onEdgesChange = useCallback((changes:any) => setEdges((edgesSnapshot) => applyEdgeChanges(changes, edgesSnapshot)),
        [],
    );

    useEffect(()=>{
        const makeFlowChartTest = async () =>{
            try {
                const query = "What is the differnce between maps and sets in c++. How are they used differently?";

                const response = await fetch("http://localhost:3004/api/chatbot/query", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ query }),
                });
                
                console.log(response)
                const data = await response.json();
                console.log(data.nodes, data.edges);
                setNodes(data.nodes)
                setEdges(data.edges)
                // console.log("Finished")
            } catch (error) {
                console.log(error)
            }
        }
        makeFlowChartTest()
    },[])


    const initialNodes = [
        {
            id: 'n1',
            position: { x: 0, y: 0 },
            data: { label: 'Desci 1' },
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
            id:'n2-n3',
            source: 'n2',
            target: 'n3',
            type: 'step',
            label: 'edge label',
        }
    ]

    return (
        <div  style={{ maxHeight: 'calc(100% - 40px)',height: 'calc(100% - 40px)', maxWidth:'calc(100% - 40px)', border: '1px solid black', borderRadius:'5px', margin:'40px' }}>
            <ReactFlow 
                nodes={nodes} 
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                fitView
            >
                <MiniMap nodeStrokeWidth={2} />
                <Background />
                <Controls />
            </ReactFlow>
        </div>
    );
}