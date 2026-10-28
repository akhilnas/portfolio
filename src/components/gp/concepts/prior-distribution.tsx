import { BlockMath } from "../Math"
import { ConceptLink } from "../tooltip"

export const meta = { slug: "prior-distribution", term: "prior distribution" }

export default function PriorDistributionContent() {
  return (
    <div className="stack">
      <p>
        A <ConceptLink slug="probability-distribution" /> encoding what you
        believe about an unknown quantity <em>before</em> seeing any data —
        "prior" as in "prior to the evidence." In GP work the unknown is
        usually not a handful of numbers but an entire function, so the prior
        distribution assigns relative plausibility to whole candidate
        functions (e.g. "smooth, slowly-varying functions are more plausible
        than wildly jagged ones").
      </p>
      <p>
        Once data arrives, <ConceptLink slug="bayes-rule" /> combines the
        prior with the <ConceptLink slug="likelihood" /> of that data to
        produce an updated <ConceptLink slug="posterior-distribution" />:
      </p>
      <BlockMath tex="p(w) \ \longrightarrow\ p(w \mid y) \ \propto\ p(y\mid w)\,p(w)" />
    </div>
  )
}
