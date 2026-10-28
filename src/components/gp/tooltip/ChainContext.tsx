import { createContext, useContext } from 'react';

/** Store id of the enclosing card, or null in the main body text. */
const ChainContext = createContext<string | null>(null);

export const ChainProvider = ChainContext.Provider;

export function useChainParent(): string | null {
    return useContext(ChainContext);
}
