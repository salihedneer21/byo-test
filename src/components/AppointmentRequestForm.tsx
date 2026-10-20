import { useRef, useState, type FormEvent } from "react";
import { api } from "../../convex/_generated/api";
import { convex, isConvexConfigured } from "@/lib/convex";
import {
  todayDate,
  validateAppointmentRequest,
  type AppointmentRequestInput,
  type RequestErrors,
} from "../../shared/appointmentRequest";

const fields = [
  { key: "name", label: "Name", type: "text", autoComplete: "name", maxLength: 100 },
  { key: "phoneNumber", label: "Phone number", type: "tel", autoComplete: "tel", maxLength: 40 },
  { key: "preferredDate", label: "Preferred date", type: "date", autoComplete: "off" },
] as const;

export function AppointmentRequestForm() {
  const [values, setValues] = useState<AppointmentRequestInput>({ name: "", phoneNumber: "", preferredDate: "" });
  const [errors, setErrors] = useState<RequestErrors>({});
  const [pending, setPending] = useState(false);
  const [saved, setSaved] = useState(false);
  const [failed, setFailed] = useState(false);
  const inFlight = useRef(false);
  const inputs = useRef<Partial<Record<keyof AppointmentRequestInput, HTMLInputElement | null>>>({});

  function showErrors(nextErrors: RequestErrors) {
    setErrors(nextErrors);
    const first = fields.find(({ key }) => nextErrors[key]);
    // Focus after React commits the associated error description.
    if (first) requestAnimationFrame(() => inputs.current[first.key]?.focus());
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (inFlight.current || saved) return;
    setFailed(false);
    const nextErrors = validateAppointmentRequest(values);
    showErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;

    inFlight.current = true;
    setPending(true);
    try {
      if (!isConvexConfigured) throw new Error("Saving unavailable");
      const result = await convex.mutation(api.appointmentRequests.submit, values);
      if (result.saved) {
        setSaved(true);
        setValues({ name: "", phoneNumber: "", preferredDate: "" });
      } else {
        showErrors(result.errors);
      }
    } catch {
      // Never log inputs or expose the original backend exception.
      setFailed(true);
    } finally {
      inFlight.current = false;
      setPending(false);
    }
  }

  return (
    <section className="request-section" aria-labelledby="request-heading">
      <h2 id="request-heading">Request an appointment</h2>
      <div className="request-content">
        <p role="status" aria-live="polite" aria-atomic="true" className="request-status">
          {saved
            ? "Request saved. This is not a confirmed appointment. This fictional deployment-test clinic does not provide care or follow-up."
            : pending ? "Saving…" : ""}
        </p>
        {!saved && (
          <>
            <p id="request-guidance" className="request-guidance">
              Deployment test only. Use a made-up name and phone number. Your preferred date is a request, not a confirmed appointment.
            </p>
            <form noValidate onSubmit={submit} aria-describedby="request-guidance" aria-busy={pending}>
              <p className="request-required">All fields are required.</p>
              {fields.map((field) => (
                <div className="request-field" key={field.key}>
                  <label htmlFor={`request-${field.key}`}>{field.label}</label>
                  <input
                    ref={(node) => { inputs.current[field.key] = node; }}
                    id={`request-${field.key}`}
                    name={field.key}
                    type={field.type}
                    autoComplete={field.autoComplete}
                    maxLength={"maxLength" in field ? field.maxLength : undefined}
                    min={field.key === "preferredDate" ? todayDate() : undefined}
                    required
                    readOnly={pending}
                    value={values[field.key]}
                    aria-invalid={Boolean(errors[field.key])}
                    aria-describedby={errors[field.key] ? `request-${field.key}-error` : undefined}
                    onChange={(event) => {
                      setValues((previous) => ({ ...previous, [field.key]: event.target.value }));
                      setErrors((previous) => ({ ...previous, [field.key]: undefined }));
                      setFailed(false);
                    }}
                  />
                  {errors[field.key] && (
                    <p id={`request-${field.key}-error`} className="request-error">{errors[field.key]}</p>
                  )}
                </div>
              ))}
              <p role="alert" className="request-error request-failure">
                {failed ? "We couldn't save your request. Your entries are still here. Please try again." : ""}
              </p>
              <button className="request-submit" type="submit" disabled={pending}>
                {pending ? "Saving…" : "Save request"}
              </button>
            </form>
          </>
        )}
      </div>
    </section>
  );
}
