import { InlineMath } from "../Math"
import { ConceptLink } from "../tooltip"

export const meta = { slug: "kernel-machine", term: "kernel machine" }

export default function KernelMachineContent() {
  return (
    <div className="stack">
      <p>
        The broad family of machine learning methods that never touch input
        points directly — instead, every computation only ever needs a{" "}
        <ConceptLink slug="kernel-function" /> <InlineMath tex="k(x,x')" />{" "}
        giving the pairwise similarity between two inputs, often obtained via
        the <ConceptLink slug="kernel-trick" />. Support vector machines and
        kernel ridge regression are classic examples; a{" "}
        <ConceptLink slug="gaussian-process" /> model for regression is
        another, since its predictive mean turns out to be a weighted sum of
        kernel evaluations against the training inputs,{" "}
        <InlineMath tex="\bar f(x_*) = \sum_i \alpha_i\, k(x_i,x_*)" />.
      </p>
      <p>
        The appeal is that swapping in a different <InlineMath tex="k" />{" "}
        changes what kinds of functions or decision boundaries the method can
        represent, without changing the underlying algorithm at all — all the
        modeling choices get concentrated into the choice of kernel.
      </p>
    </div>
  )
}
