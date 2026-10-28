import { InlineMath } from "../Math"
import { ConceptLink } from "../tooltip"

export const meta = { slug: "feature-space", term: "feature space" }

export default function FeatureSpaceContent() {
  return (
    <div className="stack">
      <p>
        The space a raw input gets mapped into before fitting a{" "}
        <ConceptLink slug="linear-predictor" />. If a scalar input{" "}
        <InlineMath tex="x" /> is expanded by a set of{" "}
        <ConceptLink slug="basis-function">basis functions</ConceptLink>{" "}
        <InlineMath tex="\phi(x) = (\phi_1(x), \ldots, \phi_N(x))^\top" />, the
        resulting vector <InlineMath tex="\phi(x)" /> lives in an{" "}
        <InlineMath tex="N" />-dimensional feature space — often a much higher
        dimension than the original input, sometimes even infinite.
      </p>
      <p>
        The payoff: a model that's still just a straight sum of weighted
        coordinates (linear) in feature space can be a highly curved,
        flexible function of the original <InlineMath tex="x" />. This is the
        move at the heart of the <ConceptLink slug="weight-space-view" />, and
        it's what the <ConceptLink slug="kernel-trick" /> exploits — some
        feature spaces are large enough that you'd never want to build{" "}
        <InlineMath tex="\phi(x)" /> explicitly, and the kernel trick lets you
        skip straight to the answer.
      </p>
    </div>
  )
}
