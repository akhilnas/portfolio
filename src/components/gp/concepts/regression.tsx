import { ConceptLink } from "../tooltip"

export const meta = { slug: "regression", term: "regression" }

export default function RegressionContent() {
  return (
    <div className="stack">
      <p>
        A <ConceptLink slug="supervised-learning" /> problem where the output
        is continuous — any real number, rather than one of a fixed set of
        categories. Predicting the torque needed at a robot arm's joints, or
        the yield of a chemical process from its operating conditions, are
        both regression problems: the answer could in principle be any
        number along a scale.
      </p>
      <p>
        This is the counterpart to <ConceptLink slug="classification" />,
        which handles discrete-valued outputs instead. Both start from the
        same ingredients — a <ConceptLink slug="training-set" /> of
        input-output examples — and differ only in the kind of output being
        predicted. Gaussian process regression, the GPML textbook's main running
        example, fits a whole distribution over possible functions to a
        regression training set.
      </p>
    </div>
  )
}
