import { ConceptLink } from "../tooltip"

export const meta = { slug: "classification", term: "classification" }

export default function ClassificationContent() {
  return (
    <div className="stack">
      <p>
        A <ConceptLink slug="supervised-learning" /> problem where the output
        is discrete — one of a fixed set of categories, rather than a number
        on a continuum. Recognizing a handwritten digit as one of 0 through 9
        is classification; so is the simplest case, deciding between just two
        categories (e.g. "spam" or "not spam").
      </p>
      <p>
        This is the natural counterpart to <ConceptLink slug="regression" />,
        which handles continuous-valued outputs instead. The two share the
        same setup — a <ConceptLink slug="training-set" /> of examples, a
        function to be learned from them — they just differ in what kind of
        value that function is allowed to output.
      </p>
    </div>
  )
}
