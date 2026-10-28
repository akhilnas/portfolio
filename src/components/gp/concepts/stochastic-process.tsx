import { InlineMath } from "../Math"
import { ConceptLink } from "../tooltip"

export const meta = { slug: "stochastic-process", term: "stochastic process" }

export default function StochasticProcessContent() {
  return (
    <p>
      A collection of <ConceptLink slug="random-variable" />s indexed by
      something — often time, or here, an input <InlineMath tex="x" />{" "}
      — so that instead of one random number, you get a whole random
      function. A <ConceptLink slug="gaussian-process" /> is the particular
      stochastic process where any finite collection of those random
      variables follows a{" "}
      <ConceptLink slug="multivariate-gaussian-distribution" />.
    </p>
  )
}
