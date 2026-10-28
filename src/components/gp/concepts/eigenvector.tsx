import { useState } from "react"
import { InlineMath, BlockMath } from "../Math"
import { ConceptLink } from "../tooltip"
import { WidgetFrame } from "../WidgetFrame"
import { LabeledSlider } from "../LabeledSlider"

export const meta = { slug: "eigenvector", term: "eigenvector" }

// A = [[2, 1], [1, 2]] — same worked example used in eigenvalue.tsx and
// eigendecomposition.tsx. Eigenvectors at 45°/225° (λ = 3) and 135°/315° (λ = 1).
function Eigen2x2Widget() {
  const [angle, setAngle] = useState(45)
  const theta = (angle * Math.PI) / 180
  const vx = Math.cos(theta)
  const vy = Math.sin(theta)
  const wx = 2 * vx + vy
  const wy = vx + 2 * vy

  const mod = ((angle % 180) + 180) % 180
  const isEigen = Math.abs(mod - 45) < 3 || Math.abs(mod - 135) < 3
  const lambda = Math.hypot(wx, wy) / Math.hypot(vx, vy)

  const scale = 28
  const c = 100
  const toScreen = (x: number, y: number) => ({ x: c + x * scale, y: c - y * scale })
  const vS = toScreen(vx, vy)
  const wS = toScreen(wx, wy)

  return (
    <WidgetFrame
      title="A vector and its image under A"
      description="A = [[2,1],[1,2]] applied to a unit vector pointing at angle θ."
    >
      <LabeledSlider
        label="θ"
        value={angle}
        onChange={setAngle}
        min={0}
        max={180}
        step={1}
        format={(v) => `${v.toFixed(0)}°`}
      />
      <svg viewBox="0 0 200 200" className="center-svg">
        <defs>
          <marker id="eig-arrow-blue" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
            <path d="M0,0 L8,4 L0,8 Z" fill="var(--green)" />
          </marker>
          <marker id="eig-arrow-orange" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
            <path d="M0,0 L8,4 L0,8 Z" fill="var(--mustard)" />
          </marker>
        </defs>
        <line x1={0} y1={c} x2={200} y2={c} className="axis" />
        <line x1={c} y1={0} x2={c} y2={200} className="axis" />
        <line
          x1={c}
          y1={c}
          x2={wS.x}
          y2={wS.y}
          stroke="var(--mustard)"
          strokeWidth={2}
          markerEnd="url(#eig-arrow-orange)"
        />
        <line
          x1={c}
          y1={c}
          x2={vS.x}
          y2={vS.y}
          stroke="var(--green)"
          strokeWidth={2}
          markerEnd="url(#eig-arrow-blue)"
        />
      </svg>
      <p className="aside muted">
        {isEigen
          ? `Aligned — this θ is an eigenvector direction. A only rescales v (blue), by a factor λ ≈ ${lambda.toFixed(1)}.`
          : "Drag θ until the orange arrow (Av) lies on the same line as the blue arrow (v): those two directions are the eigenvectors."}
      </p>
    </WidgetFrame>
  )
}

export default function EigenvectorContent() {
  return (
    <div className="stack">
      <p>
        A nonzero <ConceptLink slug="vector" /> <InlineMath tex="\mathbf{v}" />{" "}
        whose direction is left unchanged when a square{" "}
        <ConceptLink slug="matrix" /> <InlineMath tex="A" /> multiplies it —
        it only gets stretched or shrunk by a scalar factor, its{" "}
        <ConceptLink slug="eigenvalue" /> <InlineMath tex="\lambda" />:
      </p>
      <BlockMath tex="A\mathbf{v} = \lambda \mathbf{v}" />
      <p>
        For <InlineMath tex="A = \begin{pmatrix} 2 & 1 \\ 1 & 2 \end{pmatrix}" />
        , the vector <InlineMath tex="(1,1)" /> is an eigenvector (
        <InlineMath tex="\lambda = 3" />), and so is <InlineMath tex="(1,-1)" /> (
        <InlineMath tex="\lambda = 1" />) — every other direction gets rotated
        as well as scaled.
      </p>
      <Eigen2x2Widget />
    </div>
  )
}
