"use client";
import { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { CalendarDays, Clock, MapPin, Users } from "lucide-react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function CTASection() {
	const sectionRef = useRef<HTMLElement>(null);
	const innerRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const ctx = gsap.context(() => {
			const mm = gsap.matchMedia();
			mm.add("(prefers-reduced-motion: no-preference)", () => {
				gsap.from(innerRef.current?.children ?? [], {
					opacity: 0,
					y: 40,
					stagger: 0.1,
					duration: 0.8,
					ease: "power3.out",
					scrollTrigger: {
						trigger: sectionRef.current,
						start: "top 72%",
					},
				});
			});
		}, sectionRef);
		return () => ctx.revert();
	}, []);

	return (
		<section
			ref={sectionRef}
			id='cta'
			className='py-28 md:py-40 relative overflow-hidden'
			style={{
				background: "linear-gradient(160deg, var(--royal-blue-deep) 0%, var(--royal-blue) 60%, #1d538a 100%)",
			}}>
			{/* Background decorations */}
			<div className='absolute inset-0 pointer-events-none overflow-hidden'>
				<svg
					className='absolute top-0 left-0 opacity-[0.04]'
					width='500'
					height='500'
					viewBox='0 0 500 500'
					fill='none'
					aria-hidden='true'>
					<circle cx='100' cy='100' r='200' stroke='white' strokeWidth='1' />
					<circle cx='100' cy='100' r='300' stroke='white' strokeWidth='0.5' />
					<circle cx='100' cy='100' r='400' stroke='white' strokeWidth='0.3' />
				</svg>
				<svg
					className='absolute bottom-0 right-0 opacity-[0.05]'
					width='500'
					height='500'
					viewBox='0 0 500 500'
					fill='none'
					aria-hidden='true'>
					<circle cx='400' cy='400' r='200' stroke='#C9A84C' strokeWidth='1' />
					<circle cx='400' cy='400' r='300' stroke='#C9A84C' strokeWidth='0.5' />
				</svg>
			</div>

			<div className='max-w-3xl mx-auto px-6 relative'>
				<div ref={innerRef} className='flex flex-col items-center text-center'>
					{/* Small tag */}
					<div className='flex items-center gap-3 mb-8'>
						<div className='h-px w-8' style={{ background: "var(--gold)", opacity: 0.6 }} />
						<span
							className='text-xs tracking-[0.3em] uppercase'
							style={{ color: "var(--gold-light)", fontFamily: "var(--font-body)" }}>
							Invitation
						</span>
						<div className='h-px w-8' style={{ background: "var(--gold)", opacity: 0.6 }} />
					</div>

					{/* Heading */}
					<h2
						className='mb-4'
						style={{
							fontFamily: "var(--font-display)",
							fontSize: "clamp(2.8rem, 7vw, 5rem)",
							fontWeight: 600,
							lineHeight: 1,
							color: "white",
							letterSpacing: "-0.02em",
						}}>
						Be Part of the
						<br />
						<em style={{ color: "var(--gold-light)", fontWeight: 400, fontStyle: "italic" }}>Summit</em>
					</h2>

					{/* Gold ornament */}
					<div className='flex items-center gap-4 my-6'>
						<div className='h-px w-14' style={{ background: "linear-gradient(to right, transparent, var(--gold))" }} />
						<div className='w-1.5 h-1.5 rounded-full' style={{ background: "var(--gold)" }} />
						<div className='h-px w-14' style={{ background: "linear-gradient(to left, transparent, var(--gold))" }} />
					</div>

					{/* Body */}
					<p
						className='mb-10 max-w-lg'
						style={{
							fontFamily: "var(--font-body)",
							fontSize: "1.0625rem",
							color: "rgba(255,255,255,0.65)",
							lineHeight: 1.8,
						}}>
						This is your invitation to be part of a historic gathering of pastors and ministry leaders from across Cebu. Join us on
						April 17, 2026 — for fellowship, inspiration, and the unity of God&apos;s people.
					</p>

					{/* Event chips */}
					<div className='flex flex-wrap justify-center gap-3 mb-10'>
						{[
							{ icon: <CalendarDays className='text-white/70' size={12} />, label: "April 17, 2026" },
							{ icon: <Clock className='text-white/70' size={12} />, label: "10:00 AM" },
							{ icon: <MapPin className='text-white/70' size={12} />, label: "Lapu-Lapu City, Cebu" },
							{ icon: <Users className='text-white/70' size={12} />, label: "1,000+ Leaders" },
						].map((chip) => (
							<div
								key={chip.label}
								className='flex items-center gap-1.5 text-xs px-4 py-2 rounded-full'
								style={{
									background: "rgba(255,255,255,0.08)",
									border: "1px solid rgba(255,255,255,0.15)",
									color: "rgba(255,255,255,0.7)",
									fontFamily: "var(--font-body)",
								}}>
								{chip.icon}
								{chip.label}
							</div>
						))}
					</div>

					{/* CTAs */}
					<div className='flex flex-wrap justify-center gap-4'>
						<Link
							href='/register'
							className='group relative inline-flex items-center gap-2.5 rounded-full px-9 py-4 text-sm font-medium overflow-hidden transition-transform duration-200 hover:scale-[1.02] active:scale-[0.98]'
							style={{
								background: "var(--gold)",
								color: "var(--royal-blue-deep)",
								fontFamily: "var(--font-body)",
								fontWeight: 700,
								letterSpacing: "0.03em",
								boxShadow: "0 8px 32px rgba(201,168,76,0.4)",
							}}>
							<span>Pre-Registration</span>
							<svg width='16' height='16' viewBox='0 0 16 16' fill='none' aria-hidden='true'>
								<path d='M3 8h10M8 3l5 5-5 5' stroke='currentColor' strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round' />
							</svg>
							<span className='absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300 bg-white rounded-full' />
						</Link>

						<a
							href='#contact'
							onClick={(e) => {
								e.preventDefault();
								document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
							}}
							className='inline-flex items-center gap-2 rounded-full px-9 py-4 text-sm transition-all duration-300 hover:opacity-70'
							style={{
								border: "1px solid rgba(255,255,255,0.3)",
								color: "white",
								fontFamily: "var(--font-body)",
								fontWeight: 400,
							}}>
							Contact Organizer
						</a>
					</div>

					{/* Closing note */}
					<p
						className='mt-12 text-xs'
						style={{
							color: "rgba(255,255,255,0.3)",
							fontFamily: "var(--font-body)",
							letterSpacing: "0.05em",
						}}>
						See you in Cebu &mdash; April 17, 2026
					</p>
				</div>
			</div>
		</section>
	);
}
