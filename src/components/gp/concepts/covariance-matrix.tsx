import { BlockMath, InlineMath } from "../Math"
import { ConceptLink } from "../tooltip"

export const meta = { slug: "covariance-matrix", term: "covariance matrix" }

export default function CovarianceMatrixContent() {
  return (
    <div className="stack">
      <p>
        The generalization of <ConceptLink slug="variance" /> to a whole
        vector of <ConceptLink slug="random-variable" />s at once. For a
        random vector <InlineMath tex="x = (x_1, \dots, x_n)" />, entry{" "}
        <InlineMath tex="(i,j)" /> holds the{" "}
        <ConceptLink slug="covariance" /> between <InlineMath tex="x_i" /> and{" "}
        <InlineMath tex="x_j" />:
      </p>
      <BlockMath tex="\Sigma_{ij} = \text{Cov}(x_i, x_j), \qquad \Sigma_{ii} = \text{Var}(x_i)" />
      <p>
        So the diagonal is just each variable's own variance, and the
        off-diagonal entries capture how the variables are entangled. For a{" "}
        <ConceptLink slug="multivariate-gaussian-distribution" />, the
        covariance matrix is exactly what controls the shape and orientation
        of the probability "bump" — a diagonal matrix gives an axis-aligned
        oval, while nonzero off-diagonal entries tilt it. It must be{" "}
        <ConceptLink slug="positive-definite-matrix" /> (or at least
        semidefinite) for the distribution to make sense, since a variance
        can never come out negative.
      </p>
    </div>
  )
}
