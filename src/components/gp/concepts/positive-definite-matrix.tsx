import { BlockMath, InlineMath } from "../Math"
import { ConceptLink } from "../tooltip"

export const meta = { slug: "positive-definite-matrix", term: "positive definite matrix" }

export default function PositiveDefiniteMatrixContent() {
  return (
    <div className="stack">
      <p>
        A <ConceptLink slug="symmetric-matrix" /> <InlineMath tex="A" /> is
        positive definite if its{" "}
        <ConceptLink slug="quadratic-form" /> is strictly positive for every
        nonzero vector <InlineMath tex="x" />:
      </p>
      <BlockMath tex="x^\top A x > 0 \quad \text{for all } x \neq 0" />
      <p>
        Intuitively, this is the matrix analogue of a positive number: just
        as multiplying by a positive scalar never flips a quantity negative,
        a positive definite matrix "never points backwards." Covariance
        matrices built from a valid <ConceptLink slug="kernel-function" /> are
        positive (semi)definite by construction, which is exactly what
        guarantees a well-defined{" "}
        <ConceptLink slug="multivariate-gaussian-distribution" /> and what
        lets us compute a <ConceptLink slug="cholesky-decomposition" /> of{" "}
        <InlineMath tex="K + \sigma_n^2 I" /> in Algorithm 2.1.
      </p>
    </div>
  )
}
