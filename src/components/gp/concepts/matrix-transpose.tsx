import { InlineMath, BlockMath } from "../Math"
import { ConceptLink } from "../tooltip"

export const meta = { slug: "matrix-transpose", term: "matrix transpose" }

export default function MatrixTransposeContent() {
  return (
    <div className="stack">
      <p>
        Flipping a <ConceptLink slug="matrix" /> over its diagonal: rows
        become columns and columns become rows. The transpose of{" "}
        <InlineMath tex="A" /> is written <InlineMath tex="A^T" />.
      </p>
      <BlockMath tex="A = \begin{pmatrix} 1 & 2 & 3 \\ 4 & 5 & 6 \end{pmatrix} \quad\Rightarrow\quad A^T = \begin{pmatrix} 1 & 4 \\ 2 & 5 \\ 3 & 6 \end{pmatrix}" />
      <p>
        A <InlineMath tex="2\times 3" /> matrix becomes{" "}
        <InlineMath tex="3\times 2" /> — entry <InlineMath tex="(i,j)" /> in{" "}
        <InlineMath tex="A" /> becomes entry <InlineMath tex="(j,i)" /> in{" "}
        <InlineMath tex="A^T" />. If a matrix equals its own transpose it's
        called symmetric — <ConceptLink slug="covariance-matrix" />
        {"s"} always have this property.
      </p>
    </div>
  )
}
