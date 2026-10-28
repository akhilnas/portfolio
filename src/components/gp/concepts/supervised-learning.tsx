import { ConceptLink } from "../tooltip"

export const meta = { slug: "supervised-learning", term: "supervised learning" }

export default function SupervisedLearningContent() {
  return (
    <div className="stack">
      <p>
        Learning a mapping from inputs to outputs by example: you're given a{" "}
        <ConceptLink slug="training-set" /> of input-output pairs (e.g. images
        of digits paired with the digit they show), and the goal is a rule
        that predicts the output for a new input you haven't seen before.
        It's "supervised" because each training example already comes with
        the correct answer attached, usually provided by a human.
      </p>
      <p>
        Depending on whether the output is a number or a category, this
        splits into <ConceptLink slug="regression" /> or{" "}
        <ConceptLink slug="classification" />. Since you only ever see a
        finite set of examples but want a rule that works everywhere, making
        this prediction is fundamentally an{" "}
        <ConceptLink slug="inductive-reasoning">inductive</ConceptLink> problem — you have to
        assume something about how the world behaves beyond the data you've
        seen.
      </p>
    </div>
  )
}
