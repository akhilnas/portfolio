import { InlineMath } from "../Math"
import { ConceptLink } from "../tooltip"

export const meta = { slug: "kernel-function", term: "kernel function" }

export default function KernelFunctionContent() {
  return (
    <div className="stack">
      <p>
        A function <InlineMath tex="k(x,x')" /> that takes two inputs and
        returns a single number measuring how "similar" or closely related
        they are — large when <InlineMath tex="x" /> and <InlineMath tex="x'" />{" "}
        are alike, small or negative when they aren't. To count as a valid
        kernel it must be symmetric, <InlineMath tex="k(x,x')=k(x',x)" />, and{" "}
        <ConceptLink slug="positive-semidefinite-matrix">
          positive semidefinite
        </ConceptLink>{" "}
        — any matrix built by evaluating it at pairs from a finite set of
        points must be a valid covariance matrix.
      </p>
      <p>
        In GP work, kernel function and{" "}
        <ConceptLink slug="covariance-function" /> mean exactly the same
        thing: the kernel <em>is</em> the covariance function of a{" "}
        <ConceptLink slug="gaussian-process" />. The name "kernel" comes from
        the broader ML tradition, where such a function is used to build{" "}
        <ConceptLink slug="kernel-machine">kernel machines</ConceptLink> via
        the <ConceptLink slug="kernel-trick" /> — computing similarities
        directly, without ever forming an explicit{" "}
        <ConceptLink slug="feature-space" /> mapping. The default kernel used
        throughout GP work is the{" "}
        <ConceptLink slug="squared-exponential-kernel" />.
      </p>
    </div>
  )
}
