"use client";
import { useState } from "react";
import { useForm } from "@tanstack/react-form";
import type { RegistrationResponse } from "./types";
import { FieldError, inputStyle, required, maxLen, emailFormat, chain, imageFile } from "./form-utils";
import { downloadIdCard } from "./RegistrationCard";

interface Props {
	onSuccess: (data: RegistrationResponse) => void;
}

export function RegisterForm({ onSuccess }: Props) {
	const [serverError, setServerError] = useState<string | null>(null);

	const form = useForm({
		defaultValues: {
			first_name: "",
			last_name: "",
			email: "",
			contact_number: "",
			gender: "" as "male" | "female" | "other" | "",
			religion: "",
			address: "",
			profile_image: null as File | null,
		},
		onSubmit: async ({ value }) => {
			setServerError(null);
			try {
				const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? "";
				const body = new FormData();
				body.append("first_name", value.first_name);
				body.append("last_name", value.last_name);
				body.append("email", value.email);
				body.append("contact_number", value.contact_number);
				body.append("gender", value.gender);
				if (value.religion) body.append("religion", value.religion);
				body.append("address", value.address);
				if (value.profile_image) body.append("profile_image", value.profile_image);
				const res = await fetch(`${apiUrl}/pre-register/7`, {
					method: "POST",
					headers: { Accept: "application/json" },
					body,
				});
				const data = await res.json();
				if (!res.ok) {
					setServerError(data?.message ?? "Something went wrong. Please try again.");
					return;
				}
				const registration = data as RegistrationResponse;
				onSuccess(registration);
				downloadIdCard(registration);
			} catch {
				setServerError("Network error. Please check your connection and try again.");
			}
		},
	});

	return (
		<>
			{/* Heading */}
			<div className='mb-10 text-center'>
				<div className='flex items-center justify-center gap-3 mb-4'>
					<div className='h-px w-8' style={{ background: "var(--gold)", opacity: 0.6 }} />
					<span className='text-xs tracking-[0.3em] uppercase' style={{ color: "var(--gold)", fontFamily: "var(--font-body)" }}>
						Pastors&apos; Summit 2026
					</span>
					<div className='h-px w-8' style={{ background: "var(--gold)", opacity: 0.6 }} />
				</div>
				<h1
					className='mb-3'
					style={{
						fontFamily: "var(--font-display)",
						fontSize: "clamp(2rem, 6vw, 3.25rem)",
						fontWeight: 600,
						color: "var(--royal-blue-deep)",
						letterSpacing: "-0.02em",
						lineHeight: 1.1,
					}}>
					Pre-Registration
				</h1>
				<p
					className='max-w-sm mx-auto'
					style={{ fontFamily: "var(--font-body)", fontSize: "0.9375rem", color: "var(--slate)", lineHeight: 1.75 }}>
					Reserve your place at the Summit. Fill in your details below and you&apos;ll receive a QR code for event check-in.
				</p>
			</div>

			{/* Form card */}
			<div className='rounded-2xl p-8 shadow-sm' style={{ background: "white", border: "1px solid var(--border)" }}>
				{serverError && (
					<div
						className='mb-6 rounded-xl px-4 py-3 text-sm'
						style={{
							background: "rgba(239,68,68,0.08)",
							border: "1px solid rgba(239,68,68,0.25)",
							color: "#dc2626",
							fontFamily: "var(--font-body)",
						}}>
						{serverError}
					</div>
				)}

				<form
					onSubmit={(e) => {
						e.preventDefault();
						e.stopPropagation();
						form.handleSubmit();
					}}
					noValidate>
					{/* Name row */}
					<div className='grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4'>
						<form.Field
							name='first_name'
							validators={{
								onBlur: chain(required("First name"), maxLen(255)),
								onSubmit: chain(required("First name"), maxLen(255)),
							}}>
							{(field) => (
								<div>
									<label
										htmlFor={field.name}
										className='block text-sm font-medium mb-1.5'
										style={{ color: "var(--charcoal)", fontFamily: "var(--font-body)" }}>
										First Name <span style={{ color: "#ef4444" }}>*</span>
									</label>
									<input
										id={field.name}
										name={field.name}
										type='text'
										autoComplete='given-name'
										value={field.state.value}
										onBlur={field.handleBlur}
										onChange={(e) => field.handleChange(e.target.value)}
										maxLength={255}
										style={inputStyle}
									/>
									<FieldError errors={field.state.meta.errors} />
								</div>
							)}
						</form.Field>

						<form.Field
							name='last_name'
							validators={{
								onBlur: chain(required("Last name"), maxLen(255)),
								onSubmit: chain(required("Last name"), maxLen(255)),
							}}>
							{(field) => (
								<div>
									<label
										htmlFor={field.name}
										className='block text-sm font-medium mb-1.5'
										style={{ color: "var(--charcoal)", fontFamily: "var(--font-body)" }}>
										Last Name <span style={{ color: "#ef4444" }}>*</span>
									</label>
									<input
										id={field.name}
										name={field.name}
										type='text'
										autoComplete='family-name'
										value={field.state.value}
										onBlur={field.handleBlur}
										onChange={(e) => field.handleChange(e.target.value)}
										maxLength={255}
										style={inputStyle}
									/>
									<FieldError errors={field.state.meta.errors} />
								</div>
							)}
						</form.Field>
					</div>

					{/* Email */}
					<div className='mb-4'>
						<form.Field
							name='email'
							validators={{
								onBlur: chain(required("Email"), emailFormat, maxLen(255)),
								onSubmit: chain(required("Email"), emailFormat, maxLen(255)),
							}}>
							{(field) => (
								<div>
									<label
										htmlFor={field.name}
										className='block text-sm font-medium mb-1.5'
										style={{ color: "var(--charcoal)", fontFamily: "var(--font-body)" }}>
										Email Address <span style={{ color: "#ef4444" }}>*</span>
									</label>
									<input
										id={field.name}
										name={field.name}
										type='email'
										autoComplete='email'
										value={field.state.value}
										onBlur={field.handleBlur}
										onChange={(e) => field.handleChange(e.target.value)}
										maxLength={255}
										style={inputStyle}
									/>
									<FieldError errors={field.state.meta.errors} />
								</div>
							)}
						</form.Field>
					</div>

					{/* Contact number */}
					<div className='mb-4'>
						<form.Field
							name='contact_number'
							validators={{
								onBlur: chain(required("Contact number"), maxLen(50)),
								onSubmit: chain(required("Contact number"), maxLen(50)),
							}}>
							{(field) => (
								<div>
									<label
										htmlFor={field.name}
										className='block text-sm font-medium mb-1.5'
										style={{ color: "var(--charcoal)", fontFamily: "var(--font-body)" }}>
										Contact Number <span style={{ color: "#ef4444" }}>*</span>
									</label>
									<input
										id={field.name}
										name={field.name}
										type='tel'
										autoComplete='tel'
										value={field.state.value}
										onBlur={field.handleBlur}
										onChange={(e) => field.handleChange(e.target.value)}
										maxLength={50}
										style={inputStyle}
									/>
									<FieldError errors={field.state.meta.errors} />
								</div>
							)}
						</form.Field>
					</div>

					{/* Gender + Religion */}
					<div className='grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4'>
						<form.Field
							name='gender'
							validators={{
								onBlur: ({ value }: { value: string }) => (!value ? "Gender is required" : undefined),
								onSubmit: ({ value }: { value: string }) => (!value ? "Gender is required" : undefined),
							}}>
							{(field) => (
								<div>
									<label
										htmlFor={field.name}
										className='block text-sm font-medium mb-1.5'
										style={{ color: "var(--charcoal)", fontFamily: "var(--font-body)" }}>
										Gender <span style={{ color: "#ef4444" }}>*</span>
									</label>
									<select
										id={field.name}
										name={field.name}
										value={field.state.value}
										onBlur={field.handleBlur}
										onChange={(e) => field.handleChange(e.target.value as "male" | "female" | "other" | "")}
										style={{ ...inputStyle, appearance: "none", cursor: "pointer" }}>
										<option value='' disabled>
											Select gender
										</option>
										<option value='male'>Male</option>
										<option value='female'>Female</option>
										<option value='other'>Other</option>
									</select>
									<FieldError errors={field.state.meta.errors} />
								</div>
							)}
						</form.Field>

						<form.Field name='religion' validators={{ onChange: maxLen(100) }}>
							{(field) => (
								<div>
									<label
										htmlFor={field.name}
										className='block text-sm font-medium mb-1.5'
										style={{ color: "var(--charcoal)", fontFamily: "var(--font-body)" }}>
										Religion
									</label>
									<input
										id={field.name}
										name={field.name}
										type='text'
										value={field.state.value}
										onBlur={field.handleBlur}
										onChange={(e) => field.handleChange(e.target.value)}
										maxLength={100}
										style={inputStyle}
									/>
									<FieldError errors={field.state.meta.errors} />
								</div>
							)}
						</form.Field>
					</div>

					{/* Profile Image */}
					<div className='mb-4'>
						<form.Field name='profile_image' validators={{ onChange: imageFile, onSubmit: imageFile }}>
							{(field) => (
								<div>
									<label
										htmlFor={field.name}
										className='block text-sm font-medium mb-1.5'
										style={{ color: "var(--charcoal)", fontFamily: "var(--font-body)" }}>
										Profile Image
									</label>
									<label
										htmlFor={field.name}
										className='flex flex-col items-center justify-center gap-2 w-full cursor-pointer rounded-xl transition-colors'
										style={{ minHeight: "9rem", border: "2px dashed var(--border)", background: "var(--ivory)", padding: "1.25rem" }}>
										{field.state.value ? (
											<>
												{/* eslint-disable-next-line @next/next/no-img-element */}
												<img
													src={URL.createObjectURL(field.state.value)}
													alt='Preview'
													className='rounded-full object-cover'
													style={{ width: 80, height: 80 }}
												/>
												<p className='text-xs' style={{ color: "var(--slate)", fontFamily: "var(--font-body)" }}>
													{field.state.value.name}
												</p>
												<p className='text-xs' style={{ color: "var(--muted)", fontFamily: "var(--font-body)" }}>
													Click to change
												</p>
											</>
										) : (
											<>
												<svg width='28' height='28' viewBox='0 0 24 24' fill='none' aria-hidden='true' style={{ color: "var(--muted)" }}>
													<path
														d='M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M17 8l-5-5-5 5M12 3v12'
														stroke='currentColor'
														strokeWidth='1.5'
														strokeLinecap='round'
														strokeLinejoin='round'
													/>
												</svg>
												<p className='text-sm' style={{ color: "var(--slate)", fontFamily: "var(--font-body)" }}>
													Click to upload a photo
												</p>
												<p className='text-xs' style={{ color: "var(--muted)", fontFamily: "var(--font-body)" }}>
													JPEG, PNG, GIF, WebP &mdash; max 5 MB
												</p>
											</>
										)}
									</label>
									<input
										id={field.name}
										name={field.name}
										type='file'
										accept='image/*'
										className='sr-only'
										onBlur={field.handleBlur}
										onChange={(e) => field.handleChange(e.target.files?.[0] ?? null)}
									/>
									<FieldError errors={field.state.meta.errors} />
								</div>
							)}
						</form.Field>
					</div>

					{/* Address */}
					<div className='mb-8'>
						<form.Field
							name='address'
							validators={{
								onBlur: chain(required("Address"), maxLen(500)),
								onSubmit: chain(required("Address"), maxLen(500)),
							}}>
							{(field) => (
								<div>
									<label
										htmlFor={field.name}
										className='block text-sm font-medium mb-1.5'
										style={{ color: "var(--charcoal)", fontFamily: "var(--font-body)" }}>
										Address <span style={{ color: "#ef4444" }}>*</span>
									</label>
									<textarea
										id={field.name}
										name={field.name}
										rows={3}
										value={field.state.value}
										onBlur={field.handleBlur}
										onChange={(e) => field.handleChange(e.target.value)}
										maxLength={500}
										style={{ ...inputStyle, resize: "vertical" }}
									/>
									<FieldError errors={field.state.meta.errors} />
								</div>
							)}
						</form.Field>
					</div>

					{/* Submit */}
					<form.Subscribe selector={(state) => ({ canSubmit: state.canSubmit, isSubmitting: state.isSubmitting })}>
						{({ canSubmit, isSubmitting }) => (
							<button
								type='submit'
								disabled={!canSubmit}
								className='w-full inline-flex items-center justify-center gap-2.5 rounded-full px-9 py-4 text-sm font-bold transition-all duration-200 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100'
								style={{
									background: "var(--gold)",
									color: "var(--royal-blue-deep)",
									fontFamily: "var(--font-body)",
									fontWeight: 700,
									letterSpacing: "0.03em",
									boxShadow: "0 8px 24px rgba(201,168,76,0.35)",
								}}>
								{isSubmitting ? (
									<>
										<svg className='animate-spin' width='16' height='16' viewBox='0 0 24 24' fill='none' aria-hidden='true'>
											<circle className='opacity-25' cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='4' />
											<path className='opacity-75' fill='currentColor' d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z' />
										</svg>
										Submitting…
									</>
								) : (
									<>
										<span>Complete Pre-Registration</span>
										<svg width='16' height='16' viewBox='0 0 16 16' fill='none' aria-hidden='true'>
											<path d='M3 8h10M8 3l5 5-5 5' stroke='currentColor' strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round' />
										</svg>
									</>
								)}
							</button>
						)}
					</form.Subscribe>

					<p className='mt-4 text-xs text-center' style={{ color: "var(--muted)", fontFamily: "var(--font-body)" }}>
						By submitting, you confirm your intention to attend Pastors&apos; Summit 2026.
					</p>
				</form>
			</div>
		</>
	);
}
