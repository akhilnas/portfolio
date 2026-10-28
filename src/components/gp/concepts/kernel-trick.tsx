import { InlineMath } from "../Math"
import { ConceptLink } from "../tooltip"

export const meta = { slug: "kernel-trick", term: "kernel trick" }

export default function KernelTrickContent() {
  return (
    <div className="stack">
      <p>
        A shortcut for getting the benefits of a huge — even infinite —{" "}
        <ConceptLink slug="feature-space" /> without ever having to build it.
        Suppose you map each input <InlineMath tex="x" /> to a feature vector{" "}
        <InlineMath tex="\phi(x)" /> and an algorithm only ever needs{" "}
        <ConceptLink slug="dot-product">dot products</ConceptLink>{" "}
        <InlineMath tex="\phi(x)\cdot\phi(x')" /> between such vectors, never
        the vectors themselves. Then you can replace every one of those dot
        products with a <ConceptLink slug="kernel-function" />{" "}
        <InlineMath tex="k(x,x') = \phi(x)\cdot\phi(x')" />, computed directly
        from the original inputs — skipping the (possibly huge, possibly
        infinite-dimensional) feature vectors entirely.
      </p>
      <p>
        The <ConceptLink slug="squared-exponential-kernel" /> is a classic
        example: it corresponds to an infinite-dimensional feature space, yet{" "}
        <InlineMath tex="k(x,x')" /> itself is just one cheap exponential to
        evaluate. Algorithms that exploit this trick — replacing dot products
        with kernel evaluations throughout — are called{" "}
        <ConceptLink slug="kernel-machine">kernel machines</ConceptLink>.
      </p>
    </div>
  )
}
