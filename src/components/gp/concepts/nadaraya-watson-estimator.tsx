import { InlineMath, BlockMath } from "../Math"
import { ConceptLink } from "../tooltip"

export const meta = { slug: "nadaraya-watson-estimator", term: "Nadaraya-Watson estimator" }

export default function NadarayaWatsonEstimatorContent() {
  return (
    <div className="stack">
      <p>
        A classical, simple <ConceptLink slug="linear-smoother" /> that
        predates <ConceptLink slug="gaussian-process" /> regression: to
        predict at a point <InlineMath tex="x_*" />, center a kernel function{" "}
        <InlineMath tex="\kappa" /> on <InlineMath tex="x_*" />, use it to
        score how "close" each training input{" "}
        <InlineMath tex="x_i" /> is, and predict a weighted average of the
        targets using those closeness scores as weights:
      </p>
      <BlockMath tex="\hat f(x_*) = \sum_{i=1}^n w_i y_i, \qquad w_i = \frac{\kappa(|x_i-x_*|/\ell)}{\sum_{j=1}^n \kappa(|x_j-x_*|/\ell)}" />
      <p>
        The weights are normalized to sum to one, so nearby points dominate
        the average and far-away points contribute almost nothing — the
        same intuition as a GP's <ConceptLink slug="weight-function" />, just
        with hand-chosen weights rather than ones derived from a{" "}
        <ConceptLink slug="covariance-function" /> and the noise level. It's
        a useful reference point: GP regression can be seen as a more
        principled, automatically-tuned generalization of this old idea.
      </p>
    </div>
  )
}
