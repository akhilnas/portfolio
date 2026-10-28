import { BlockMath } from "../Math"
import { ConceptLink } from "../tooltip"

export const meta = { slug: "random-variable", term: "random variable" }

export default function RandomVariableContent() {
  return (
    <div className="stack">
      <p>
        A quantity whose value depends on the outcome of a random process. Instead
        of one fixed number, it can take on different values, each described by a{" "}
        <ConceptLink slug="probability-distribution" />.
      </p>
      <BlockMath tex="P(X = x)" />
    </div>
  )
}
