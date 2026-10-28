import { BlockMath, InlineMath } from "../Math"
import { ConceptLink } from "../tooltip"

export const meta = {
  slug: "multivariate-gaussian-distribution",
  term: "multivariate Gaussian distribution",
}

export default function MultivariateGaussianDistributionContent() {
  return (
    <div className="stack">
      <p>
        The extension of the <ConceptLink slug="gaussian-distribution" /> from
        a single number to a whole <ConceptLink slug="vector" /> of{" "}
        <ConceptLink slug="random-variable" />s at once, all varying together.
        Instead of a mean and a variance, it's described by a mean{" "}
        <em>vector</em> <InlineMath tex="\mu" /> and a{" "}
        <ConceptLink slug="covariance-matrix" /> <InlineMath tex="\Sigma" />:
      </p>
      <BlockMath tex="p(x) = \frac{1}{(2\pi)^{n/2}|\Sigma|^{1/2}} \exp\left(-\frac{1}{2}(x-\mu)^\top \Sigma^{-1} (x-\mu)\right)" />
      <p>
        Instead of one bell curve, picture a bump sitting over an{" "}
        <InlineMath tex="n" />-dimensional space: <InlineMath tex="\mu" />{" "}
        says where it's centered, and <InlineMath tex="\Sigma" /> says how
        stretched, squashed, and tilted it is — its diagonal entries are each
        variable's own <ConceptLink slug="variance" />, and its off-diagonal
        entries are the <ConceptLink slug="covariance" />s that couple the
        variables together. This is exactly the object a{" "}
        <ConceptLink slug="gaussian-process" /> hands you whenever you ask
        about a finite set of function values.
      </p>
    </div>
  )
}
