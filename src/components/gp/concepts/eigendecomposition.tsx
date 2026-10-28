import { InlineMath, BlockMath } from "../Math"
import { ConceptLink } from "../tooltip"

export const meta = { slug: "eigendecomposition", term: "eigendecomposition" }

export default function EigendecompositionContent() {
  return (
    <div className="stack">
      <p>
        A way of rewriting a square <ConceptLink slug="matrix" />{" "}
        <InlineMath tex="A" /> in terms of its own{" "}
        <ConceptLink slug="eigenvalue">eigenvalues</ConceptLink> and{" "}
        <ConceptLink slug="eigenvector">eigenvectors</ConceptLink>:
      </p>
      <BlockMath tex="A = V \Lambda V^{-1}" />
      <p>
        Here the columns of <InlineMath tex="V" /> are the eigenvectors of{" "}
        <InlineMath tex="A" />, and <InlineMath tex="\Lambda" /> is a diagonal
        matrix holding the matching eigenvalues. For{" "}
        <InlineMath tex="A = \begin{pmatrix} 2 & 1 \\ 1 & 2 \end{pmatrix}" />
        , this is <InlineMath tex="\Lambda = \mathrm{diag}(3, 1)" /> paired
        with eigenvectors <InlineMath tex="(1,1)" /> and{" "}
        <InlineMath tex="(1,-1)" />.
      </p>
      <p>
        This is useful because it turns the messy action of{" "}
        <InlineMath tex="A" /> into three simple steps: rotate into the
        eigenvector directions, stretch each one independently by its
        eigenvalue, then rotate back. It's the tool behind checking whether a{" "}
        <ConceptLink slug="covariance-matrix" /> is valid — a symmetric
        matrix is a legal covariance matrix exactly when all of its
        eigenvalues are non-negative.
      </p>
    </div>
  )
}
