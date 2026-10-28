import { InlineMath } from "../Math"
import { ConceptLink } from "../tooltip"

export const meta = { slug: "vector", term: "vector" }

export default function VectorContent() {
  return (
    <div className="stack">
      <p>
        An ordered list of numbers, written{" "}
        <InlineMath tex="\mathbf{x} = (x_1, x_2, \ldots, x_n)" />. You can
        picture a vector as an arrow from the origin to a point in space — two
        numbers give a point on a plane, three give a point in 3D, and this
        keeps making sense even when there are more coordinates than we can
        draw.
      </p>
      <p>
        In GP work vectors usually hold either the input variables of one
        data point (e.g. a set of measurements) or a column of a{" "}
        <ConceptLink slug="matrix" />, which is just a rectangular grid built
        out of several vectors placed side by side.
      </p>
    </div>
  )
}
