import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Node, Edge } from '@xyflow/react';

export interface ChatMessage {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  imageUrl?: string;
  options?: { id: string; label: string; targetNodeId: string }[];
}

interface ChatStore {
  flowConfig: { nodes: Node[]; edges: Edge[] };
  chatHistory: ChatMessage[];
  currentNodeId: string | null;
  userData: any;
  setFlowConfig: (nodes: Node[], edges: Edge[]) => void;
  addMessage: (message: ChatMessage) => void;
  setCurrentNodeId: (id: string | null) => void;
  setUserData: (data: any) => void;
  resetChat: () => void;
}

export const useChatStore = create<ChatStore>()(
  persist(
    (set) => ({
      flowConfig: { nodes: [], edges: [] },
      chatHistory: [],
      currentNodeId: 'start_node', // Default starting node id
      userData: {},
      setFlowConfig: (nodes, edges) => set({ flowConfig: { nodes, edges } }),
      addMessage: (message) =>
        set((state) => ({ chatHistory: [...state.chatHistory, message] })),
      setCurrentNodeId: (id) => set({ currentNodeId: id }),
      setUserData: (data) =>
        set((state) => ({ userData: { ...state.userData, ...data } })),
      resetChat: () => set({ chatHistory: [], currentNodeId: 'start_node' }),
    }),
    {
      name: 'chat_flow_storage',
    }
  )
);
