import { BlockMath, InlineMath } from "../Math"
import { ConceptLink } from "../tooltip"

export const meta = { slug: "cholesky-decomposition", term: "Cholesky decomposition" }

export default function CholeskyDecompositionContent() {
  return (
    <div className="stack">
      <p>
        A way of writing any{" "}
        <ConceptLink slug="positive-definite-matrix" /> <InlineMath tex="A" />{" "}
        as the product of a lower-triangular matrix <InlineMath tex="L" /> (all
        entries above the diagonal are zero) and its own{" "}
        <ConceptLink slug="matrix-transpose" />:
      </p>
      <BlockMath tex="A = LL^\top" />
      <p>
        Think of it as a matrix version of taking a square root — for a
        single positive number <InlineMath tex="a" />, you'd write{" "}
        <InlineMath tex="a = \sqrt{a}\cdot\sqrt{a}" />; <InlineMath tex="L" />{" "}
        plays that role for <InlineMath tex="A" />. For example, for{" "}
        <InlineMath tex="A = \begin{pmatrix}4 & 2\\ 2 & 5\end{pmatrix}" />,
        the Cholesky factor is{" "}
        <InlineMath tex="L = \begin{pmatrix}2 & 0\\ 1 & 2\end{pmatrix}" />,
        and you can check that <InlineMath tex="LL^\top" /> reproduces{" "}
        <InlineMath tex="A" />.
      </p>
      <p>
        The book uses this constantly (Algorithm 2.1) to compute{" "}
        <InlineMath tex="L = \mathrm{cholesky}(K + \sigma_n^2 I)" /> instead
        of directly forming <InlineMath tex="(K+\sigma_n^2I)^{-1}" />: solving
        two triangular systems with <InlineMath tex="L" /> is faster and far
        more numerically stable than a full{" "}
        <ConceptLink slug="matrix-inverse" />, and the diagonal of{" "}
        <InlineMath tex="L" /> gives an easy way to compute the{" "}
        <ConceptLink slug="determinant" /> term in the{" "}
        <ConceptLink slug="marginal-likelihood" /> via{" "}
        <InlineMath tex="\log|A| = 2\sum_i \log L_{ii}" />.
      </p>
    </div>
  )
}
