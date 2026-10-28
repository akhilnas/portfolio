import { InlineMath } from "../Math"
import { ConceptLink } from "../tooltip"

export const meta = { slug: "covariance-function", term: "covariance function" }

export default function CovarianceFunctionContent() {
  return (
    <div className="stack">
      <p>
        The function <InlineMath tex="k(x,x')" /> that a{" "}
        <ConceptLink slug="gaussian-process" /> uses to say how strongly two
        function values, <InlineMath tex="f(x)" /> and <InlineMath tex="f(x')" />
        , are linked — literally their{" "}
        <ConceptLink slug="covariance" />, <InlineMath tex="k(x,x')=\mathrm{Cov}(f(x),f(x'))" />
        , as a function of the two input points rather than a single fixed
        number. Together with a mean function, it completely determines the
        GP: plug in any finite set of inputs and evaluating{" "}
        <InlineMath tex="k" /> at every pair gives you the{" "}
        <ConceptLink slug="covariance-matrix" /> of their joint{" "}
        <ConceptLink slug="multivariate-gaussian-distribution" />.
      </p>
      <p>
        This is exactly the same object the GP literature (and ML
        generally) also calls a <ConceptLink slug="kernel-function" /> — the
        two names are used completely interchangeably here. For{" "}
        <InlineMath tex="k" /> to be valid, it must be symmetric,{" "}
        <InlineMath tex="k(x,x') = k(x',x)" />, and produce a{" "}
        <ConceptLink slug="positive-semidefinite-matrix" /> whenever evaluated
        on any finite set of points — otherwise the "covariance matrix" it
        builds wouldn't be a valid one. The most commonly used covariance
        function is the <ConceptLink slug="squared-exponential-kernel" />.
      </p>
    </div>
  )
}
