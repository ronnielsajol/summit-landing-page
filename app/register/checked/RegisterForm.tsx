"use client";
import { useState, useEffect, useCallback } from "react";
import { useForm } from "@tanstack/react-form";
import type { RegistrationResponse } from "./types";
import { FieldError, inputStyle, required, maxLen, emailFormat, chain, imageFile } from "./form-utils";
import { Combobox } from "./Combobox";

interface PsgcItem {
	code: string;
	name: string;
}

const PSGC = "https://psgc.gitlab.io/api";

const selectStyle: React.CSSProperties = { ...inputStyle, appearance: "none", cursor: "pointer" };

interface Props {
	onSuccess: (data: RegistrationResponse) => void;
}

export function RegisterForm({ onSuccess }: Props) {
	const [serverError, setServerError] = useState<string | null>(null);

	// --- PSGC cascading select state ---
	const [regions, setRegions] = useState<PsgcItem[]>([]);
	const [provinces, setProvinces] = useState<PsgcItem[]>([]);
	const [municipalities, setMunicipalities] = useState<PsgcItem[]>([]);
	const [cities, setCities] = useState<PsgcItem[]>([]);
	const [barangays, setBarangays] = useState<PsgcItem[]>([]);
	const [selectedRegionCode, setSelectedRegionCode] = useState("");
	const [selectedProvinceCode, setSelectedProvinceCode] = useState("");
	const [selectedMunicipalityCode, setSelectedMunicipalityCode] = useState("");
	const [selectedCityCode, setSelectedCityCode] = useState("");
	const [selectedLocalityValue, setSelectedLocalityValue] = useState("");
	const [selectedBarangayCode, setSelectedBarangayCode] = useState("");
	const [loadingRegions, setLoadingRegions] = useState(true);
	const [loadingProvinces, setLoadingProvinces] = useState(false);
	const [loadingLocalities, setLoadingLocalities] = useState(false);
	const [loadingBarangays, setLoadingBarangays] = useState(false);

	// --- Ministries ---
	const [ministries, setMinistries] = useState<string[]>([]);

	useEffect(() => {
		fetch(`${PSGC}/regions/`)
			.then((r) => r.json())
			.then((data: PsgcItem[]) => setRegions(data.sort((a, b) => a.name.localeCompare(b.name))))
			.catch(() => {})
			.finally(() => setLoadingRegions(false));
	}, []);

	useEffect(() => {
		fetch("/ministries.json")
			.then((r) => r.json())
			.then((data: string[]) => setMinistries(data.sort((a, b) => a.localeCompare(b))))
			.catch(() => {});
	}, []);

	const loadLocalities = useCallback((code: string, source: "region" | "province") => {
		setLoadingLocalities(true);
		setMunicipalities([]);
		setCities([]);
		const base = source === "province" ? `${PSGC}/provinces/${code}` : `${PSGC}/regions/${code}`;
		Promise.all([fetch(`${base}/municipalities/`).then((r) => r.json()), fetch(`${base}/cities/`).then((r) => r.json())])
			.then(([muns, cits]: [PsgcItem[], PsgcItem[]]) => {
				setMunicipalities(muns.sort((a, b) => a.name.localeCompare(b.name)));
				setCities(cits.sort((a, b) => a.name.localeCompare(b.name)));
			})
			.catch(() => {})
			.finally(() => setLoadingLocalities(false));
	}, []);

	const loadProvinces = useCallback(
		(regionCode: string) => {
			setLoadingProvinces(true);
			setProvinces([]);
			setMunicipalities([]);
			setCities([]);
			fetch(`${PSGC}/regions/${regionCode}/provinces/`)
				.then((r) => r.json())
				.then((data: PsgcItem[]) => {
					const sorted = data.sort((a, b) => a.name.localeCompare(b.name));
					setProvinces(sorted);
					// Region with no provinces (e.g. NCR) — load localities directly
					if (sorted.length === 0) loadLocalities(regionCode, "region");
				})
				.catch(() => {})
				.finally(() => setLoadingProvinces(false));
		},
		[loadLocalities]
	);

	const loadBarangays = useCallback((code: string, type: "cities" | "municipalities") => {
		setLoadingBarangays(true);
		setBarangays([]);
		fetch(`${PSGC}/${type}/${code}/barangays/`)
			.then((r) => r.json())
			.then((data: PsgcItem[]) => setBarangays(data.sort((a, b) => a.name.localeCompare(b.name))))
			.catch(() => {})
			.finally(() => setLoadingBarangays(false));
	}, []);

	const form = useForm({
		defaultValues: {
			first_name: "",
			last_name: "",
			email: "",
			contact_number: "",
			gender: "" as "male" | "female" | "",
			religion: "",
			street_address: "",
			barangay: "",
			city: "",
			municipality: "",
			province: "",
			region: "",
			profile_image: null as File | null,
			additional_details: {
				ministry: "",
				name_of_church: "",
				position_in_church: "",
				estimated_members: "",
			},
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
				if (value.street_address) body.append("street_address", value.street_address);
				if (value.barangay) body.append("barangay", value.barangay);
				if (value.city) body.append("city", value.city);
				if (value.municipality) body.append("municipality", value.municipality);
				if (value.province) body.append("province", value.province);
				if (value.region) body.append("region", value.region);
				if (value.profile_image) body.append("profile_image", value.profile_image);
				body.append("additional_details", JSON.stringify([value.additional_details]));
				const res = await fetch(`${apiUrl}/register/${process.env.NEXT_PUBLIC_EVENT_ID}/check-in`, {
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
					Registration
				</h1>
				<p
					className='max-w-sm mx-auto'
					style={{ fontFamily: "var(--font-body)", fontSize: "0.9375rem", color: "var(--slate)", lineHeight: 1.75 }}>
					Fill in your details below and you&apos;ll be registered for the Summit.
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
										onChange={(e) => field.handleChange(e.target.value as "male" | "female" | "")}
										style={{ ...inputStyle, appearance: "none", cursor: "pointer" }}>
										<option value='' disabled>
											Select gender
										</option>
										<option value='male'>Male</option>
										<option value='female'>Female</option>
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
						<p className='block text-sm font-medium mb-3' style={{ color: "var(--charcoal)", fontFamily: "var(--font-body)" }}>
							Address
						</p>

						{/* Street Address */}
						<div className='mb-3'>
							<form.Field
								name='street_address'
								validators={{
									onBlur: maxLen(255),
									onSubmit: maxLen(255),
								}}>
								{(field) => (
									<div>
										<label
											htmlFor={field.name}
											className='block text-xs font-medium mb-1'
											style={{ color: "var(--slate)", fontFamily: "var(--font-body)" }}>
											Street Address
										</label>
										<input
											id={field.name}
											name={field.name}
											type='text'
											placeholder='House no., street name'
											autoComplete='street-address'
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

						{/* Region */}
						<div className='mb-3'>
							<form.Field name='region'>
								{(field) => (
									<div>
										<label
											htmlFor={field.name}
											className='block text-xs font-medium mb-1'
											style={{ color: "var(--slate)", fontFamily: "var(--font-body)" }}>
											Region
										</label>
										<select
											id={field.name}
											name={field.name}
											value={selectedRegionCode}
											disabled={loadingRegions}
											onBlur={field.handleBlur}
											onChange={(e) => {
												const item = regions.find((r) => r.code === e.target.value);
												field.handleChange(item?.name ?? "");
												setSelectedRegionCode(e.target.value);
												setSelectedProvinceCode("");
												setSelectedMunicipalityCode("");
												setSelectedCityCode("");
												setSelectedLocalityValue("");
												setSelectedBarangayCode("");
												form.setFieldValue("province", "");
												form.setFieldValue("municipality", "");
												form.setFieldValue("city", "");
												form.setFieldValue("barangay", "");
												if (e.target.value) loadProvinces(e.target.value);
											}}
											style={selectStyle}>
											<option value='' disabled>
												{loadingRegions ? "Loading regions…" : "Select region"}
											</option>
											{regions.map((r) => (
												<option key={r.code} value={r.code}>
													{r.name}
												</option>
											))}
										</select>
										<FieldError errors={field.state.meta.errors} />
									</div>
								)}
							</form.Field>
						</div>
						{/* Province */}
						<div className='mb-3'>
							<form.Field name='province'>
								{(field) => (
									<div>
										<label
											htmlFor={field.name}
											className='block text-xs font-medium mb-1'
											style={{ color: "var(--slate)", fontFamily: "var(--font-body)" }}>
											Province
										</label>
										<select
											id={field.name}
											name={field.name}
											value={selectedProvinceCode}
											disabled={!selectedRegionCode || loadingProvinces || provinces.length === 0}
											onBlur={field.handleBlur}
											onChange={(e) => {
												const item = provinces.find((p) => p.code === e.target.value);
												field.handleChange(item?.name ?? "");
												setSelectedProvinceCode(e.target.value);
												setSelectedLocalityValue("");
												setSelectedMunicipalityCode("");
												setSelectedCityCode("");
												setSelectedBarangayCode("");
												form.setFieldValue("municipality", "");
												form.setFieldValue("city", "");
												form.setFieldValue("barangay", "");
												setBarangays([]);
												if (e.target.value) loadLocalities(e.target.value, "province");
											}}
											style={selectStyle}>
											<option value=''>
												{!selectedRegionCode
													? "Select region first"
													: loadingProvinces
														? "Loading…"
														: provinces.length === 0
															? "No provinces in this region"
															: "Select province"}
											</option>
											{provinces.map((p) => (
												<option key={p.code} value={p.code}>
													{p.name}
												</option>
											))}
										</select>
										<FieldError errors={field.state.meta.errors} />
									</div>
								)}
							</form.Field>
						</div>
						{/* Municipality / City (combined) */}
						<div className='mb-3'>
							<form.Field name='city'>
								{(field) => (
									<div>
										<label
											htmlFor='locality-select'
											className='block text-xs font-medium mb-1'
											style={{ color: "var(--slate)", fontFamily: "var(--font-body)" }}>
											Municipality / City
										</label>
										<select
											id='locality-select'
											value={selectedLocalityValue}
											disabled={
												!selectedRegionCode || loadingProvinces || loadingLocalities || (provinces.length > 0 && !selectedProvinceCode)
											}
											onBlur={field.handleBlur}
											onChange={(e) => {
												const val = e.target.value;
												setSelectedLocalityValue(val);
												setSelectedBarangayCode("");
												form.setFieldValue("barangay", "");
												setBarangays([]);
												if (!val) {
													field.handleChange("");
													form.setFieldValue("municipality", "");
													setSelectedCityCode("");
													setSelectedMunicipalityCode("");
													return;
												}
												const [type, code] = val.split(":");
												if (type === "city") {
													const item = cities.find((c) => c.code === code);
													field.handleChange(item?.name ?? "");
													form.setFieldValue("municipality", "");
													setSelectedCityCode(code);
													setSelectedMunicipalityCode("");
													loadBarangays(code, "cities");
												} else {
													const item = municipalities.find((m) => m.code === code);
													form.setFieldValue("municipality", item?.name ?? "");
													field.handleChange("");
													setSelectedMunicipalityCode(code);
													setSelectedCityCode("");
													loadBarangays(code, "municipalities");
												}
											}}
											style={selectStyle}>
											<option value=''>
												{!selectedRegionCode ? "Select region first" : loadingLocalities ? "Loading…" : "Select municipality or city"}
											</option>
											{cities.length > 0 && (
												<optgroup label='Cities'>
													{cities.map((c) => (
														<option key={c.code} value={`city:${c.code}`}>
															{c.name}
														</option>
													))}
												</optgroup>
											)}
											{municipalities.length > 0 && (
												<optgroup label='Municipalities'>
													{municipalities.map((m) => (
														<option key={m.code} value={`mun:${m.code}`}>
															{m.name}
														</option>
													))}
												</optgroup>
											)}
										</select>
										<FieldError errors={field.state.meta.errors} />
									</div>
								)}
							</form.Field>
						</div>

						{/* Barangay */}
						<div>
							<form.Field name='barangay'>
								{(field) => (
									<div>
										<label
											htmlFor='barangay-combobox'
											className='block text-xs font-medium mb-1'
											style={{ color: "var(--slate)", fontFamily: "var(--font-body)" }}>
											Barangay
										</label>
										<Combobox
											id='barangay-combobox'
											options={barangays.map((b) => ({ value: b.code, label: b.name }))}
											value={selectedBarangayCode}
											onChange={(code) => {
												const item = barangays.find((b) => b.code === code);
												field.handleChange(item?.name ?? "");
												setSelectedBarangayCode(code);
											}}
											onBlur={field.handleBlur}
											disabled={(!selectedMunicipalityCode && !selectedCityCode) || loadingBarangays}
											placeholder={
												!selectedMunicipalityCode && !selectedCityCode
													? "Select municipality or city first"
													: loadingBarangays
														? "Loading barangays…"
														: "Search barangay…"
											}
										/>
										<FieldError errors={field.state.meta.errors} />
									</div>
								)}
							</form.Field>
						</div>
					</div>
					{/* Additional Details */}
					<div className='mb-8'>
						<p className='block text-sm font-medium mb-3' style={{ color: "var(--charcoal)", fontFamily: "var(--font-body)" }}>
							Church Details
						</p>

						{/* Ministry */}
						<div className='mb-3'>
							<form.Field name='additional_details.ministry'>
								{(field) => (
									<div>
										<label
											htmlFor={field.name}
											className='block text-xs font-medium mb-1'
											style={{ color: "var(--slate)", fontFamily: "var(--font-body)" }}>
											Ministry
										</label>
										<select
											id={field.name}
											name={field.name}
											value={field.state.value}
											onBlur={field.handleBlur}
											onChange={(e) => field.handleChange(e.target.value)}
											style={selectStyle}>
											<option value=''>Select ministry</option>
											{ministries.map((m) => (
												<option key={m} value={m}>
													{m}
												</option>
											))}
										</select>
										<FieldError errors={field.state.meta.errors} />
									</div>
								)}
							</form.Field>
						</div>

						{/* Name of Church */}
						<div className='mb-3'>
							<form.Field name='additional_details.name_of_church' validators={{ onChange: maxLen(255) }}>
								{(field) => (
									<div>
										<label
											htmlFor={field.name}
											className='block text-xs font-medium mb-1'
											style={{ color: "var(--slate)", fontFamily: "var(--font-body)" }}>
											Name of Church
										</label>
										<input
											id={field.name}
											name={field.name}
											type='text'
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

						{/* Position in Church */}
						<div className='mb-3'>
							<form.Field name='additional_details.position_in_church' validators={{ onChange: maxLen(255) }}>
								{(field) => (
									<div>
										<label
											htmlFor={field.name}
											className='block text-xs font-medium mb-1'
											style={{ color: "var(--slate)", fontFamily: "var(--font-body)" }}>
											Position in Church
										</label>
										<input
											id={field.name}
											name={field.name}
											type='text'
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

						{/* Estimated Number of Members */}
						<div>
							<form.Field name='additional_details.estimated_members' validators={{ onChange: maxLen(500) }}>
								{(field) => (
									<div>
										<label
											htmlFor={field.name}
											className='block text-xs font-medium mb-1'
											style={{ color: "var(--slate)", fontFamily: "var(--font-body)" }}>
											Estimate Number of Members
										</label>
										<input
											id={field.name}
											name={field.name}
											type='number'
											min='0'
											value={field.state.value}
											onBlur={field.handleBlur}
											onChange={(e) => field.handleChange(e.target.value)}
											style={inputStyle}
										/>
										<FieldError errors={field.state.meta.errors} />
									</div>
								)}
							</form.Field>
						</div>
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
										<span>Complete Registration</span>
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
