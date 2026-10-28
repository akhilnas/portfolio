import { BlockMath, InlineMath } from "../Math"
import { ConceptLink } from "../tooltip"

export const meta = { slug: "dot-product", term: "dot product" }

export default function DotProductContent() {
  return (
    <div className="stack">
      <p>
        A way of combining two <ConceptLink slug="vector" />s of the same
        length into a single number: multiply the vectors entry by matching
        entry, then add up all the products.
      </p>
      <BlockMath tex="a \cdot b = \sum_{i=1}^n a_i b_i = a_1 b_1 + a_2 b_2 + \cdots + a_n b_n" />
      <p>
        For example, with <InlineMath tex="a=(1,2,3)" /> and{" "}
        <InlineMath tex="b=(4,0,-1)" />, the dot product is{" "}
        <InlineMath tex="1\cdot 4 + 2\cdot 0 + 3\cdot(-1) = 4 + 0 - 3 = 1" />.
      </p>
      <p>
        Geometrically it measures how much two vectors point in the same
        direction: it's large and positive when they point the same way,
        zero when they're at a right angle (see{" "}
        <ConceptLink slug="orthogonal-vectors" />), and negative when they
        point in roughly opposite directions. Written as a{" "}
        <ConceptLink slug="matrix" /> product of a row vector and a column
        vector, <InlineMath tex="a\cdot b = a^\top b" />. This same
        pattern — multiply matching entries, sum the results — is the
        building block of ordinary <ConceptLink slug="matrix-multiplication" />
        , and generalized versions of it are exactly what a{" "}
        <ConceptLink slug="kernel-function" /> computes.
      </p>
    </div>
  )
}
