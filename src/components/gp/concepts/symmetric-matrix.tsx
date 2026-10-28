import { InlineMath } from "../Math"
import { ConceptLink } from "../tooltip"

export const meta = { slug: "symmetric-matrix", term: "symmetric matrix" }

export default function SymmetricMatrixContent() {
  return (
    <div className="stack">
      <p>
        A square <ConceptLink slug="matrix" /> <InlineMath tex="A" /> that
        equals its own <ConceptLink slug="matrix-transpose" />: flipping it
        across the diagonal gives back the same matrix, so the entry in row{" "}
        <InlineMath tex="i" />, column <InlineMath tex="j" /> always matches
        the entry in row <InlineMath tex="j" />, column <InlineMath tex="i" />.
      </p>
      <InlineMath tex="A = A^\top" />
      <p>
        Covariance and kernel matrices in GP work are always symmetric,
        since the covariance between points <InlineMath tex="x_i" /> and{" "}
        <InlineMath tex="x_j" /> is the same number as the covariance between{" "}
        <InlineMath tex="x_j" /> and <InlineMath tex="x_i" />.
      </p>
    </div>
  )
}
