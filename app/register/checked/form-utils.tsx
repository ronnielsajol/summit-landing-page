import type { CSSProperties } from "react";

// ─── Validator types ──────────────────────────────────────────────────────────

export type FieldValidator<T = string> = (props: { value: T }) => string | undefined;

// ─── Validators ───────────────────────────────────────────────────────────────

export const required =
	(label: string): FieldValidator =>
	({ value }) =>
		value.trim().length === 0 ? `${label} is required` : undefined;

export const maxLen =
	(max: number): FieldValidator =>
	({ value }) =>
		value.length > max ? `Must be ${max} characters or fewer` : undefined;

export const emailFormat: FieldValidator = ({ value }) => {
	const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	return !re.test(value) ? "Enter a valid email address" : undefined;
};

export const chain =
	(...fns: FieldValidator[]): FieldValidator =>
	(props) => {
		for (const fn of fns) {
			const err = fn(props);
			if (err) return err;
		}
		return undefined;
	};

export const imageFile: FieldValidator<File | null> = ({ value }) => {
	if (!value) return undefined;
	if (!value.type.startsWith("image/")) return "File must be an image (JPEG, PNG, etc.)";
	if (value.size > 5 * 1024 * 1024) return "Image must be 5 MB or less";
	return undefined;
};

// ─── Shared UI helpers ────────────────────────────────────────────────────────

export function FieldError({ errors }: { errors: unknown[] }) {
	const messages = errors.filter(Boolean) as string[];
	if (!messages.length) return null;
	return (
		<p className='mt-1 text-xs' style={{ color: "#ef4444", fontFamily: "var(--font-body)" }}>
			{messages[0]}
		</p>
	);
}

export const inputStyle: CSSProperties = {
	width: "100%",
	padding: "0.75rem 1rem",
	borderRadius: "0.75rem",
	border: "1px solid var(--border)",
	background: "white",
	fontFamily: "var(--font-body)",
	fontSize: "0.9375rem",
	color: "var(--charcoal)",
	outline: "none",
	transition: "border-color 0.2s",
};
