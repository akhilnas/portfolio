import { InlineMath, BlockMath } from "../Math"
import { ConceptLink } from "../tooltip"

export const meta = { slug: "determinant", term: "determinant" }

export default function DeterminantContent() {
  return (
    <div className="stack">
      <p>
        A single number computed from a square <ConceptLink slug="matrix" />,
        written <InlineMath tex="\det(A)" /> or <InlineMath tex="|A|" />. For
        a <InlineMath tex="2\times 2" /> matrix it has a simple formula:
      </p>
      <BlockMath tex="A = \begin{pmatrix} a & b \\ c & d \end{pmatrix} \quad\Rightarrow\quad \det(A) = ad - bc" />
      <p>
        Geometrically, <InlineMath tex="|\det(A)|" /> is the factor by which{" "}
        <InlineMath tex="A" /> scales area (or volume, in higher dimensions)
        when it transforms space. A determinant of zero means the matrix
        squashes space into a lower dimension — which is also exactly when it
        has no <ConceptLink slug="matrix-inverse" />. It's also the product
        of the matrix's <ConceptLink slug="eigenvalue">eigenvalues</ConceptLink>.
      </p>
    </div>
  )
}
