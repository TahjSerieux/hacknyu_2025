
'use client';
import { ReactFlow, Background, Controls, MiniMap, applyEdgeChanges, applyNodeChanges, MarkerType, Node, Edge } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { useCallback, useEffect, useState } from 'react';
import dagre from 'dagre';

// Dagre layout configuration
const dagreGraph = new dagre.graphlib.Graph();
dagreGraph.setDefaultEdgeLabel(() => ({}));

const nodeWidth = 172;
const nodeHeight = 36;

const getLayoutedElements = (nodes: Node[], edges: Edge[], direction = 'TB') => {
    const isHorizontal = direction === 'LR';
    dagreGraph.setGraph({ rankdir: direction, nodesep: 100, ranksep: 150 });

    nodes.forEach((node) => {
        dagreGraph.setNode(node.id, { width: nodeWidth, height: nodeHeight });
    });

    edges.forEach((edge) => {
        dagreGraph.setEdge(edge.source, edge.target);
    });

    dagre.layout(dagreGraph);

    const layoutedNodes = nodes.map((node) => {
        const nodeWithPosition = dagreGraph.node(node.id);
        return {
            ...node,
            position: {
                x: nodeWithPosition.x - nodeWidth / 2,
                y: nodeWithPosition.y - nodeHeight / 2,
            },
        };
    });

    return { nodes: layoutedNodes, edges };
};

export default function FlowChart() {

    const [nodes, setNodes] =  useState<Node[]>([])
    const [edges, setEdges] =  useState<Edge[]>([])
    const onNodesChange = useCallback((changes:any) => setNodes((nodesSnapshot) => applyNodeChanges(changes, nodesSnapshot)),
        [],
    );
    const onEdgesChange = useCallback((changes:any) => setEdges((edgesSnapshot) => applyEdgeChanges(changes, edgesSnapshot)),
        [],
    );

    useEffect(()=>{
        const makeFlowChartTest = async () =>{
            try {
                const query = "I am a 7 year old girl Explain like im 5 how does gravity work? Please use simple vocabulary that a child could understand. Do not be verbose";

                const response = await fetch("http://localhost:3004/api/chatbot/query", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ query }),
                });
                
                console.log(response)
                const data = await response.json();
                console.log(data.nodes, data.edges);
                const edgesWithMarkers = data.edges.map((edge: Edge) => ({
                    ...edge,
                    markerEnd: {
                        type: MarkerType.ArrowClosed,
                        width: 20,
                        height: 20,
                        color: '#FF0072',
                    },
                    }));

                // Apply Dagre layout to organize nodes
                const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(
                    data.nodes,
                    edgesWithMarkers,
                    'TB' // TB = top to bottom, LR = left to right
                );

                setNodes(layoutedNodes)
                setEdges(layoutedEdges)
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
             markerEnd: {
                type: MarkerType.ArrowClosed,
                width: 20,
                height: 20,
                color: '#FF0072',
                }
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
                nodes={nodes } 
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