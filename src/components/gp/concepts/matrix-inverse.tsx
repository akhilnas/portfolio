import { InlineMath, BlockMath } from "../Math"
import { ConceptLink } from "../tooltip"

export const meta = { slug: "matrix-inverse", term: "matrix inverse" }

export default function MatrixInverseContent() {
  return (
    <div className="stack">
      <p>
        The matrix equivalent of a reciprocal. For an ordinary number{" "}
        <InlineMath tex="a \neq 0" />, its inverse <InlineMath tex="a^{-1}" />{" "}
        satisfies <InlineMath tex="a \cdot a^{-1} = 1" />. Likewise, a square{" "}
        <ConceptLink slug="matrix" /> <InlineMath tex="A" /> has an inverse{" "}
        <InlineMath tex="A^{-1}" /> when
      </p>
      <BlockMath tex="A A^{-1} = A^{-1} A = I" />
      <p>
        where <InlineMath tex="I" /> is the identity matrix (1s on the
        diagonal, 0s elsewhere — the matrix analogue of the number 1). Not
        every matrix has an inverse: it exists exactly when the matrix's{" "}
        <ConceptLink slug="determinant" /> is nonzero. Inverses show up
        constantly in GP work because "solving" a system of linear
        equations, or a Gaussian's covariance structure, means multiplying by
        an inverse matrix.
      </p>
    </div>
  )
}
