import { InlineMath } from "../Math"
import { ConceptLink } from "../tooltip"

export const meta = { slug: "characteristic-length-scale", term: "characteristic length-scale" }

export default function CharacteristicLengthScaleContent() {
  return (
    <div className="stack">
      <p>
        Roughly, how far you have to move along the input axis before a
        function drawn from the <ConceptLink slug="gaussian-process" />{" "}
        prior looks meaningfully different — the{" "}
        <ConceptLink slug="hyperparameter" /> <InlineMath tex="\ell" /> that
        appears inside most <ConceptLink slug="covariance-function" />s, e.g.
        as <InlineMath tex="(x-x')^2/\ell^2" /> in the{" "}
        <ConceptLink slug="squared-exponential-kernel" />.
      </p>
      <p>
        A short length-scale means nearby inputs are only weakly correlated,
        so sampled curves wiggle rapidly and each data point only informs
        predictions in a narrow neighborhood around it. A long length-scale
        keeps distant inputs correlated, giving slow, smooth curves where a
        single observation influences predictions far away. See{" "}
        <ConceptLink slug="length-scale" /> for the general term this
        specializes.
      </p>
    </div>
  )
}
