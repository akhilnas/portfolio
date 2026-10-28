import { BlockMath, InlineMath } from "../Math"
import { ConceptLink } from "../tooltip"

export const meta = { slug: "training-set", term: "training set" }

export default function TrainingSetContent() {
  return (
    <div className="stack">
      <p>
        The collection of input-output examples a model actually learns
        from: a list of <InlineMath tex="n" /> pairs, each an input{" "}
        <InlineMath tex="\mathbf{x}_i" /> together with its known output{" "}
        <InlineMath tex="y_i" />.
      </p>
      <BlockMath tex="\mathcal{D} = \{(\mathbf{x}_i, y_i) \mid i = 1, \dots, n\}" />
      <p>
        <ConceptLink slug="supervised-learning" /> means fitting a function
        to this set, then using it to predict outputs for brand-new inputs
        that weren't part of it. Fitting the training set too eagerly — down
        to its noise and quirks rather than its general pattern — is exactly
        the trap called <ConceptLink slug="overfitting" />.
      </p>
    </div>
  )
}
