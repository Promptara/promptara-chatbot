import React, { useCallback, useState } from 'react';
import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
} from '@xyflow/react';
import type { Edge, Node, Connection } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { useChatStore } from '../store/useChatStore';
import { validateFlow } from '../engine/flowEngine';
import {
  StartNode,
  MessageNode,
  OptionsNode,
  GeminiNode,
  WhatsAppNode,
  ConditionNode,
  IntentNode,
  ImageNode
} from '../components/flow/CustomNodes';
import dagre from 'dagre';

const nodeTypes = {
  startNode: StartNode,
  messageNode: MessageNode,
  optionsNode: OptionsNode,
  geminiNode: GeminiNode,
  whatsAppNode: WhatsAppNode,
  conditionNode: ConditionNode,
  intentNode: IntentNode,
  imageNode: ImageNode,
};

const getLayoutedElements = (nodes: Node[], edges: Edge[]) => {
  const dagreGraph = new dagre.graphlib.Graph();
  dagreGraph.setDefaultEdgeLabel(() => ({}));
  dagreGraph.setGraph({ rankdir: 'LR', ranksep: 100, nodesep: 50 });

  nodes.forEach((node) => {
    dagreGraph.setNode(node.id, { width: 250, height: 100 });
  });
  edges.forEach((edge) => {
    dagreGraph.setEdge(edge.source, edge.target);
  });
  dagre.layout(dagreGraph);

  return nodes.map((node) => {
    const nodeWithPosition = dagreGraph.node(node.id);
    return {
      ...node,
      position: { x: nodeWithPosition.x - 125, y: nodeWithPosition.y - 50 },
    };
  });
};

const getId = () => `dndnode_${Date.now()}_${Math.random().toString(36).substring(7)}`;

