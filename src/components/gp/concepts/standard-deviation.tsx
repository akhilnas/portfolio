import { BlockMath, InlineMath } from "../Math"
import { ConceptLink } from "../tooltip"

export const meta = { slug: "standard-deviation", term: "standard deviation" }

export default function StandardDeviationContent() {
  return (
    <div className="stack">
      <p>
        The square root of the <ConceptLink slug="variance" />, usually
        written <InlineMath tex="\sigma" />:
      </p>
      <BlockMath tex="\sigma = \sqrt{\text{Var}(X)}" />
      <p>
        Taking the square root undoes the squaring used to compute variance,
        so <InlineMath tex="\sigma" /> is back in the same units as{" "}
        <InlineMath tex="X" /> itself — e.g. if <InlineMath tex="X" /> is a
        height in centimeters, <InlineMath tex="\sigma" /> is also in
        centimeters, not centimeters squared. For a{" "}
        <ConceptLink slug="gaussian-distribution" />, <InlineMath tex="\sigma" />{" "}
        directly sets how wide or narrow the bell curve looks.
      </p>
    </div>
  )
}
