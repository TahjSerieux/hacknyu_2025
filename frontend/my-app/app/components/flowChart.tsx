
'use client';
import { ReactFlow, Background, Controls, MiniMap, applyEdgeChanges, applyNodeChanges, MarkerType, Node, Edge } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { useCallback, useEffect, useState, useImperativeHandle, forwardRef } from 'react';
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

const FlowChart = forwardRef(({pre_text}: any, ref) => {

    const [nodes, setNodes] =  useState<Node[]>([])
    const [edges, setEdges] =  useState<Edge[]>([])
    const onNodesChange = useCallback((changes:any) => setNodes((nodesSnapshot) => applyNodeChanges(changes, nodesSnapshot)),
        [],
    );
    const onEdgesChange = useCallback((changes:any) => setEdges((edgesSnapshot) => applyEdgeChanges(changes, edgesSnapshot)),
        [],
    );

    const generateFlowChart = async (userQuery: string) => {
        try {
            const query = "I am a 7 year old girl Explain like im 5 . Please use simple vocabulary that a child could understand. Do not be verbose. " + userQuery;

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
        } catch (error) {
            console.log(error)
        }
    };

    // Expose generateFlowChart to parent component
    useImperativeHandle(ref, () => ({
        generateFlowChart
    }));

    useEffect(()=>{
        // Optional: you can call generateFlowChart with pre_text on mount if needed
        // if (pre_text) {
        //     generateFlowChart(pre_text);
        // }
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
                nodes={nodes} 
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                fitView
                defaultEdgeOptions={{
                    animated: true,
                    style: { stroke: '#dc2626', strokeWidth: 2 }
                }}
            >
                <MiniMap 
                    nodeStrokeWidth={3}
                    nodeColor={(node) => {
                        if (node.type === 'input') return '#dc2626';
                        if (node.type === 'output') return '#10b981';
                        return '#6b7280';
                    }}
                    maskColor="rgba(0, 0, 0, 0.05)"
                    style={{
                        background: 'rgba(255, 255, 255, 0.95)',
                        border: '2px solid #e5e7eb',
                        borderRadius: '8px',
                        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)'
                    }}
                />
                <Background 
                    color="#e5e7eb"
                    gap={20}
                    size={1}
                />
                <Controls 
                    style={{
                        background: 'rgba(255, 255, 255, 0.95)',
                        border: '2px solid #e5e7eb',
                        borderRadius: '8px',
                        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)'
                    }}
                />
            </ReactFlow>
        </div>
    );
});

FlowChart.displayName = 'FlowChart';

export default FlowChart;
