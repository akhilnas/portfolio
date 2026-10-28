import { ConceptLink } from "../tooltip"

export const meta = { slug: "function-space-view", term: "function-space view" }

export default function FunctionSpaceViewContent() {
  return (
    <div className="stack">
      <p>
        The second of two equivalent ways the GPML textbook presents{" "}
        <ConceptLink slug="gaussian-process" /> regression, and the one that
        gives the framework its name. Instead of putting a prior on a weight
        vector and working backward from there (the{" "}
        <ConceptLink slug="weight-space-view" />), you put a distribution
        directly on the unknown function <em>itself</em> — the Gaussian
        process — and condition it on the observed data to get a posterior
        distribution over functions.
      </p>
      <p>
        It can feel more abstract at first, since there's no explicit weight
        vector to picture. But the GPML textbook shows the two views make identical
        predictions: any weight-space model built from{" "}
        <ConceptLink slug="basis-function">basis functions</ConceptLink> and a
        Gaussian prior on the weights corresponds to some specific{" "}
        <ConceptLink slug="covariance-function" />, and running that
        covariance function's Gaussian process gives back exactly the same
        answer. The function-space view is usually more convenient in
        practice, because it lets you skip choosing basis functions
        altogether and work with the covariance function directly.
      </p>
    </div>
  )
}
