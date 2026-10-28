import { useEffect, useId, useRef, useState, type ReactNode } from 'react';
import {
    FloatingNode,
    FloatingPortal,
    FloatingTree,
    autoUpdate,
    flip,
    offset,
    safePolygon,
    shift,
    size,
    useDismiss,
    useFloating,
    useFloatingNodeId,
    useFloatingTree,
    useHover,
    useInteractions
} from '@floating-ui/react';
import { ChainProvider, useChainParent } from './ChainContext';
import { cardRegistry } from './registry';
import { useTooltipChainStore } from './store';

const OPEN_DELAY_MS = 300;
const CLOSE_GRACE_MS = 250;
const LOCK_HOLD_MS = 600;

// A single Esc handler closes the whole chain, however many islands are on the page.
let escInstalled = false;
function installEscHandler() {
    if (escInstalled) return;
    escInstalled = true;
    document.addEventListener(
        'keydown',
        (e) => {
            const { nodes, closeAll } = useTooltipChainStore.getState();
            if (e.key !== 'Escape' || Object.keys(nodes).length === 0) return;
            e.stopPropagation();
            closeAll();
        },
        true
    );
}

/** A term in the text that opens a concept card, which can itself contain more links. */
export function ConceptLink({ slug, children }: { slug: string; children?: ReactNode }) {
    return <ChainLink cardKey={`concept:${slug}`}>{children}</ChainLink>;
}

/** A citation marker that opens a card summarising the cited paper. */
export function CitationLink({ id, children }: { id: string; children?: ReactNode }) {
    return <ChainLink cardKey={`paper:${id}`}>{children}</ChainLink>;
}

function ChainLink({ cardKey, children }: { cardKey: string; children?: ReactNode }) {
    // Top-level links in the prose each sit in their own island, so they start their own floating tree.
    const tree = useFloatingTree();
    const link = <ChainLinkInner cardKey={cardKey}>{children}</ChainLinkInner>;
    return tree ? link : <FloatingTree>{link}</FloatingTree>;
}

function ChainLinkInner({ cardKey, children }: { cardKey: string; children?: ReactNode }) {
    const parentId = useChainParent();
    const entry = cardRegistry[cardKey];

    const fallbackId = useId();
    const nodeId = useFloatingNodeId() ?? fallbackId;
    const isCircular = useTooltipChainStore((s) => s.isCircular(parentId, cardKey));
    const node = useTooltipChainStore((s) => s.nodes[nodeId]);
    const registerOpen = useTooltipChainStore((s) => s.registerOpen);
    const closeNode = useTooltipChainStore((s) => s.closeNode);
    const setLocked = useTooltipChainStore((s) => s.setLocked);

    const open = !!node;
    const locked = !!node?.locked;

    const [lockProgress, setLockProgress] = useState(0);
    const lockRafRef = useRef<number>();

    useEffect(installEscHandler, []);

    const { refs, floatingStyles, context } = useFloating({
        nodeId,
        open,
        onOpenChange: (next, _event, reason) => {
            if (next) registerOpen(nodeId, parentId, cardKey);
            // A pinned card ignores the mouse wandering off; it closes on Esc, an outside click or the term again.
            else if (!(reason === 'hover' && useTooltipChainStore.getState().nodes[nodeId]?.locked)) closeNode(nodeId);
        },
        placement: parentId ? 'right-start' : 'bottom',
        middleware: [
            offset(10),
            flip(),
            shift({ padding: 8 }),
            size({
                padding: 8,
                apply({ availableWidth, elements }) {
                    elements.floating.style.maxWidth = `${Math.min(384, availableWidth)}px`;
                }
            })
        ],
        whileElementsMounted: autoUpdate
    });

    const hover = useHover(context, {
        enabled: !isCircular && !!entry,
        delay: { open: OPEN_DELAY_MS, close: CLOSE_GRACE_MS },
        handleClose: safePolygon({ buffer: 6 })
    });
    const dismiss = useDismiss(context);
    const { getReferenceProps, getFloatingProps } = useInteractions([hover, dismiss]);

    // Holding the pointer over a term for LOCK_HOLD_MS pins its card so you can move into it and keep going.
    useEffect(() => {
        if (!open || locked) {
            setLockProgress(0);
            return;
        }
        const start = performance.now();
        const tick = (now: number) => {
            const pct = Math.min(1, (now - start) / LOCK_HOLD_MS);
            setLockProgress(pct);
            if (pct < 1) lockRafRef.current = requestAnimationFrame(tick);
            else setLocked(nodeId, true);
        };
        lockRafRef.current = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(lockRafRef.current!);
    }, [open, locked, nodeId, setLocked]);

    const label = children ?? entry?.title ?? cardKey.split(':')[1].replace(/-/g, ' ');

    if (!entry) return <span>{label}</span>;

    if (isCircular) {
        return (
            <span className="chain-circular" title={`"${entry.title}" is already open further up this chain`}>
                {label} ↺
            </span>
        );
    }

    function toggle() {
        if (open && locked) closeNode(nodeId);
        else {
            registerOpen(nodeId, parentId, cardKey);
            setLocked(nodeId, true);
        }
    }

    const Content = entry.Content;

    return (
        <FloatingNode id={nodeId}>
            <span
                ref={refs.setReference}
                role="button"
                tabIndex={0}
                aria-expanded={open}
                className={`chain-link ${entry.kind}`}
                {...getReferenceProps({
                    onClick: toggle,
                    onKeyDown: (e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            toggle();
                        }
                    }
                })}
            >
                {label}
            </span>
            <FloatingPortal>
                {open && (
                    <div
                        ref={refs.setFloating}
                        // Deeper cards paint above their ancestors even though React mounts child portals first.
                        style={{ ...floatingStyles, pointerEvents: locked ? 'auto' : 'none', zIndex: 50 + (node?.depth ?? 0) }}
                        className={`chain-card ${entry.kind}${locked ? ' locked' : ''}`}
                        {...getFloatingProps()}
                    >
                        {!locked && <div className="chain-progress" style={{ width: `${lockProgress * 100}%` }} />}
                        <div className="chain-head">
                            <span className="chain-title">{entry.title}</span>
                            {locked && <span className="chain-pin" aria-label="Pinned" />}
                        </div>
                        {entry.byline && <p className="chain-byline">{entry.byline}</p>}
                        <div className="chain-body">
                            <ChainProvider value={nodeId}>
                                {node?.collapsed ? <p className="aside muted">{entry.title} (folded away; the chain is getting deep)</p> : <Content />}
                            </ChainProvider>
                            {entry.href && (
                                <a className="chain-source" href={entry.href} target="_blank" rel="noopener">
                                    Read the paper ↗
                                </a>
                            )}
                        </div>
                    </div>
                )}
            </FloatingPortal>
        </FloatingNode>
    );
}
