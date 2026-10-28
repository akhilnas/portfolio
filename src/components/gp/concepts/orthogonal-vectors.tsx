import { BlockMath } from "../Math"
import { ConceptLink } from "../tooltip"

export const meta = { slug: "orthogonal-vectors", term: "orthogonal vectors" }

export default function OrthogonalVectorsContent() {
  return (
    <div className="stack">
      <p>
        Two vectors are orthogonal if they point in perpendicular
        directions — the direct generalization of a right angle to more than
        two or three dimensions. Algebraically, this means their{" "}
        <ConceptLink slug="dot-product" /> is zero:
      </p>
      <BlockMath tex="u \cdot v = u^\top v = 0" />
      <p>
        Orthogonal vectors are "independent directions" in the strongest
        possible sense: moving along one of them changes nothing about your
        position along the other. This idea shows up when a{" "}
        <ConceptLink slug="matrix" /> is decomposed into a rotation part and
        a stretching part, as in an{" "}
        <ConceptLink slug="eigendecomposition" /> or a{" "}
        <ConceptLink slug="singular-value-decomposition" />: the directions
        that matrix picks out are chosen to be mutually orthogonal.
      </p>
    </div>
  )
}
