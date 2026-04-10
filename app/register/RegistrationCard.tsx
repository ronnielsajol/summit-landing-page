"use client";
import { useEffect } from "react";
import Link from "next/link";
import type { RegistrationResponse } from "./types";

export function RegistrationCard({ data }: { data: RegistrationResponse }) {
	const { is_new_registration, message, qr_code_url, event, qr_token } = data;

	useEffect(() => {
		const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? "";
		const url = `${apiUrl}/pre-register/${event.id}/qr/${qr_token}/download`;
		const a = document.createElement("a");
		a.href = url;
		a.download = `qr-${qr_token}.png`;
		a.click();
	}, [event.id, qr_token]);

	return (
		<div className='flex flex-col items-center gap-8'>
			{/* Status banner */}
			<div
				className='w-full max-w-md rounded-2xl px-6 py-4 text-center'
				style={{
					background: is_new_registration
						? "linear-gradient(135deg, rgba(34,197,94,0.15), rgba(16,185,129,0.1))"
						: "linear-gradient(135deg, rgba(59,130,246,0.15), rgba(99,102,241,0.1))",
					border: `1px solid ${is_new_registration ? "rgba(34,197,94,0.3)" : "rgba(59,130,246,0.3)"}`,
				}}>
				<p
					className='text-sm font-medium'
					style={{ color: is_new_registration ? "#16a34a" : "#2563eb", fontFamily: "var(--font-body)" }}>
					{message}
				</p>
			</div>

			{/* QR Code */}
			<div className='bg-white rounded-2xl p-4 shadow-2xl'>
				{/* eslint-disable-next-line @next/next/no-img-element */}
				<img src={qr_code_url} alt='QR Code' className='block w-56 h-56' />
			</div>

			{/* Actions */}
			<div className='flex flex-col sm:flex-row gap-3 w-full max-w-sm'>
				<Link
					href='/'
					className='flex-1 inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm transition-opacity hover:opacity-70'
					style={{ border: "1px solid var(--border)", color: "var(--slate)", fontFamily: "var(--font-body)" }}>
					Back to Home
				</Link>
			</div>
		</div>
	);
}
