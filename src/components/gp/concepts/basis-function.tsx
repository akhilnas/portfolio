import { BlockMath, InlineMath } from "../Math"
import { ConceptLink } from "../tooltip"

export const meta = { slug: "basis-function", term: "basis function" }

export default function BasisFunctionContent() {
  return (
    <div className="stack">
      <p>
        A fixed, chosen-in-advance function used to re-describe an input
        before doing anything else with it. Instead of feeding the raw input{" "}
        <InlineMath tex="x" /> straight into a{" "}
        <ConceptLink slug="linear-predictor" />, you first compute a handful
        of new numbers from it — <InlineMath tex="\phi_1(x), \phi_2(x), \ldots" />{" "}
        — and use those instead. Each <InlineMath tex="\phi_j" /> is one basis
        function.
      </p>
      <p>
        A classic example is powers of <InlineMath tex="x" />:
      </p>
      <BlockMath tex="\phi(x) = (1,\ x,\ x^2,\ x^3,\ \ldots)^\top," />
      <p>
        which is exactly what turns a plain straight-line fit into{" "}
        <ConceptLink slug="polynomial-regression" />. Stacking the outputs of
        several basis functions together for one input gives a longer feature
        vector living in <ConceptLink slug="feature-space" /> — see{" "}
        <ConceptLink slug="weight-space-view" /> for why this trick is useful:
        it lets a model that's linear in its parameters still fit sharply
        curved relationships.
      </p>
    </div>
  )
}
