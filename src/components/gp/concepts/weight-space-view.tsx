import { InlineMath } from "../Math"
import { ConceptLink } from "../tooltip"

export const meta = { slug: "weight-space-view", term: "weight-space view" }

export default function WeightSpaceViewContent() {
  return (
    <div className="stack">
      <p>
        The first of two equivalent ways the GPML textbook presents{" "}
        <ConceptLink slug="gaussian-process" /> regression. Here you work
        directly with a linear model's weight vector{" "}
        <InlineMath tex="w" />: put a <ConceptLink slug="prior-distribution" />{" "}
        on <InlineMath tex="w" /> before seeing any data, then use{" "}
        <ConceptLink slug="bayes-rule" /> to turn it into a{" "}
        <ConceptLink slug="posterior-distribution" /> over{" "}
        <InlineMath tex="w" /> once the <ConceptLink slug="training-set" /> is
        observed. Predictions come from averaging over every plausible weight
        vector, weighted by how probable the posterior says it is.
      </p>
      <p>
        This is the more familiar starting point, since it's just Bayesian
        linear regression — optionally with the inputs first expanded into a{" "}
        <ConceptLink slug="feature-space" /> via{" "}
        <ConceptLink slug="basis-function">basis functions</ConceptLink> to
        allow curved fits. The book proves it gives <em>exactly</em> the same
        predictions as the <ConceptLink slug="function-space-view" />, which
        skips weights entirely and reasons directly about a distribution over
        functions — two routes to the same answer.
      </p>
    </div>
  )
}
