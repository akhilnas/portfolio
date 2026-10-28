import { ConceptLink } from "../tooltip"

export const meta = { slug: "gp-consistency", term: "consistency" }

export default function GpConsistencyContent() {
  return (
    <div className="stack">
      <p>
        A specific technical requirement for a{" "}
        <ConceptLink slug="stochastic-process" />, not just an everyday
        "makes sense" claim: if you ask the process about a large set of
        inputs and get a{" "}
        <ConceptLink slug="multivariate-gaussian-distribution" />, then
        asking about any smaller subset of those same inputs (ignoring the
        rest) must give back exactly the corresponding{" "}
        <ConceptLink slug="marginal-probability" /> of that bigger
        distribution.
      </p>
      <p>
        In other words, it never matters whether extra points you don't care
        about were "in the room" when the answer was computed — the marginals
        always agree. This is what lets a{" "}
        <ConceptLink slug="gaussian-process" /> describe a function over
        infinitely many possible inputs while every actual computation only
        ever touches a finite handful of them.
      </p>
    </div>
  )
}
