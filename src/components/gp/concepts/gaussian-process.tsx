import { useMemo } from "react"
import { BlockMath, InlineMath } from "../Math"
import { ConceptLink } from "../tooltip"
import { WidgetFrame } from "../WidgetFrame"
import { FunctionPlot } from "../FunctionPlot"

export const meta = { slug: "gaussian-process", term: "Gaussian process" }

// Tiny local Cholesky, just to draw a few static sample paths from an SE-kernel
// GP prior as a one-time illustration (no sliders — kept deliberately light).
function cholesky(A: number[][]): number[][] {
  const n = A.length
  const L: number[][] = Array.from({ length: n }, () => new Array(n).fill(0))
  for (let i = 0; i < n; i++) {
    for (let j = 0; j <= i; j++) {
      let sum = A[i][j]
      for (let k = 0; k < j; k++) sum -= L[i][k] * L[j][k]
      L[i][j] = i === j ? Math.sqrt(Math.max(sum, 1e-12)) : sum / L[j][j]
    }
  }
  return L
}

function mulberry32(seed: number) {
  let s = seed
  return function () {
    s = (s + 0x6d2b79f5) | 0
    let t = Math.imul(s ^ (s >>> 15), 1 | s)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

function seededRandn(seed: number, n: number): number[] {
  const rng = mulberry32(seed)
  const out: number[] = []
  for (let i = 0; i < n; i++) {
    let u = 0,
      v = 0
    while (u === 0) u = rng()
    while (v === 0) v = rng()
    out.push(Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v))
  }
  return out
}

const GRID: number[] = (() => {
  const pts: number[] = []
  for (let x = -5; x <= 5 + 1e-9; x += 0.25) pts.push(Math.round(x * 100) / 100)
  return pts
})()

function GaussianProcessSamplesWidget() {
  const paths = useMemo(() => {
    const n = GRID.length
    const ell = 1
    const K: number[][] = Array.from({ length: n }, () => new Array(n).fill(0))
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        const d = (GRID[i] - GRID[j]) / ell
        K[i][j] = Math.exp(-0.5 * d * d) + (i === j ? 1e-6 : 0)
      }
    }
    const L = cholesky(K)
    return [11, 42, 97].map((seed) => {
      const z = seededRandn(seed, n)
      const f = GRID.map((_, i) => {
        let sum = 0
        for (let k = 0; k <= i; k++) sum += L[i][k] * z[k]
        return sum
      })
      return { points: GRID.map((x, i) => ({ x, y: f[i] })) }
    })
  }, [])

  const band = useMemo(
    () => [{ points: GRID.map((x) => ({ x, upper: 2, lower: -2 })) }],
    []
  )

  return (
    <WidgetFrame
      title="Three draws from a GP prior"
      description="Each curve is one random function, drawn from the same Gaussian process. The shaded band is the pointwise ±2 standard-deviation range shared by all of them."
    >
      <FunctionPlot
        xDomain={[-5, 5]}
        yDomain={[-2.5, 2.5]}
        xLabel="input, x"
        yLabel="f(x)"
        series={paths}
        bands={band}
      />
    </WidgetFrame>
  )
}

export default function GaussianProcessContent() {
  return (
    <div className="stack">
      <p>
        A <ConceptLink slug="probability-distribution" /> over{" "}
        <em>functions</em>, rather than over numbers or vectors. It is a{" "}
        <ConceptLink slug="stochastic-process" /> with one special property:
        pick <em>any</em> finite set of input points{" "}
        <InlineMath tex="x_1,\ldots,x_n" />, and the function values{" "}
        <InlineMath tex="f(x_1),\ldots,f(x_n)" /> at those points always turn
        out to have a joint{" "}
        <ConceptLink slug="multivariate-gaussian-distribution" />.
      </p>
      <p>
        That's the entire trick: you never have to describe an infinitely
        long list of function values directly. You only ever need to say how
        any finite handful of them are jointly Gaussian, and that's enough
        (see <ConceptLink slug="gp-consistency" />) to pin down a well-defined
        distribution over the whole function. A Gaussian process is fully
        specified by a mean function <InlineMath tex="m(x)" /> (usually taken
        to be zero) and a <ConceptLink slug="covariance-function" />{" "}
        <InlineMath tex="k(x,x')" />, written
      </p>
      <BlockMath tex="f(x) \sim \mathcal{GP}\big(m(x),\ k(x,x')\big)." />
      <p>
        Each sample curve below is one random draw of an entire function from
        such a distribution — before seeing any data, this is the GP{" "}
        <em>prior</em>. Feeding in observations narrows this cloud of
        candidate functions down to the ones consistent with the data,
        producing a GP <em>posterior</em>. The covariance function used here
        is the <ConceptLink slug="squared-exponential-kernel" />, the most
        common default choice.
      </p>
      <GaussianProcessSamplesWidget />
    </div>
  )
}
