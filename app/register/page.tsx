"use client";
import { useState } from "react";
import Link from "next/link";
import type { RegistrationResponse } from "./types";
import { RegistrationCard } from "./RegistrationCard";
import { RegisterForm } from "./RegisterForm";

export default function RegisterPage() {
	const [result, setResult] = useState<RegistrationResponse | null>(null);

	return (
		<main className='min-h-screen py-16 px-4' style={{ background: "var(--ivory)" }}>
			<div className='max-w-xl mx-auto mb-8'>
				<Link
					href='/'
					className='inline-flex items-center gap-2 text-sm transition-opacity hover:opacity-70'
					style={{ color: "var(--slate)", fontFamily: "var(--font-body)" }}>
					<svg width='16' height='16' viewBox='0 0 16 16' fill='none' aria-hidden='true'>
						<path d='M13 8H3M8 13l-5-5 5-5' stroke='currentColor' strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round' />
					</svg>
					Back to Summit
				</Link>
			</div>

			<div className='max-w-xl mx-auto'>
				{result ? <RegistrationCard data={result} /> : <RegisterForm onSuccess={setResult} />}
			</div>
		</main>
	);
}
