import type { Node, Edge } from '@xyflow/react';

export const validateFlow = (nodes: Node[], edges: Edge[]): { valid: boolean; error?: string } => {
  const startNode = nodes.find((n) => n.type === 'startNode');
  if (!startNode) {
    return { valid: false, error: 'Flow must have a Start Node.' };
  }

  const optionsNodes = nodes.filter((n) => n.type === 'optionsNode');
  for (const node of optionsNodes) {
    const hasOutgoing = edges.some((e) => e.source === node.id);
    if (!hasOutgoing) {
      return { valid: false, error: `Options Node "${node.data?.label || node.id}" must have outgoing connections to avoid dead-ends.` };
    }
  }

  const conditionNodes = nodes.filter((n) => n.type === 'conditionNode');
  for (const node of conditionNodes) {
    const hasTrue = edges.some((e) => e.source === node.id && e.sourceHandle === 'true');
    const hasFalse = edges.some((e) => e.source === node.id && e.sourceHandle === 'false');
    if (!hasTrue || !hasFalse) {
      return { valid: false, error: 'Condition Node must have both True and False outgoing connections.' };
    }
  }

  const intentNodes = nodes.filter((n) => n.type === 'intentNode');
  for (const node of intentNodes) {
    const hasFallback = edges.some((e) => e.source === node.id && e.sourceHandle === 'fallback');
    if (!hasFallback) {
      return { valid: false, error: `Intent Router "${node.data?.label || node.id}" must have a fallback connection.` };
    }
  }

  return { valid: true };
};

export const getNextNode = (
  flowConfig: { nodes: Node[]; edges: Edge[] },
  currentNodeId: string,
  optionSelected?: string
): Node | null => {
  const { nodes, edges } = flowConfig;
  
  if (optionSelected) {
    // Try to find the edge that connects from the specific option handle
    const targetEdge = edges.find(
      (e) => e.source === currentNodeId && e.sourceHandle === optionSelected
    );
    if (targetEdge) {
      return nodes.find((n) => n.id === targetEdge.target) || null;
    }
  }

  // Fallback to default outgoing edge (for message nodes, etc)
  const outgoingEdge = edges.find((e) => e.source === currentNodeId);
  if (outgoingEdge) {
    return nodes.find((n) => n.id === outgoingEdge.target) || null;
  }

  return null;
};
