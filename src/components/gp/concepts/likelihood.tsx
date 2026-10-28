import { BlockMath } from "../Math"
import { ConceptLink } from "../tooltip"

export const meta = { slug: "likelihood", term: "likelihood" }

export default function LikelihoodContent() {
  return (
    <div className="stack">
      <p>
        The likelihood is a <ConceptLink slug="conditional-probability" /> —
        p(data | parameters) — but read in the opposite direction from how
        you'd normally read a probability. The data is fixed (it's what you
        actually observed), and the expression is treated as a function of
        the unknown parameters: it says how probable your data would have
        been, had each possible parameter setting been the true one.
      </p>
      <BlockMath tex="p(y \mid X, w)" />
      <p>
        In <ConceptLink slug="bayes-rule" />, the likelihood is what lets the
        data actually speak: it gets multiplied against the{" "}
        <ConceptLink slug="prior-distribution" /> to produce the{" "}
        <ConceptLink slug="posterior-distribution" />. A high likelihood at
        some parameter value just means that value made the observed data
        look relatively probable — not that the parameter itself is probable;
        for that you need the full posterior.
      </p>
    </div>
  )
}
