import { BlockMath } from "../Math"
import { ConceptLink } from "../tooltip"

export const meta = { slug: "posterior-distribution", term: "posterior distribution" }

export default function PosteriorDistributionContent() {
  return (
    <div className="stack">
      <p>
        What you believe about an unknown quantity <em>after</em> combining
        your <ConceptLink slug="prior-distribution" /> with the{" "}
        <ConceptLink slug="likelihood" /> of the data you actually observed,
        via <ConceptLink slug="bayes-rule" />. It is itself a{" "}
        <ConceptLink slug="probability-distribution" />, so it doesn't hand
        you one "best" answer — it assigns every possible value (or, in this
        book, every possible function) a weight of plausibility, with the
        data pulling weight away from values the prior favored but the
        evidence didn't support.
      </p>
      <BlockMath tex="p(w \mid y) = \frac{p(y\mid w)\,p(w)}{p(y)}" />
    </div>
  )
}
