import type { ComponentType, ReactNode } from 'react';
import { CitationLink, ConceptLink } from '../tooltip';

export interface Paper {
    id: string;
    title: string;
    authors: string;
    venue: string;
    year: number;
    href: string;
    Content: ComponentType;
}

// Each card: what the paper did, why it matters for this thread, and what it cites in turn.
// The "Builds on" lists only include citations that really appear in the paper's reference list.
function Card({ gist, why, buildsOn }: { gist: ReactNode; why: ReactNode; buildsOn?: [string, string][] }) {
    return (
        <div className="stack">
            <p>{gist}</p>
            <p>
                <span className="card-label">Why it matters here:</span> {why}
            </p>
            {buildsOn && (
                <p className="builds-on">
                    <span className="card-label">Builds on:</span>{' '}
                    {buildsOn.map(([id, label], i) => (
                        <span key={id}>
                            {i > 0 && ', '}
                            <CitationLink id={id}>{label}</CitationLink>
                        </span>
                    ))}
                </p>
            )}
        </div>
    );
}

export const papers: Paper[] = [
    {
        id: 'dkl',
        title: 'Deep Kernel Learning',
        authors: 'Wilson, Hu, Salakhutdinov & Xing',
        venue: 'AISTATS',
        year: 2016,
        href: 'https://arxiv.org/abs/1511.02222',
        Content: () => (
            <Card
                gist={
                    <>
                        Puts a deep neural network in front of a GP's <ConceptLink slug="covariance-function" />: inputs are first mapped to features{' '}
                        <em>g(x)</em>, and the kernel compares those features instead of the raw inputs. The network weights and the kernel's{' '}
                        <ConceptLink slug="hyperparameter">hyperparameters</ConceptLink> are learned together by maximising the{' '}
                        <ConceptLink slug="marginal-likelihood" />.
                    </>
                }
                why="It keeps what makes GPs attractive (calibrated uncertainty, a principled training objective) while letting a neural net decide what “similar inputs” means. The catch is scale, which is why it leans on KISS-GP."
                buildsOn={[
                    ['kissgp', 'KISS-GP'],
                    ['sm', 'spectral mixture kernels'],
                    ['dbngp', 'deep belief net kernels'],
                    ['unify', 'sparse GP approximations'],
                    ['gpml', 'GPML']
                ]}
            />
        )
    },
    {
        id: 'kissgp',
        title: 'Kernel Interpolation for Scalable Structured Gaussian Processes (KISS-GP)',
        authors: 'Wilson & Nickisch',
        venue: 'ICML',
        year: 2015,
        href: 'https://arxiv.org/abs/1503.01057',
        Content: () => (
            <Card
                gist={
                    <>
                        Introduces structured kernel interpolation: place <ConceptLink slug="inducing-points" /> on a regular grid, and approximate every
                        kernel value by interpolating from the grid with sparse local weights. The grid gives the kernel matrix Kronecker and Toeplitz
                        structure, so the expensive linear algebra becomes fast.
                    </>
                }
                why="Exact GP regression costs O(n³) because of the Cholesky factorisation you watched happen in the widgets above. KISS-GP is what lets deep kernel learning train on large datasets."
                buildsOn={[
                    ['unify', 'sparse GP approximations'],
                    ['spgp', 'pseudo-inputs'],
                    ['sm', 'spectral mixture kernels'],
                    ['gpml', 'GPML']
                ]}
            />
        )
    },
    {
        id: 'sm',
        title: 'Gaussian Process Kernels for Pattern Discovery and Extrapolation',
        authors: 'Wilson & Adams',
        venue: 'ICML',
        year: 2013,
        href: 'https://arxiv.org/abs/1302.4245',
        Content: () => (
            <Card
                gist={
                    <>
                        Proposes the spectral mixture kernel. Any stationary <ConceptLink slug="kernel-function" /> is the Fourier transform of a spectral
                        density, so modelling that density as a mixture of Gaussians gives a kernel flexible enough to discover periodic structure and
                        extrapolate it, where the <ConceptLink slug="squared-exponential-kernel" /> just smooths.
                    </>
                }
                why="It was an early answer to “can the kernel itself be learned?”. Deep kernel learning uses it as the base kernel that sits on top of the neural network."
                buildsOn={[
                    ['dbngp', 'deep belief net kernels'],
                    ['gpml', 'GPML']
                ]}
            />
        )
    },
    {
        id: 'dbngp',
        title: 'Using Deep Belief Nets to Learn Covariance Kernels for Gaussian Processes',
        authors: 'Salakhutdinov & Hinton',
        venue: 'NeurIPS',
        year: 2007,
        href: 'https://www.semanticscholar.org/search?q=Using%20Deep%20Belief%20Nets%20to%20Learn%20Covariance%20Kernels%20for%20Gaussian%20Processes',
        Content: () => (
            <Card
                gist={
                    <>
                        Pre-trains a deep belief net on unlabelled data, then feeds its top-layer features into a GP kernel and fine-tunes everything by
                        maximising the <ConceptLink slug="marginal-likelihood" />.
                    </>
                }
                why="This is the ancestor of the deep kernel idea: a learned feature map inside a GP covariance, almost a decade before deep kernel learning made it scale."
            />
        )
    },
    {
        id: 'unify',
        title: 'A Unifying View of Sparse Approximate Gaussian Process Regression',
        authors: 'Quiñonero-Candela & Rasmussen',
        venue: 'JMLR',
        year: 2005,
        href: 'https://www.jmlr.org/papers/v6/quinonero-candela05a.html',
        Content: () => (
            <Card
                gist={
                    <>
                        Shows that the zoo of sparse GP approximations (SoR, DTC, FITC, PITC) are all <em>exact</em> inference under a modified{' '}
                        <ConceptLink slug="prior-distribution">prior</ConceptLink>. Each assumes training and test values only talk to each other through a
                        small set of <ConceptLink slug="inducing-points" />, and they differ in what else they approximate.
                    </>
                }
                why="It gives the vocabulary everyone after it uses. KISS-GP recasts this whole family as a kind of kernel interpolation, then improves on it."
                buildsOn={[['spgp', 'pseudo-inputs (FITC)']]}
            />
        )
    },
    {
        id: 'spgp',
        title: 'Sparse Gaussian Processes using Pseudo-inputs',
        authors: 'Snelson & Ghahramani',
        venue: 'NeurIPS',
        year: 2005,
        href: 'https://www.semanticscholar.org/paper/b6a2d80854651a56e0f023543131744f14f20ab4',
        Content: () => (
            <Card
                gist={
                    <>
                        Summarises n data points through M ≪ n “pseudo-inputs” whose <em>locations</em> are learned by gradient ascent on the{' '}
                        <ConceptLink slug="marginal-likelihood" />, together with the kernel <ConceptLink slug="hyperparameter">hyperparameters</ConceptLink>.
                        Training cost drops from O(n³) to O(nM²).
                    </>
                }
                why="Learned inducing points became the standard way to scale GPs. KISS-GP's twist is to fix them on a grid and get speed from structure instead."
            />
        )
    },
    {
        id: 'gpml',
        title: 'Gaussian Processes for Machine Learning',
        authors: 'Rasmussen & Williams',
        venue: 'MIT Press',
        year: 2006,
        href: 'https://gaussianprocess.org/gpml/',
        Content: () => (
            <Card
                gist={
                    <>
                        The standard textbook on <ConceptLink slug="gaussian-process">Gaussian processes</ConceptLink>, and the one the interactive chapter
                        above is a companion to. It's free to read online.
                    </>
                }
                why="Almost every GP paper cites it for the basics: exact regression, covariance functions and model selection by marginal likelihood."
            />
        )
    }
];
