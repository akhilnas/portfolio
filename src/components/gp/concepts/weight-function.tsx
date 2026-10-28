import { InlineMath, BlockMath } from "../Math"
import { ConceptLink } from "../tooltip"

export const meta = { slug: "weight-function", term: "weight function" }

export default function WeightFunctionContent() {
  return (
    <div className="stack">
      <p>
        For a <ConceptLink slug="linear-smoother" /> like GP regression, the
        vector of weights applied to the training targets{" "}
        <InlineMath tex="y" /> when predicting at a test point{" "}
        <InlineMath tex="x_*" />:
      </p>
      <BlockMath tex="h(x_*) = (K+\sigma_n^2 I)^{-1}k(x_*), \qquad \bar f(x_*) = h(x_*)^\top y" />
      <p>
        Each entry <InlineMath tex="h_i(x_*)" /> says how much training point{" "}
        <InlineMath tex="i" /> gets to "vote" on the prediction at{" "}
        <InlineMath tex="x_*" />: usually largest for training points near{" "}
        <InlineMath tex="x_*" /> and smaller (sometimes even negative) further
        away. Because it doesn't depend on <InlineMath tex="y" />, you can
        study how a method smooths data just by plotting its weight
        function — this is exactly what Figure 2.6 does, comparing it to
        the idealized <ConceptLink slug="equivalent-kernel" />.
      </p>
    </div>
  )
}
