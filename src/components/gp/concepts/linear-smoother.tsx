import { InlineMath, BlockMath } from "../Math"
import { ConceptLink } from "../tooltip"

export const meta = { slug: "linear-smoother", term: "linear smoother" }

export default function LinearSmootherContent() {
  return (
    <div className="stack">
      <p>
        Any prediction method whose output is a linear combination — a
        weighted sum — of the training set's <InlineMath tex="y" /> values.
        Gaussian process regression is a linear smoother because its
        posterior mean prediction has exactly this form:
      </p>
      <BlockMath tex="\bar f(x_*) = \sum_{i=1}^n h_i(x_*)\, y_i" />
      <p>
        where the weights <InlineMath tex="h_i(x_*)" /> — collected as the{" "}
        <ConceptLink slug="weight-function" /> — depend only on the input
        locations and the <ConceptLink slug="covariance-function" />, never
        on the observed <InlineMath tex="y_i" /> themselves.
      </p>
      <p>
        This is a different sense of "linear" than in "linear model": a
        linear <em>model</em> combines the input features linearly, while a
        linear <em>smoother</em> combines the training <em>targets</em>{" "}
        linearly — a GP posterior mean can do the latter even though{" "}
        <InlineMath tex="f" /> itself is a highly non-linear function of{" "}
        <InlineMath tex="x_*" />.
      </p>
    </div>
  )
}
