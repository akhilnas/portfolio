import { BlockMath } from "../Math"
import { ConceptLink } from "../tooltip"

export const meta = { slug: "joint-probability", term: "joint probability" }

export default function JointProbabilityContent() {
  return (
    <div className="stack">
      <p>
        The probability that two (or more) <ConceptLink slug="random-variable" />
        s take specific values at the same time — not "how likely is X" or "how
        likely is Y" separately, but "how likely is this particular combination
        of X and Y."
      </p>
      <BlockMath tex="p(X = x, Y = y)" />
      <p>
        E.g. rolling two dice: the joint probability of the first die showing 3
        and the second showing 5 is a single number describing that specific
        pair. Summing a joint probability over one variable recovers a{" "}
        <ConceptLink slug="marginal-probability" />; dividing it by one
        variable's probability gives a <ConceptLink slug="conditional-probability" />.
      </p>
    </div>
  )
}