export default function AdminFlowBuilder() {
  const { flowConfig, setFlowConfig } = useChatStore();
  const [nodes, setNodes, onNodesChange] = useNodesState(flowConfig.nodes || []);
  const [edges, setEdges, onEdgesChange] = useEdgesState(flowConfig.edges || []);
  const [reactFlowInstance, setReactFlowInstance] = useState<any>(null);
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);

  // Sync with Zustand store when it hydrates or changes from other tabs
  React.useEffect(() => {
    if (flowConfig.nodes.length > 0) {
      // Deduplicate nodes if the saved flow was poisoned by the previous bug
      const uniqueNodes: Node[] = [];
      const seenIds = new Set();
      let hasDuplicates = false;
      
      for (const node of flowConfig.nodes) {
        if (seenIds.has(node.id)) {
          hasDuplicates = true;
          uniqueNodes.push({ ...node, id: getId() });
        } else {
          seenIds.add(node.id);
          uniqueNodes.push(node);
        }
      }
      
      setNodes(uniqueNodes);
      setEdges(flowConfig.edges || []);
      
      if (hasDuplicates) {
        setFlowConfig({ nodes: uniqueNodes, edges: flowConfig.edges || [] });
      }
    }
  }, [flowConfig]);
  
  const onConnect = useCallback((params: Connection | Edge) => setEdges((eds) => addEdge(params, eds)), [setEdges]);

  const onDragStart = (event: React.DragEvent, nodeType: string) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();

      const type = event.dataTransfer.getData('application/reactflow');
      if (typeof type === 'undefined' || !type || !reactFlowInstance) {
        return;
      }

      const position = reactFlowInstance.screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });

      const newNode: Node = {
        id: getId(),
        type,
        position,
        data: { label: `${type} node` },
      };
      if (type === 'optionsNode') {
         newNode.data = { ...newNode.data, label: '', options: [{ id: 'opt1', label: 'Option 1' }] };
      }
      
      if (type === 'startNode') {
         newNode.id = 'start_node';
      }
      
      if (type === 'intentNode') {
         newNode.data = { ...newNode.data, label: 'Route by User Text', intents: [{ id: 'intent_1', name: 'Greeting', keywords: 'halo, hai, hi' }] };
      }

      if (type === 'geminiNode') {
         newNode.data = { 
           ...newNode.data, 
           instruction: 'Kamu adalah Customer Service Virtual resmi dari Agency kami.\nATURAN KETAT:\n1. Jawab pertanyaan seputar harga, layanan, dan portofolio.\n2. Harga Web Development mulai dari Rp 5.000.000 (estimasi 2-4 minggu).\n3. Jikalau ada pertanyaan spesifik tentang nego yang tidak ada di data, tawarkan pengguna untuk terhubung ke Tim Sales via WhatsApp.\n4. Gunakan bahasa Indonesia yang ramah, profesional, dan ringkas.'
         };
      }

      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance, setNodes]
  );

  const onLayout = useCallback(() => {
    const layoutedNodes = getLayoutedElements(nodes, edges);
    setNodes([...layoutedNodes]);
    if (reactFlowInstance) {
      setTimeout(() => reactFlowInstance.fitView(), 50);
    }
  }, [nodes, edges, setNodes, reactFlowInstance]);

  const handleSave = () => {
    const { valid, error } = validateFlow(nodes, edges);
    if (!valid) {
      alert(`Validation Error: ${error}`);
      return;
    }
    setFlowConfig(nodes, edges);
    alert('Flow saved successfully!');
  };

  const onNodeClick = (_: React.MouseEvent, node: Node) => {
    setSelectedNode(node);
  };

  const updateNodeData = (key: string, value: any) => {
    if (!selectedNode) return;
    setNodes((nds) =>
      nds.map((n) => {
        if (n.id === selectedNode.id) {
          return { ...n, data: { ...n.data, [key]: value } };
        }
        return n;
      })
    );
    setSelectedNode((prev) => prev ? { ...prev, data: { ...prev.data, [key]: value } } : null);
  };

  const addOption = () => {
    if (!selectedNode || selectedNode.type !== 'optionsNode') return;
    const currentOptions = selectedNode.data.options || [];
    updateNodeData('options', [...currentOptions, { id: `opt_${Date.now()}`, label: 'New Option' }]);
  };

  const updateOption = (index: number, label: string) => {
    if (!selectedNode || selectedNode.type !== 'optionsNode') return;
    const currentOptions = [...(selectedNode.data.options as any[])];
    currentOptions[index].label = label;
    updateNodeData('options', currentOptions);
  };

  return (
    <div className="flex h-screen w-full" style={{ height: '100vh', display: 'flex', width: '100%' }}>
      {/* Sidebar Palette */}
      <div className="w-64 bg-gray-100 p-4 border-r flex flex-col gap-4" style={{ width: '260px', backgroundColor: '#f8fafc', borderRight: '1px solid #e2e8f0', padding: '20px' }}>
        <h2 className="text-xl font-bold mb-2" style={{ color: '#0f172a' }}>Nodes</h2>
        <div className="text-sm mb-4" style={{ color: '#64748b' }}>Drag to build workflow</div>
        <div onDragStart={(e) => onDragStart(e, 'startNode')} draggable style={{ padding: '10px 14px', border: '1px solid #e2e8f0', marginBottom: '8px', cursor: 'grab', backgroundColor: 'white', borderRadius: '6px', borderLeft: '4px solid #10B981', fontWeight: 'bold', fontSize: '14px', color: '#334155', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>Start Node</div>
        <div onDragStart={(e) => onDragStart(e, 'messageNode')} draggable style={{ padding: '10px 14px', border: '1px solid #e2e8f0', marginBottom: '8px', cursor: 'grab', backgroundColor: 'white', borderRadius: '6px', borderLeft: '4px solid #3B82F6', fontWeight: 'bold', fontSize: '14px', color: '#334155', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>Message Node</div>
        <div onDragStart={(e) => onDragStart(e, 'optionsNode')} draggable style={{ padding: '10px 14px', border: '1px solid #e2e8f0', marginBottom: '8px', cursor: 'grab', backgroundColor: 'white', borderRadius: '6px', borderLeft: '4px solid #8B5CF6', fontWeight: 'bold', fontSize: '14px', color: '#334155', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>Options Node</div>
        <div onDragStart={(e) => onDragStart(e, 'imageNode')} draggable style={{ padding: '10px 14px', border: '1px solid #e2e8f0', marginBottom: '8px', cursor: 'grab', backgroundColor: 'white', borderRadius: '6px', borderLeft: '4px solid #06B6D4', fontWeight: 'bold', fontSize: '14px', color: '#334155', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>Image Node</div>
        <div onDragStart={(e) => onDragStart(e, 'geminiNode')} draggable style={{ padding: '10px 14px', border: '1px solid #e2e8f0', marginBottom: '8px', cursor: 'grab', backgroundColor: 'white', borderRadius: '6px', borderLeft: '4px solid #F97316', fontWeight: 'bold', fontSize: '14px', color: '#334155', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>Gemini AI Node</div>
        <div onDragStart={(e) => onDragStart(e, 'whatsAppNode')} draggable style={{ padding: '10px 14px', border: '1px solid #e2e8f0', marginBottom: '8px', cursor: 'grab', backgroundColor: 'white', borderRadius: '6px', borderLeft: '4px solid #22C55E', fontWeight: 'bold', fontSize: '14px', color: '#334155', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>WhatsApp Node</div>
        <div onDragStart={(e) => onDragStart(e, 'conditionNode')} draggable style={{ padding: '10px 14px', border: '1px solid #e2e8f0', cursor: 'grab', backgroundColor: 'white', borderRadius: '6px', borderLeft: '4px solid #EAB308', fontWeight: 'bold', fontSize: '14px', color: '#334155', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', marginBottom: '8px' }}>If-Else Node</div>
        <div onDragStart={(e) => onDragStart(e, 'intentNode')} draggable style={{ padding: '10px 14px', border: '1px solid #e2e8f0', cursor: 'grab', backgroundColor: 'white', borderRadius: '6px', borderLeft: '4px solid #8B5CF6', fontWeight: 'bold', fontSize: '14px', color: '#334155', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>Intent Router</div>
      </div>

      {/* Canvas */}
      <div className="flex-1 relative" style={{ flex: 1, height: '100%', position: 'relative' }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onInit={setReactFlowInstance}
          onDrop={onDrop}
          onDragOver={onDragOver}
          onNodeClick={onNodeClick}
          nodeTypes={nodeTypes}
          defaultEdgeOptions={{ type: 'smoothstep', animated: true, style: { strokeWidth: 2, stroke: '#94a3b8' } }}
          fitView
        >
          <Controls />
          <MiniMap nodeStrokeColor="#ccc" nodeColor="#fff" />
          <Background gap={20} size={1} color="#e2e8f0" />
        </ReactFlow>
        <button
          onClick={onLayout}
          style={{ position: 'absolute', top: '16px', right: '450px', zIndex: 10, backgroundColor: '#10B981', color: 'white', padding: '10px 20px', borderRadius: '8px', border: 'none', cursor: 'pointer', fontWeight: 'bold', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', fontSize: '14px' }}
        >
          ✨ Auto Layout
        </button>
        <button
          onClick={handleSave}
          className="absolute top-4 right-4 bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700 z-10"
          style={{ position: 'absolute', top: '16px', right: '320px', zIndex: 10, backgroundColor: '#2563eb', color: 'white', padding: '10px 20px', borderRadius: '8px', border: 'none', cursor: 'pointer', fontWeight: 'bold', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', fontSize: '14px' }}
        >
          Save Flow
        </button>
      </div>

      {/* Property Inspector */}
      <div className="w-72 bg-gray-50 p-4 border-l flex flex-col overflow-y-auto" style={{ width: '300px', backgroundColor: '#f9fafb', borderLeft: '1px solid #e5e7eb', padding: '16px' }}>
        <h2 className="text-lg font-bold mb-4">Inspector</h2>
        {selectedNode ? (
          <div className="flex flex-col gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Node ID</label>
              <input type="text" readOnly value={selectedNode.id} className="w-full border p-2 rounded bg-gray-200" />
            </div>
            
            {['messageNode', 'optionsNode', 'startNode'].includes(selectedNode.type!) && (
              <div>
                <label className="block text-sm font-medium mb-1">Text / Label</label>
                <textarea 
                  value={selectedNode.data.label as string || ''}
                  onChange={(e) => updateNodeData('label', e.target.value)}
                  className="w-full border p-2 rounded"
                  rows={3}
                />
              </div>
            )}

            {selectedNode.type === 'imageNode' && (
              <div>
                <label className="block text-sm font-medium mb-1">Image URL</label>
                <input
                  type="text"
                  placeholder="e.g. /Prompbot.jfif or https://..."
                  value={selectedNode.data.imageUrl as string || ''}
                  onChange={(e) => updateNodeData('imageUrl', e.target.value)}
                  className="w-full border p-2 rounded"
                />
              </div>
            )}

            {selectedNode.type === 'geminiNode' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Welcome Message</label>
                  <textarea
                    value={selectedNode.data.welcomeMessage as string || ''}
                    onChange={(e) => updateNodeData('welcomeMessage', e.target.value)}
                    className="w-full border p-2 rounded"
                    rows={2}
                    placeholder="E.g., Halo! Anda terhubung dengan PromBot."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Core Knowledge Base & AI Instructions</label>
                  <textarea
                    value={selectedNode.data.instruction as string || ''}
                    onChange={(e) => updateNodeData('instruction', e.target.value)}
                    className="w-full border p-2 rounded text-sm"
                    rows={12}
                    placeholder="E.g., Kamu adalah Customer Service Virtual resmi..."
                  />
                </div>
              </div>
            )}

            {selectedNode.type === 'optionsNode' && (
              <div>
                <label className="block text-sm font-medium mb-2">Options</label>
                {(selectedNode.data.options as any[] || []).map((opt, i) => (
                  <div key={opt.id} className="mb-2">
                    <input
                      type="text"
                      value={opt.label}
                      onChange={(e) => updateOption(i, e.target.value)}
                      className="w-full border p-2 rounded text-sm"
                    />
                  </div>
                ))}
                <button onClick={addOption} className="mt-2 text-sm text-blue-600 hover:underline">+ Add Option</button>
              </div>
            )}

            {selectedNode.type === 'whatsAppNode' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Redirect Message</label>
                  <input
                    type="text"
                    placeholder="e.g., Mengarahkan Anda ke WhatsApp..."
                    value={selectedNode.data.label as string || ''}
                    onChange={(e) => updateNodeData('label', e.target.value)}
                    className="w-full border p-2 rounded"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Phone Number</label>
                  <input
                    type="text"
                    placeholder="+628123456789"
                    value={selectedNode.data.phone as string || ''}
                    onChange={(e) => updateNodeData('phone', e.target.value)}
                    className="w-full border p-2 rounded"
                  />
                </div>
              </div>
            )}
            {selectedNode.type === 'conditionNode' && (
              <>
                <label className="text-sm font-bold">Condition Type</label>
                <select
                  value={selectedNode.data?.conditionType as string || 'keyword'}
                  onChange={(e) => {
                    setNodes(nodes.map(n => n.id === selectedNode.id ? { ...n, data: { ...n.data, conditionType: e.target.value } } : n));
                    setSelectedNode({ ...selectedNode, data: { ...selectedNode.data, conditionType: e.target.value } });
                  }}
                  className="border p-2 rounded"
                >
                  <option value="keyword">Keyword Match</option>
                  <option value="time">Business Hours (08:00 - 17:00)</option>
                </select>
                {(!selectedNode.data?.conditionType || selectedNode.data?.conditionType === 'keyword') && (
                  <>
                    <label className="text-sm font-bold mt-2">Trigger Keyword</label>
                    <input
                      type="text"
                      placeholder="e.g. harga, komplain"
                      value={selectedNode.data?.keyword as string || ''}
                      onChange={(e) => {
                        setNodes(nodes.map(n => n.id === selectedNode.id ? { ...n, data: { ...n.data, keyword: e.target.value } } : n));
                        setSelectedNode({ ...selectedNode, data: { ...selectedNode.data, keyword: e.target.value } });
                      }}
                      className="border p-2 rounded"
                    />
                  </>
                )}
              </>
            )}
            {selectedNode.type === 'intentNode' && (
              <div>
                <label className="block text-sm font-medium mb-1">Text / Label</label>
                <input
                  type="text"
                  value={selectedNode.data.label as string || ''}
                  onChange={(e) => updateNodeData('label', e.target.value)}
                  className="w-full border p-2 rounded mb-4"
                />
                
                <label className="block text-sm font-medium mb-2">Intents</label>
                {(selectedNode.data.intents as any[] || []).map((intent, i) => (
                  <div key={intent.id} className="mb-3 p-3 bg-white border rounded shadow-sm">
                    <label className="block text-xs font-bold mb-1">Intent Name</label>
                    <input
                      type="text"
                      value={intent.name}
                      onChange={(e) => {
                        const newIntents = [...(selectedNode.data.intents as any[])];
                        newIntents[i].name = e.target.value;
                        updateNodeData('intents', newIntents);
                      }}
                      className="w-full border p-1 rounded text-sm mb-2"
                      placeholder="e.g. Greeting"
                    />
                    <label className="block text-xs font-bold mb-1">Keywords (comma-separated)</label>
                    <input
                      type="text"
                      value={intent.keywords}
                      onChange={(e) => {
                        const newIntents = [...(selectedNode.data.intents as any[])];
                        newIntents[i].keywords = e.target.value;
                        updateNodeData('intents', newIntents);
                      }}
                      className="w-full border p-1 rounded text-sm"
                      placeholder="e.g. halo, hai, hi"
                    />
                    <button
                      onClick={() => {
                        const newIntents = (selectedNode.data.intents as any[]).filter((_, idx) => idx !== i);
                        updateNodeData('intents', newIntents);
                      }}
                      className="text-xs text-red-500 mt-2 hover:underline"
                    >
                      Remove
                    </button>
                  </div>
                ))}
                <button 
                  onClick={() => {
                    const currentIntents = selectedNode.data.intents as any[] || [];
                    updateNodeData('intents', [...currentIntents, { id: `intent_${Date.now()}`, name: 'New Intent', keywords: '' }]);
                  }} 
                  className="mt-2 text-sm text-blue-600 hover:underline"
                >
                  + Add Intent
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="text-sm text-gray-500">Select a node to edit its properties.</div>
        )}
      </div>
    </div>
  );
}
