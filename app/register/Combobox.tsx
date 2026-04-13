"use client";
import { useState, useRef, useEffect } from "react";
import { Command } from "cmdk";
import * as Popover from "@radix-ui/react-popover";
import { inputStyle } from "./form-utils";

export interface ComboboxOption {
	value: string;
	label: string;
}

interface ComboboxProps {
	id?: string;
	options: ComboboxOption[];
	value: string; // the selected value
	onChange: (value: string) => void;
	onBlur?: () => void;
	placeholder?: string;
	disabled?: boolean;
	emptyText?: string;
}

export function Combobox({ id, options, value, onChange, onBlur, placeholder = "Search…", disabled, emptyText = "No results found." }: ComboboxProps) {
	const [open, setOpen] = useState(false);
	const [search, setSearch] = useState("");
	const triggerRef = useRef<HTMLButtonElement>(null);
	const [width, setWidth] = useState<number | undefined>(undefined);

	// Keep trigger width in sync for the popover panel
	useEffect(() => {
		if (!triggerRef.current) return;
		const ro = new ResizeObserver(() => {
			setWidth(triggerRef.current?.offsetWidth);
		});
		ro.observe(triggerRef.current);
		return () => ro.disconnect();
	}, []);

	const selectedLabel = options.find((o) => o.value === value)?.label ?? "";

	return (
		<Popover.Root open={open} onOpenChange={(o) => { setOpen(o); if (!o) { setSearch(""); onBlur?.(); } }}>
			<Popover.Trigger asChild>
				<button
					ref={triggerRef}
					id={id}
					type="button"
					disabled={disabled}
					aria-expanded={open}
					style={{
						...inputStyle,
						textAlign: "left",
						display: "flex",
						alignItems: "center",
						justifyContent: "space-between",
						gap: "0.5rem",
						cursor: disabled ? "not-allowed" : "pointer",
						opacity: disabled ? 0.5 : 1,
					}}
				>
					<span style={{ color: selectedLabel ? "inherit" : "var(--muted, #94a3b8)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
						{selectedLabel || placeholder}
					</span>
					{/* Chevron icon */}
					<svg
						width="14"
						height="14"
						viewBox="0 0 24 24"
						fill="none"
						style={{ flexShrink: 0, color: "var(--slate, #64748b)", transform: open ? "rotate(180deg)" : undefined, transition: "transform 0.15s" }}
					>
						<path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
					</svg>
				</button>
			</Popover.Trigger>
			<Popover.Portal>
				<Popover.Content
					align="start"
					sideOffset={4}
					style={{
						width: width ?? "var(--radix-popover-trigger-width)",
						zIndex: 9999,
						background: "white",
						border: "1px solid var(--border, #e2e8f0)",
						borderRadius: "0.75rem",
						boxShadow: "0 8px 24px rgba(0,0,0,0.10)",
						overflow: "hidden",
						outline: "none",
					}}
					onOpenAutoFocus={(e) => e.preventDefault()}
				>
					<Command shouldFilter={true} label="Search">
						{/* Search input */}
						<div
							style={{
								display: "flex",
								alignItems: "center",
								padding: "0.5rem 0.75rem",
								borderBottom: "1px solid var(--border, #e2e8f0)",
								gap: "0.5rem",
							}}
						>
							<svg width="14" height="14" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0, color: "var(--muted, #94a3b8)" }}>
								<circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2" />
								<path d="M21 21l-4.35-4.35" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
							</svg>
							<Command.Input
								value={search}
								onValueChange={setSearch}
								placeholder={placeholder}
								style={{
									flex: 1,
									border: "none",
									outline: "none",
									fontSize: "0.875rem",
									fontFamily: "var(--font-body, inherit)",
									color: "var(--charcoal, #1e293b)",
									background: "transparent",
								}}
							/>
						</div>
						<Command.List style={{ maxHeight: "14rem", overflowY: "auto" }}>
							<Command.Empty style={{ padding: "0.75rem 1rem", fontSize: "0.875rem", color: "var(--muted, #94a3b8)", fontFamily: "var(--font-body, inherit)" }}>
								{emptyText}
							</Command.Empty>
							{options.map((opt) => (
								<Command.Item
									key={opt.value}
									value={opt.label}
									onSelect={() => {
										onChange(opt.value === value ? "" : opt.value);
										setOpen(false);
										setSearch("");
									}}
									style={{
										display: "flex",
										alignItems: "center",
										gap: "0.5rem",
										padding: "0.5rem 1rem",
										fontSize: "0.875rem",
										fontFamily: "var(--font-body, inherit)",
										color: "var(--charcoal, #1e293b)",
										cursor: "pointer",
										background: opt.value === value ? "var(--ivory, #f8f7f4)" : "transparent",
									}}
									data-selected={opt.value === value ? "true" : "false"}
								>
									{/* Checkmark for selected */}
									<svg
										width="14"
										height="14"
										viewBox="0 0 24 24"
										fill="none"
										style={{ flexShrink: 0, opacity: opt.value === value ? 1 : 0 }}
									>
										<path d="M20 6L9 17L4 12" stroke="var(--gold, #c9a84c)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
									</svg>
									{opt.label}
								</Command.Item>
							))}
						</Command.List>
					</Command>
				</Popover.Content>
			</Popover.Portal>
		</Popover.Root>
	);
}
