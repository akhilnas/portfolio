import { InlineMath } from "../Math"
import { ConceptLink } from "../tooltip"

export const meta = { slug: "hyperparameter", term: "hyperparameter" }

export default function HyperparameterContent() {
  return (
    <div className="stack">
      <p>
        A "dial" that you set before fitting the model, as opposed to a
        quantity the model fits directly from data. For a{" "}
        <ConceptLink slug="kernel-function" />
        like the <ConceptLink slug="squared-exponential-kernel" />, the{" "}
        <ConceptLink slug="characteristic-length-scale" />{" "}
        <InlineMath tex="\ell" /> and the signal variance are hyperparameters:
        they control the shape of the whole family of functions the{" "}
        <ConceptLink slug="gaussian-process" /> considers plausible, rather
        than being an output of a single prediction.
      </p>
      <p>
        The name distinguishes them from ordinary "parameters" in the
        weight-space sense (like the weights of a linear model), which is
        why the GPML textbook calls them hyper<em>parameters</em>: parameters
        <em> of</em> the prior itself. Chapter 5 covers how to pick good
        hyperparameter values from data — usually by maximizing the{" "}
        <ConceptLink slug="marginal-likelihood" />.
      </p>
    </div>
  )
}
