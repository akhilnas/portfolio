import { BlockMath, InlineMath } from "../Math"
import { ConceptLink } from "../tooltip"

export const meta = { slug: "covariance", term: "covariance" }

export default function CovarianceContent() {
  return (
    <div className="stack">
      <p>
        A number measuring how two{" "}
        <ConceptLink slug="random-variable" />s move together: whether they
        tend to be above their averages at the same time (positive
        covariance), tend to be on opposite sides (negative), or show no such
        pattern (near zero).
      </p>
      <BlockMath tex="\text{Cov}(X, Y) = \mathbb{E}\big[(X - \mathbb{E}[X])(Y - \mathbb{E}[Y])\big]" />
      <p>
        Covariance of a variable with itself is just its own{" "}
        <ConceptLink slug="variance" />. In a Gaussian process, covariance is
        assigned by a <ConceptLink slug="kernel-function" /> that says how
        strongly two function values <InlineMath tex="f(x)" /> and{" "}
        <InlineMath tex="f(x')" /> are linked, typically based on how close{" "}
        <InlineMath tex="x" /> and <InlineMath tex="x'" /> are.
      </p>
    </div>
  )
}
