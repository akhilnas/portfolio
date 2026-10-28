import { BlockMath, InlineMath } from "../Math"
import { ConceptLink } from "../tooltip"

export const meta = { slug: "signal-variance", term: "signal variance" }

export default function SignalVarianceContent() {
  return (
    <div className="stack">
      <p>
        The <ConceptLink slug="hyperparameter" /> <InlineMath tex="\sigma_f^2" />{" "}
        that sits out front of a covariance function such as the{" "}
        <ConceptLink slug="squared-exponential-kernel" />,
      </p>
      <BlockMath tex="k(x_p,x_q) = \sigma_f^2\exp\left(-\frac{1}{2\ell^2}(x_p-x_q)^2\right)," />
      <p>
        controlling the overall vertical scale of the functions the{" "}
        <ConceptLink slug="gaussian-process" /> generates. It sets the{" "}
        <ConceptLink slug="variance" /> of the function at any single point,{" "}
        <InlineMath tex="\mathrm{var}(f(x)) = k(x,x) = \sigma_f^2" />, so it's
        the "signal" counterpart to the noise variance{" "}
        <InlineMath tex="\sigma_n^2" /> that separately describes measurement
        noise on the observed targets. Turning{" "}
        <InlineMath tex="\sigma_f^2" /> up stretches sample functions further
        away from the mean function (and widens the prior's error bars);
        turning it down flattens them toward zero. It doesn't affect how
        wiggly the functions look — that's controlled by the{" "}
        <ConceptLink slug="characteristic-length-scale" /> instead.
      </p>
    </div>
  )
}
