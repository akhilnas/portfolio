import { BlockMath, InlineMath } from "../Math"
import { ConceptLink } from "../tooltip"

export const meta = { slug: "loss-function", term: "loss function" }

export default function LossFunctionContent() {
  return (
    <div className="stack">
      <p>
        A rule for scoring how bad a guess is. Once you've committed to a
        single point prediction <InlineMath tex="y_{\text{guess}}" />, the
        loss function <InlineMath tex="L(y_{\text{true}}, y_{\text{guess}})" />{" "}
        tells you the penalty you pay if the true value turns out to be{" "}
        <InlineMath tex="y_{\text{true}}" /> — zero if you guessed exactly
        right, and larger the further off you were.
      </p>
      <BlockMath tex="L(y_{\text{true}}, y_{\text{guess}})" />
      <p>
        Squared loss, <InlineMath tex="(y_{\text{true}} - y_{\text{guess}})^2" />
        , and absolute loss, <InlineMath tex="|y_{\text{true}} - y_{\text{guess}}|" />
        , are the two classic choices, but really the loss function is a
        statement about real-world consequences, not statistics — it can be
        anything, including asymmetric (guessing too low costs more than
        guessing too high, say). This is a separate ingredient from the{" "}
        <ConceptLink slug="likelihood" />, which describes how the data
        arose, not what a wrong guess costs you: the two get combined only at
        the end, when you use the predictive distribution and a loss
        function together to pick a single best guess, via the{" "}
        <ConceptLink slug="expected-loss" />.
      </p>
    </div>
  )
}
