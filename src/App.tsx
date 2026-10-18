import { SpecodeIframeTracker } from "@/components/layout/SpecodeIframeTracker";
export const qaCheckOne: number = "one";

export default function App() {
  return (
    <>
      <SpecodeIframeTracker />
      <main className="clinic-sheet">
        <h1>Sample Clinic</h1>

        <div className="clinic-information">
          <section aria-labelledby="hours-heading">
            <h2 id="hours-heading">Opening hours</h2>
            <dl>
              <div className="information-entry">
                <dt>Monday–Friday</dt>
                <dd>9:00 AM–5:00 PM</dd>
              </div>
              <div className="information-entry">
                <dt>Saturday–Sunday</dt>
                <dd>Closed</dd>
              </div>
            </dl>
          </section>

          <section aria-labelledby="contact-heading">
            <h2 id="contact-heading">Contact</h2>
            <dl>
              <div className="information-entry">
                <dt>Phone</dt>
                <dd>+1 (202) 555-0147</dd>
              </div>
              <div className="information-entry">
                <dt>Email</dt>
                <dd>clinic@example.com</dd>
              </div>
              <div className="information-entry">
                <dt>Address</dt>
                <dd>123 Example Street, Sample Town</dd>
              </div>
            </dl>
          </section>
        </div>

        <p className="sample-notice">
          Sample information for a deployment test. Not a real clinic listing.
        </p>
      </main>
    </>
  );
}
