import { InlineMath } from "../Math"
import { ConceptLink } from "../tooltip"

export const meta = { slug: "rank-matrix", term: "rank" }

export default function RankMatrixContent() {
  return (
    <div className="stack">
      <p>
        The rank of a <ConceptLink slug="matrix" /> is the number of truly
        independent directions among its rows (equivalently, its columns) —
        that is, the number of rows that can't be written as a combination
        of the others. An <InlineMath tex="n \times n" /> matrix has rank at
        most <InlineMath tex="n" />; when it achieves that maximum, it's
        called "full rank," and full-rank square matrices are exactly the
        ones that have a <ConceptLink slug="matrix-inverse" />.
      </p>
      <p>
        A rank below the maximum means some rows or columns are redundant —
        geometrically, the matrix squashes space down into a
        lower-dimensional slice. This is why a covariance matrix that is only{" "}
        <ConceptLink slug="positive-semidefinite-matrix" /> (rather than
        strictly positive definite) can fail to be full rank: it has flattened
        at least one direction down to zero variance.
      </p>
    </div>
  )
}
