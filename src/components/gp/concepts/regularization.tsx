import { BlockMath } from "../Math"
import { ConceptLink } from "../tooltip"

export const meta = { slug: "regularization", term: "regularization" }

export default function RegularizationContent() {
  return (
    <div className="stack">
      <p>
        A way to discourage a model from fitting the training data too
        eagerly, by tacking an extra penalty term onto whatever objective
        you're minimizing — one that grows when the model's parameters get
        large, or the fitted function gets unnecessarily wiggly. Left
        unchecked, a flexible enough model will chase every bit of noise in
        the <ConceptLink slug="training-set" />, which is exactly{" "}
        <ConceptLink slug="overfitting" />; the penalty trades away some fit
        to the training data in exchange for a simpler, more trustworthy
        function.
      </p>
      <BlockMath tex="\text{penalized loss} = \text{loss on data} + \lambda \cdot \text{penalty}(w)" />
      <p>
        This has a direct Bayesian translation: a penalty on the parameters
        is the same move as choosing a <ConceptLink slug="prior-distribution" />{" "}
        that considers large parameter values unlikely before seeing any
        data. Under that reading, a "regularized" fit is just the{" "}
        <ConceptLink slug="map-estimate" /> in disguise — the same formula,
        arrived at either by bolting on a penalty term by hand or by doing
        ordinary Bayesian inference with a skeptical prior.
      </p>
    </div>
  )
}
