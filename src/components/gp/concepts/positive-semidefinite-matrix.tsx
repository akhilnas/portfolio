import { BlockMath, InlineMath } from "../Math"
import { ConceptLink } from "../tooltip"

export const meta = {
  slug: "positive-semidefinite-matrix",
  term: "positive semidefinite matrix",
}

export default function PositiveSemidefiniteMatrixContent() {
  return (
    <div className="stack">
      <p>
        A relaxed version of a{" "}
        <ConceptLink slug="positive-definite-matrix" />: a{" "}
        <ConceptLink slug="symmetric-matrix" /> <InlineMath tex="A" /> is
        positive semidefinite if its{" "}
        <ConceptLink slug="quadratic-form" /> is never negative, though it's
        allowed to be exactly zero for some nonzero <InlineMath tex="x" />:
      </p>
      <BlockMath tex="x^\top A x \geq 0 \quad \text{for all } x" />
      <p>
        Every valid covariance matrix must be positive semidefinite — this is
        what stops a computed variance from ever coming out negative. It's
        the "≥" version rather than the strict "&gt;" version, because with
        finitely many data points a covariance function can produce a matrix
        with some directions of exactly zero spread (e.g. two{" "}
        <ConceptLink slug="training-set" />
        {" "}points placed at the same input).
      </p>
    </div>
  )
}
