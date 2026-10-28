import { BlockMath, InlineMath } from "../Math"
import { ConceptLink } from "../tooltip"

export const meta = {
  slug: "singular-value-decomposition",
  term: "singular value decomposition (SVD)",
}

export default function SingularValueDecompositionContent() {
  return (
    <div className="stack">
      <p>
        A way of breaking any <ConceptLink slug="matrix" /> <InlineMath tex="A" />{" "}
        — even a non-square one — into a rotation, a stretch along{" "}
        <ConceptLink slug="orthogonal-vectors" />, and another rotation:
      </p>
      <BlockMath tex="A = U\Sigma V^\top" />
      <p>
        Here <InlineMath tex="U" /> and <InlineMath tex="V" /> consist of
        orthogonal direction vectors, and <InlineMath tex="\Sigma" /> is
        diagonal, holding the non-negative "singular values" that say how
        much stretching happens along each direction. It's closely related
        to the <ConceptLink slug="eigendecomposition" />: for a symmetric
        positive semidefinite matrix like a covariance matrix, the SVD and
        the eigendecomposition actually coincide, with singular values equal
        to <ConceptLink slug="eigenvalue">eigenvalues</ConceptLink>.
      </p>
      <p>
        The SVD is the more general tool since it works even when a matrix
        isn't square or doesn't have a full set of eigenvectors, which makes
        it a robust way to inspect the "shape" of a matrix — for instance,
        checking how close a covariance matrix is to losing full{" "}
        <ConceptLink slug="rank-matrix" />.
      </p>
    </div>
  )
}
