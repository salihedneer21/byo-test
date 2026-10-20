export type AppointmentRequestInput = {
  name: string;
  phoneNumber: string;
  email?: string;
  preferredDate: string;
};

export type RequestErrors = Partial<Record<keyof AppointmentRequestInput, string>>;

// Use the same calendar-day boundary in browser and server (UTC), independent
// of the server's host timezone. Dates are preferences, never availability.
export function todayDate(now = new Date()): string {
  return now.toISOString().slice(0, 10);
}

export function validateAppointmentRequest(
  input: AppointmentRequestInput,
  today = todayDate(),
): RequestErrors {
  const errors: RequestErrors = {};
  const name = input.name.trim();
  if (!name || !/\p{L}/u.test(name) || name.length > 100 || /[\p{Cc}\p{Cf}]/u.test(name)) {
    errors.name = "Enter a name of up to 100 characters.";
  }

  const phone = input.phoneNumber.trim();
  const digits = phone.replace(/\D/g, "");
  if (!/^\+?[\d\s().-]+$/.test(phone) || phone.length > 40 || digits.length < 7 || digits.length > 15 || /[\p{Cc}]/u.test(phone)) {
    errors.phoneNumber = "Enter a phone number with 7 to 15 digits. Spaces, +, parentheses, dots and hyphens are allowed.";
  }

  const email = input.email?.trim();
  if (email && (email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || /[\p{Cc}\p{Cf}]/u.test(email))) {
    errors.email = "Enter a valid email address of up to 254 characters, or leave it blank.";
  }

  const date = input.preferredDate;
  const parsed = new Date(`${date}T00:00:00.000Z`);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date) || !Number.isFinite(parsed.getTime()) || parsed.toISOString().slice(0, 10) !== date) {
    errors.preferredDate = "Choose a valid preferred date.";
  } else if (date < today) {
    errors.preferredDate = "Choose today or a later date.";
  }
  return errors;
}
