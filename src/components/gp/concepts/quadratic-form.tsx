import { BlockMath, InlineMath } from "../Math"
import { ConceptLink } from "../tooltip"

export const meta = { slug: "quadratic-form", term: "quadratic form" }

export default function QuadraticFormContent() {
  return (
    <div className="stack">
      <p>
        For a square <ConceptLink slug="matrix" /> <InlineMath tex="A" /> and
        a <ConceptLink slug="vector" /> <InlineMath tex="x" />, the quadratic
        form is the single number you get from sandwiching{" "}
        <InlineMath tex="A" /> between <InlineMath tex="x^\top" /> and{" "}
        <InlineMath tex="x" />:
      </p>
      <BlockMath tex="x^\top A x = \sum_{i,j} x_i A_{ij} x_j" />
      <p>
        It's called "quadratic" because every term is a product of two
        entries of <InlineMath tex="x" /> (compare to an ordinary quadratic
        like <InlineMath tex="ax^2" /> in one variable). Whether this number
        is always positive, always non-negative, or can go either way as{" "}
        <InlineMath tex="x" /> ranges over all nonzero vectors is exactly
        what distinguishes a{" "}
        <ConceptLink slug="positive-definite-matrix" /> from a{" "}
        <ConceptLink slug="positive-semidefinite-matrix" /> from a general
        symmetric matrix.
      </p>
    </div>
  )
}
