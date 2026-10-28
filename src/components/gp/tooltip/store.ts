import { create } from 'zustand';

export const DEPTH_SOFT_CAP = 5;

export interface ChainNode {
    id: string;
    cardKey: string;
    parentId: string | null;
    ancestorIds: string[];
    keyPath: string[];
    depth: number;
    locked: boolean;
    collapsed: boolean;
}

interface TooltipChainState {
    nodes: Record<string, ChainNode>;
    isCircular: (parentId: string | null, cardKey: string) => boolean;
    registerOpen: (id: string, parentId: string | null, cardKey: string) => void;
    setLocked: (id: string, locked: boolean) => void;
    closeNode: (id: string) => void;
    closeAll: () => void;
}

// One store for every island on the page, so concept and citation cards share a single chain.
export const useTooltipChainStore = create<TooltipChainState>((set, get) => ({
    nodes: {},

    isCircular: (parentId, cardKey) => {
        const parent = parentId ? get().nodes[parentId] : undefined;
        return !!parent && parent.keyPath.includes(cardKey);
    },

    registerOpen: (id, parentId, cardKey) =>
        set((state) => {
            if (state.nodes[id]) return state;
            const parent = parentId ? state.nodes[parentId] : null;
            const ancestorIds = parent ? [...parent.ancestorIds, parent.id] : [];
            const depth = parent ? parent.depth + 1 : 0;
            const nodes = {
                ...state.nodes,
                [id]: { id, cardKey, parentId, ancestorIds, keyPath: parent ? [...parent.keyPath, cardKey] : [cardKey], depth, locked: false, collapsed: false }
            };
            // Past the soft cap, collapse (not unmount) the shallowest non-root ancestor so the chain stays readable.
            const candidateId = ancestorIds[1];
            if (depth >= DEPTH_SOFT_CAP && candidateId && nodes[candidateId]) {
                nodes[candidateId] = { ...nodes[candidateId], collapsed: true };
            }
            return { nodes };
        }),

    setLocked: (id, locked) =>
        set((state) => {
            const node = state.nodes[id];
            return node ? { nodes: { ...state.nodes, [id]: { ...node, locked } } } : state;
        }),

    closeNode: (id) =>
        set((state) => {
            const nodes = { ...state.nodes };
            delete nodes[id];
            for (const key of Object.keys(nodes)) {
                if (nodes[key].ancestorIds.includes(id)) delete nodes[key];
            }
            return { nodes };
        }),

    closeAll: () => set({ nodes: {} })
}));
