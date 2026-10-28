import { InlineMath } from "../Math"
import { ConceptLink } from "../tooltip"

export const meta = { slug: "inducing-points", term: "inducing points" }

export default function InducingPointsContent() {
  return (
    <div className="stack">
      <p>
        A small set of <InlineMath tex="M" /> stand-in input locations used
        to make a <ConceptLink slug="gaussian-process" /> cheap. Exact GP
        regression has to factorise an <InlineMath tex="n \times n" />{" "}
        <ConceptLink slug="covariance-matrix" />, which costs{" "}
        <InlineMath tex="O(n^3)" /> and becomes infeasible beyond tens of
        thousands of points.
      </p>
      <p>
        Instead, the function values at the inducing points act as a
        bottleneck: every data point is assumed to talk to every other one
        only <em>through</em> them. With <InlineMath tex="M \ll n" />, the
        heavy linear algebra happens on an <InlineMath tex="M \times M" />{" "}
        matrix instead. Methods differ mainly in where the points go: learned
        by optimisation, or fixed on a regular grid.
      </p>
    </div>
  )
}
