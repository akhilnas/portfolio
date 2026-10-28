import { InlineMath } from "../Math"
import { ConceptLink } from "../tooltip"

export const meta = { slug: "probability-distribution", term: "probability distribution" }

export default function ProbabilityDistributionContent() {
  return (
    <div className="stack">
      <p>
        A rule that says how likely each possible value of a{" "}
        <ConceptLink slug="random-variable" /> is. For a die it's a list:
        each face gets <InlineMath tex="1/6" />. For a quantity that can be
        any real number, like tomorrow's temperature, it's a curve (a
        density) whose area over a range gives the probability of landing in
        that range.
      </p>
      <p>
        Either way the probabilities must add up to 1. The most important
        example here is the <ConceptLink slug="gaussian-distribution" />, the
        bell curve. A Gaussian process goes one step further and puts a
        distribution over whole functions.
      </p>
    </div>
  )
}
