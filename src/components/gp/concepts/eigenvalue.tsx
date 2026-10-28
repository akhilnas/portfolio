import { InlineMath, BlockMath } from "../Math"
import { ConceptLink } from "../tooltip"

export const meta = { slug: "eigenvalue", term: "eigenvalue" }

export default function EigenvalueContent() {
  return (
    <div className="stack">
      <p>
        For a square <ConceptLink slug="matrix" /> <InlineMath tex="A" />,
        most vectors change direction when you multiply them by{" "}
        <InlineMath tex="A" />. An eigenvalue is a special scalar{" "}
        <InlineMath tex="\lambda" /> for which there exists a nonzero{" "}
        <ConceptLink slug="eigenvector">vector</ConceptLink>{" "}
        <InlineMath tex="\mathbf{v}" /> whose direction{" "}
        <InlineMath tex="A" /> leaves alone — it only stretches or shrinks it:
      </p>
      <BlockMath tex="A\mathbf{v} = \lambda \mathbf{v}" />
      <p>
        For example, <InlineMath tex="A = \begin{pmatrix} 2 & 1 \\ 1 & 2 \end{pmatrix}" />{" "}
        has eigenvalues <InlineMath tex="\lambda = 3" /> and{" "}
        <InlineMath tex="\lambda = 1" />. A square matrix of size{" "}
        <InlineMath tex="n" /> has (up to) <InlineMath tex="n" /> eigenvalues,
        and their product equals the matrix's <ConceptLink slug="determinant" />.
      </p>
    </div>
  )
}
