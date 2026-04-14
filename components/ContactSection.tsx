"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ContactSection() {
	const sectionRef = useRef<HTMLElement>(null);
	const contentRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const ctx = gsap.context(() => {
			const mm = gsap.matchMedia();
			mm.add("(prefers-reduced-motion: no-preference)", () => {
				gsap.from(contentRef.current?.children ?? [], {
					opacity: 0,
					y: 30,
					stagger: 0.1,
					duration: 0.7,
					ease: "power3.out",
					scrollTrigger: {
						trigger: sectionRef.current,
						start: "top 78%",
					},
				});
			});
		}, sectionRef);
		return () => ctx.revert();
	}, []);

	return (
		<section ref={sectionRef} id='contact' className='py-28 md:py-32' style={{ background: "var(--off-white)" }}>
			<div className='max-w-5xl mx-auto px-6'>
				<div ref={contentRef} className='grid md:grid-cols-2 gap-12 lg:gap-16'>
					{/* Left: heading block */}
					<div>
						<div className='flex items-center gap-4 mb-6'>
							<div className='h-px w-10' style={{ background: "var(--gold)" }} />
							<span
								className='text-xs tracking-[0.3em] uppercase'
								style={{ color: "var(--gold-warm)", fontFamily: "var(--font-body)" }}>
								Coordination
							</span>
						</div>

						<h2
							className='mb-5'
							style={{
								fontFamily: "var(--font-display)",
								fontSize: "clamp(2.2rem, 4.5vw, 3.2rem)",
								fontWeight: 600,
								lineHeight: 1.1,
								color: "var(--royal-blue-deep)",
								letterSpacing: "-0.02em",
							}}>
							Get in Touch
						</h2>

						<p
							className='mb-8'
							style={{
								fontFamily: "var(--font-body)",
								fontSize: "1rem",
								color: "var(--slate)",
								lineHeight: 1.8,
							}}>
							For inquiries, registration details, or coordination regarding the Pastors&apos; Summit 2026, please reach out to the
							organizing team of the Cebu Pastoral and Ministerial Association.
						</p>

						{/* Organizer card */}
						<div
							className='rounded-xl p-6 mb-6'
							style={{
								background: "white",
								border: "1px solid var(--border)",
								boxShadow: "0 2px 16px rgba(27,58,107,0.06)",
							}}>
							<div
								className='text-xs tracking-[0.2em] uppercase mb-3'
								style={{ color: "var(--gold-warm)", fontFamily: "var(--font-body)" }}>
								Summit Host
							</div>
							<h3
								className='mb-1'
								style={{
									fontFamily: "var(--font-display)",
									fontSize: "1.2rem",
									fontWeight: 600,
									color: "var(--royal-blue-deep)",
								}}>
								Bishop Noel Centino
							</h3>
							<p className='text-sm mb-4' style={{ color: "var(--muted)", fontFamily: "var(--font-body)" }}>
								Cebu Pastoral &amp; Ministerial Association
							</p>
							<div className='h-px' style={{ background: "var(--border)" }} />
							<p className='text-xs mt-4' style={{ color: "var(--muted)", fontFamily: "var(--font-body)", lineHeight: 1.6 }}>
								For official event inquiries and coordination details, contact the CPMA office or reach out through your designated
								ministry representatives.
							</p>
						</div>
					</div>

					{/* Right: info blocks */}
					<div className='space-y-5'>
						{/* Association info */}
						<div
							className='rounded-xl p-6'
							style={{
								background: "white",
								border: "1px solid var(--border)",
							}}>
							<div className='flex items-start gap-4'>
								<div
									className='w-10 h-10 rounded-full shrink-0 flex items-center justify-center'
									style={{ background: "var(--royal-blue-mist)", color: "var(--royal-blue)" }}>
									<svg width='18' height='18' viewBox='0 0 18 18' fill='none' aria-hidden='true'>
										<circle cx='9' cy='7' r='3' stroke='currentColor' strokeWidth='1.4' />
										<path d='M3 17c0-3.31 2.69-6 6-6s6 2.69 6 6' stroke='currentColor' strokeWidth='1.4' strokeLinecap='round' />
									</svg>
								</div>
								<div>
									<div
										className='text-xs tracking-[0.15em] uppercase mb-1'
										style={{ color: "var(--muted)", fontFamily: "var(--font-body)" }}>
										Organization
									</div>
									<p className='text-sm font-medium' style={{ color: "var(--charcoal)", fontFamily: "var(--font-body)" }}>
										Cebu Pastoral &amp; Ministerial Association (CPMA)
									</p>
								</div>
							</div>
						</div>

						<div
							className='rounded-xl p-6'
							style={{
								background: "white",
								border: "1px solid var(--border)",
							}}>
							<div className='flex items-start gap-4'>
								<div
									className='w-10 h-10 rounded-full shrink-0 flex items-center justify-center'
									style={{ background: "var(--royal-blue-mist)", color: "var(--royal-blue)" }}>
									<svg width='18' height='18' viewBox='0 0 18 18' fill='none' aria-hidden='true'>
										<rect x='2' y='4' width='14' height='10' rx='2' stroke='currentColor' strokeWidth='1.4' />
										<path d='M2 7l7 4 7-4' stroke='currentColor' strokeWidth='1.4' strokeLinecap='round' />
									</svg>
								</div>
								<div>
									<div
										className='text-xs tracking-[0.15em] uppercase mb-1'
										style={{ color: "var(--muted)", fontFamily: "var(--font-body)" }}>
										Inquiries
									</div>
									<p className='text-sm' style={{ color: "var(--slate)", fontFamily: "var(--font-body)" }}>
										Reach out through your ministry&apos;s designated CPMA representative or coordinate through the official CPMA channels.
									</p>
								</div>
							</div>
						</div>

						<div
							className='rounded-xl p-6'
							style={{
								background: "white",
								border: "1px solid var(--border)",
							}}>
							<div className='flex items-start gap-4'>
								<div
									className='w-10 h-10 rounded-full shrink-0 flex items-center justify-center'
									style={{ background: "var(--royal-blue-mist)", color: "var(--royal-blue)" }}>
									<svg width='18' height='18' viewBox='0 0 18 18' fill='none' aria-hidden='true'>
										<path d='M9 1C5.13 1 2 4.13 2 8c0 5.25 7 9 7 9s7-3.75 7-9c0-3.87-3.13-7-7-7z' stroke='currentColor' strokeWidth='1.4' />
										<circle cx='9' cy='8' r='2.5' stroke='currentColor' strokeWidth='1.4' />
									</svg>
								</div>
								<div>
									<div
										className='text-xs tracking-[0.15em] uppercase mb-1'
										style={{ color: "var(--muted)", fontFamily: "var(--font-body)" }}>
										Location
									</div>
									<p className='text-sm font-medium' style={{ color: "var(--charcoal)", fontFamily: "var(--font-body)" }}>
										Nissi Academy International
									</p>
									<p className='text-xs mt-0.5' style={{ color: "var(--muted)", fontFamily: "var(--font-body)" }}>
										Christ Faith Fellowship, Lapu-Lapu City, Cebu
									</p>
								</div>
							</div>
						</div>

						{/* Quick summary */}
						<div
							className='rounded-xl p-6'
							style={{
								background: "linear-gradient(135deg, var(--royal-blue-deep) 0%, var(--royal-blue) 100%)",
								border: "1px solid rgba(201,168,76,0.3)",
							}}>
							<p
								className='text-sm italic mb-2'
								style={{
									color: "rgba(255,255,255,0.8)",
									fontFamily: "var(--font-display)",
									fontSize: "1rem",
									lineHeight: 1.6,
								}}>
								&ldquo;A gathering that goes beyond a meeting &mdash; a moment of grace, unity, and purpose for the Church in
								Cebu.&rdquo;
							</p>
							<p className='text-xs' style={{ color: "var(--gold-light)", fontFamily: "var(--font-body)", letterSpacing: "0.1em" }}>
								— CPMA, PASTORS&apos; SUMMIT 2026
							</p>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
