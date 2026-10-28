// Tiny dense linear algebra for the widgets. n stays around 100 at most, so these do the real
// Cholesky-based GP computation in the browser rather than pulling in a matrix library.

export function cholesky(A: number[][]): number[][] {
    const n = A.length;
    const L: number[][] = Array.from({ length: n }, () => new Array(n).fill(0));
    for (let i = 0; i < n; i++) {
        for (let j = 0; j <= i; j++) {
            let sum = A[i][j];
            for (let k = 0; k < j; k++) sum -= L[i][k] * L[j][k];
            L[i][j] = i === j ? Math.sqrt(Math.max(sum, 1e-12)) : sum / L[j][j];
        }
    }
    return L;
}

export function forwardSolve(L: number[][], b: number[]): number[] {
    const y = new Array(L.length).fill(0);
    for (let i = 0; i < L.length; i++) {
        let sum = b[i];
        for (let k = 0; k < i; k++) sum -= L[i][k] * y[k];
        y[i] = sum / L[i][i];
    }
    return y;
}

/** Solves Lᵀx = y for lower-triangular L. */
export function backSolveTranspose(L: number[][], y: number[]): number[] {
    const n = L.length;
    const x = new Array(n).fill(0);
    for (let i = n - 1; i >= 0; i--) {
        let sum = y[i];
        for (let k = i + 1; k < n; k++) sum -= L[k][i] * x[k];
        x[i] = sum / L[i][i];
    }
    return x;
}

/** Solves Ax = b for symmetric positive-definite A. */
export function solveSPD(A: number[][], b: number[]): number[] {
    const L = cholesky(A);
    return backSolveTranspose(L, forwardSolve(L, b));
}

export function matVecLowerTri(L: number[][], z: number[]): number[] {
    return L.map((row, i) => {
        let sum = 0;
        for (let k = 0; k <= i; k++) sum += row[k] * z[k];
        return sum;
    });
}

export function mulberry32(seed: number) {
    let s = seed;
    return () => {
        s = (s + 0x6d2b79f5) | 0;
        let t = Math.imul(s ^ (s >>> 15), 1 | s);
        t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
}

/** n standard-normal draws (Box–Muller) from a seeded generator. */
export function seededRandn(seed: number, n: number): number[] {
    const rng = mulberry32(seed);
    return Array.from({ length: n }, () => {
        const u = rng() || 1e-12;
        const v = rng();
        return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
    });
}

/** Squared-exponential covariance k(a, b) = σf² exp(−(a − b)² / 2ℓ²). */
export function seKernel(a: number, b: number, ell: number, sigmaF = 1): number {
    const d = (a - b) / ell;
    return sigmaF * sigmaF * Math.exp(-0.5 * d * d);
}

export function linspace(start: number, stop: number, n: number): number[] {
    return Array.from({ length: n }, (_, i) => start + ((stop - start) * i) / (n - 1));
}

/**
 * GP regression posterior on a grid: mean = K*ᵀ(K + σn²I)⁻¹y, cov = K** − K*ᵀ(K + σn²I)⁻¹K*.
 * With no data it returns the prior.
 */
export function gpPosterior(grid: number[], trainX: number[], trainY: number[], ell: number, sigmaN2: number) {
    const prior = grid.map((a) => grid.map((b) => seKernel(a, b, ell)));
    if (trainX.length === 0) return { mean: grid.map(() => 0), cov: prior };

    const K = trainX.map((a, i) => trainX.map((b, j) => seKernel(a, b, ell) + (i === j ? sigmaN2 : 0)));
    const L = cholesky(K);
    const alpha = backSolveTranspose(L, forwardSolve(L, trainY));
    // V = L⁻¹K*, one column per grid point, so that K*ᵀ(K + σn²I)⁻¹K* = VᵀV.
    const V = grid.map((x) => forwardSolve(L, trainX.map((t) => seKernel(t, x, ell))));

    const mean = grid.map((x) => trainX.reduce((s, t, i) => s + seKernel(t, x, ell) * alpha[i], 0));
    const cov = grid.map((_, i) => grid.map((_, j) => prior[i][j] - V[i].reduce((s, v, k) => s + v * V[j][k], 0)));
    return { mean, cov };
}
