import { InlineMath, BlockMath } from "../Math"
import { ConceptLink } from "../tooltip"

export const meta = { slug: "matrix", term: "matrix" }

export default function MatrixContent() {
  return (
    <div className="stack">
      <p>
        A rectangular grid of numbers arranged in rows and columns, e.g. a{" "}
        <InlineMath tex="2 \times 2" /> matrix:
      </p>
      <BlockMath tex="A = \begin{pmatrix} 2 & 1 \\ 1 & 2 \end{pmatrix}" />
      <p>
        You can think of each column as a <ConceptLink slug="vector" />, so a
        matrix is really just several vectors bundled together — or, just as
        usefully, as a machine that takes a vector in and produces a new
        vector out by multiplying. In GP work, matrices most often hold a
        table of data (one row per point) or a{" "}
        <ConceptLink slug="covariance-matrix" /> describing how variables
        relate to each other.
      </p>
    </div>
  )
}
