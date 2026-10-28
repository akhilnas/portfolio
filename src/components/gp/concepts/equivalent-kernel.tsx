import { ConceptLink } from "../tooltip"

export const meta = { slug: "equivalent-kernel", term: "equivalent kernel" }

export default function EquivalentKernelContent() {
  return (
    <div className="stack">
      <p>
        The exact <ConceptLink slug="weight-function" /> of a{" "}
        <ConceptLink slug="gaussian-process" /> depends messily on where the
        finitely many training points happen to sit, since it involves
        inverting the <ConceptLink slug="covariance-matrix" /> of that
        specific set. The equivalent kernel is what you get if you idealize
        away that mess: imagine the training points "smeared out" into a
        continuous density along the input axis instead of sitting at
        particular locations, and ask what the weight function converges to.
      </p>
      <p>
        The result is a fixed, analyzable curve centered on the test point —
        in practice it often looks like a damped, oscillating version of the
        original <ConceptLink slug="covariance-function" />, as Figure 2.6
        shows for the <ConceptLink slug="squared-exponential-kernel" />. It
        plays the same role classical{" "}
        <ConceptLink slug="linear-smoother" />s in statistics have long used
        to characterize their smoothing behavior, such as the kernel in a{" "}
        <ConceptLink slug="nadaraya-watson-estimator" />.
      </p>
    </div>
  )
}
