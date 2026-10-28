import { BlockMath, InlineMath } from "../Math"
import { ConceptLink } from "../tooltip"

export const meta = { slug: "variance", term: "variance" }

export default function VarianceContent() {
  return (
    <div className="stack">
      <p>
        A number measuring how spread out a{" "}
        <ConceptLink slug="random-variable" /> <InlineMath tex="X" /> tends to
        be around its average value <InlineMath tex="\mathbb{E}[X]" />: take
        the typical squared distance from the mean.
      </p>
      <BlockMath tex="\text{Var}(X) = \mathbb{E}\big[(X - \mathbb{E}[X])^2\big]" />
      <p>
        Squaring keeps every deviation positive (so spread in either
        direction counts, and values don't cancel out) but it also means
        variance is measured in "squared units" of <InlineMath tex="X" /> —
        which is why the{" "}
        <ConceptLink slug="standard-deviation" /> (its square root) is often
        the more intuitive number to report.
      </p>
    </div>
  )
}
