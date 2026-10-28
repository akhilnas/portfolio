import { useMemo, useState } from "react"
import { BlockMath, InlineMath } from "../Math"
import { ConceptLink } from "../tooltip"
import { WidgetFrame } from "../WidgetFrame"
import { LabeledSlider } from "../LabeledSlider"
import { FunctionPlot } from "../FunctionPlot"

export const meta = { slug: "polynomial-regression", term: "polynomial regression" }

// Fixed, seeded "training set" so the widget is deterministic across renders.
const DATA: { x: number; y: number }[] = [
  { x: -4, y: -1.2 },
  { x: -3, y: 1.6 },
  { x: -2, y: 2.1 },
  { x: -1, y: 0.4 },
  { x: 0, y: -0.6 },
  { x: 1, y: -0.3 },
  { x: 2, y: 1.8 },
  { x: 3, y: 3.4 },
  { x: 4, y: 2.6 },
]

// Solve a small linear system via Gaussian elimination with partial pivoting.
function solve(Ain: number[][], bin: number[]): number[] {
  const n = bin.length
  const A = Ain.map((row) => row.slice())
  const b = bin.slice()
  for (let col = 0; col < n; col++) {
    let piv = col
    for (let r = col + 1; r < n; r++) if (Math.abs(A[r][col]) > Math.abs(A[piv][col])) piv = r
    ;[A[col], A[piv]] = [A[piv], A[col]]
    ;[b[col], b[piv]] = [b[piv], b[col]]
    const d = A[col][col] || 1e-9
    for (let r = 0; r < n; r++) {
      if (r === col) continue
      const factor = A[r][col] / d
      for (let c = col; c < n; c++) A[r][c] -= factor * A[col][c]
      b[r] -= factor * b[col]
    }
  }
  return b.map((v, i) => v / (A[i][i] || 1e-9))
}

// Least-squares polynomial fit of given degree via the normal equations.
function polyfit(points: { x: number; y: number }[], degree: number): number[] {
  const p = degree + 1
  const AtA: number[][] = Array.from({ length: p }, () => new Array(p).fill(0))
  const Atb: number[] = new Array(p).fill(0)
  for (const { x, y } of points) {
    const powers = Array.from({ length: p }, (_, k) => x ** k)
    for (let i = 0; i < p; i++) {
      Atb[i] += powers[i] * y
      for (let j = 0; j < p; j++) AtA[i][j] += powers[i] * powers[j]
    }
  }
  return solve(AtA, Atb)
}

function PolynomialFitWidget() {
  const [degree, setDegree] = useState(3)

  const curve = useMemo(() => {
    const coeffs = polyfit(DATA, degree)
    const pts: { x: number; y: number }[] = []
    for (let x = -4.2; x <= 4.2 + 1e-9; x += 0.15) {
      let y = 0
      for (let k = 0; k < coeffs.length; k++) y += coeffs[k] * x ** k
      pts.push({ x: Math.round(x * 100) / 100, y })
    }
    return pts
  }, [degree])

  const points = useMemo(() => [{ points: curve }], [curve])

  return (
    <WidgetFrame
      title="Fitting φ(x) = (1, x, ..., xᵈ) to a fixed data set"
      description="Raise the degree and the same linear-in-the-weights model traces sharper and sharper curves through the points."
    >
      <LabeledSlider
        label="degree d"
        value={degree}
        onChange={(v) => setDegree(Math.round(v))}
        min={1}
        max={8}
        step={1}
        format={(v) => String(Math.round(v))}
      />
      <FunctionPlot
        xDomain={[-4.5, 4.5]}
        yDomain={[-4, 5]}
        xLabel="x"
        yLabel="f(x)"
        series={points}
      />
      <p className="aside muted">
        The curve is the least-squares fit of degree <InlineMath tex="d" /> to
        the same nine fixed training points at every setting. Watch what
        happens by degree 8: the curve twists to pass almost exactly through
        each point, which is <ConceptLink slug="overfitting" />, not a better
        model.
      </p>
    </WidgetFrame>
  )
}

export default function PolynomialRegressionContent() {
  return (
    <div className="stack">
      <p>
        A concrete instance of the{" "}
        <ConceptLink slug="basis-function" /> trick: instead of fitting a
        straight line to <InlineMath tex="x" />, expand each input into its
        powers,
      </p>
      <BlockMath tex="\phi(x) = (1,\ x,\ x^2,\ x^3,\ldots,\ x^d)^\top," />
      <p>
        and fit a <ConceptLink slug="linear-predictor" /> in this expanded{" "}
        <ConceptLink slug="feature-space" /> instead: <InlineMath tex="f(x) = \phi(x)^\top w" />.
        The model is still linear in the weights <InlineMath tex="w" />, so all
        the ordinary machinery of linear regression still applies, yet the
        resulting curve <InlineMath tex="f(x)" /> can bend and wiggle as much
        as the degree <InlineMath tex="d" /> allows.
      </p>
      <PolynomialFitWidget />
      <p>
        Higher degree always fits the training points better, but a degree
        that's too high starts fitting the noise rather than the underlying
        trend — the classic <ConceptLink slug="overfitting" /> trade-off that{" "}
        <ConceptLink slug="regularization" /> (or, in the GP view, a sensible{" "}
        <ConceptLink slug="prior-distribution" />) is meant to control.
      </p>
    </div>
  )
}
