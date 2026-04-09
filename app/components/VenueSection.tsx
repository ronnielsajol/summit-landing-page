"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Building2, Church, MapPin, CalendarDays } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function VenueSection() {
	const sectionRef = useRef<HTMLElement>(null);
	const leftRef = useRef<HTMLDivElement>(null);
	const rightRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const ctx = gsap.context(() => {
			const mm = gsap.matchMedia();
			mm.add("(prefers-reduced-motion: no-preference)", () => {
				gsap.from(leftRef.current?.children ?? [], {
					opacity: 0,
					y: 35,
					stagger: 0.1,
					duration: 0.75,
					ease: "power3.out",
					scrollTrigger: {
						trigger: sectionRef.current,
						start: "top 75%",
					},
				});

				gsap.from(rightRef.current, {
					opacity: 0,
					x: 40,
					duration: 0.9,
					ease: "power3.out",
					scrollTrigger: {
						trigger: rightRef.current,
						start: "top 78%",
					},
				});
			});
		}, sectionRef);
		return () => ctx.revert();
	}, []);

	return (
		<section ref={sectionRef} id='venue' className='py-28 md:py-36' style={{ background: "var(--cream)" }}>
			<div className='max-w-5xl mx-auto px-6'>
				<div className='grid md:grid-cols-2 gap-12 lg:gap-16 items-start'>
					{/* Left: text */}
					<div ref={leftRef}>
						<div className='flex items-center gap-4 mb-6'>
							<div className='h-px w-10' style={{ background: "var(--gold)" }} />
							<span
								className='text-xs tracking-[0.3em] uppercase'
								style={{ color: "var(--gold-warm)", fontFamily: "var(--font-body)" }}>
								Venue
							</span>
						</div>

						<h2
							className='mb-4'
							style={{
								fontFamily: "var(--font-display)",
								fontSize: "clamp(2.2rem, 4.5vw, 3.4rem)",
								fontWeight: 600,
								lineHeight: 1.1,
								color: "var(--royal-blue-deep)",
								letterSpacing: "-0.02em",
							}}>
							Nissi Academy
							<br />
							<em style={{ fontStyle: "italic", fontWeight: 400, color: "var(--royal-blue)" }}>International</em>
						</h2>

						<p
							className='mb-8'
							style={{
								fontFamily: "var(--font-body)",
								fontSize: "1.0625rem",
								color: "var(--slate)",
								lineHeight: 1.8,
							}}>
							The summit will be held at Nissi Academy International, the home of Christ Faith Fellowship — a vibrant and spacious
							venue befitting a gathering of this significance in Lapu-Lapu City, Cebu.
						</p>

						<div className='space-y-4 mb-8'>
							{[
								{
									label: "Venue Name",
									value: "Nissi Academy International",
									icon: <Building2 size={18} />,
								},
								{
									label: "Church",
									value: "Christ Faith Fellowship",
									icon: <Church size={18} />,
								},
								{
									label: "City",
									value: "Lapu-Lapu City, Cebu, Philippines",
									icon: <MapPin size={18} />,
								},
								{
									label: "Date",
									value: "Friday, April 17, 2026",
									icon: <CalendarDays size={18} />,
								},
							].map((item) => (
								<div
									key={item.label}
									className='flex items-start gap-3 rounded-xl p-4'
									style={{
										background: "white",
										border: "1px solid var(--border)",
									}}>
									<span className='flex shrink-0 mt-0.5' style={{ color: "var(--royal-blue)" }}>
										{item.icon}
									</span>
									<div>
										<div
											className='text-xs tracking-[0.15em] uppercase mb-0.5'
											style={{ color: "var(--muted)", fontFamily: "var(--font-body)" }}>
											{item.label}
										</div>
										<div className='text-sm font-medium' style={{ color: "var(--charcoal)", fontFamily: "var(--font-body)" }}>
											{item.value}
										</div>
									</div>
								</div>
							))}
						</div>

						<a
							href='https://maps.google.com/?q=Nissi+Academy+International+Lapu-Lapu+City+Cebu'
							target='_blank'
							rel='noopener noreferrer'
							className='inline-flex items-center gap-2.5 text-sm px-6 py-3 rounded-full transition-all duration-300 hover:opacity-80 hover:gap-3'
							style={{
								background: "var(--royal-blue)",
								color: "white",
								fontFamily: "var(--font-body)",
								fontWeight: 500,
							}}>
							<svg width='16' height='16' viewBox='0 0 16 16' fill='none' aria-hidden='true'>
								<path
									d='M8 1C5.24 1 3 3.24 3 6c0 3.75 5 9 5 9s5-5.25 5-9c0-2.76-2.24-5-5-5zm0 6.75a1.75 1.75 0 110-3.5 1.75 1.75 0 010 3.5z'
									fill='currentColor'
								/>
							</svg>
							Open in Maps
						</a>
					</div>

					{/* Right: map embed placeholder + visual */}
					<div ref={rightRef} className='space-y-5'>
						{/* Map placeholder */}
						<div
							className='relative rounded-2xl overflow-hidden'
							style={{
								aspectRatio: "4/3",
								background: "linear-gradient(135deg, var(--royal-blue-mist), var(--cream))",
								border: "1px solid var(--border)",
							}}>
							{/* Subtle grid map-like pattern */}
							<div
								className='absolute inset-0 opacity-[0.08]'
								style={{
									backgroundImage:
										"linear-gradient(var(--royal-blue) 1px, transparent 1px), linear-gradient(90deg, var(--royal-blue) 1px, transparent 1px)",
									backgroundSize: "32px 32px",
								}}
							/>

							{/* Center pin */}
							<div className='absolute inset-0 flex flex-col items-center justify-center'>
								<div
									className='w-14 h-14 rounded-full flex items-center justify-center mb-3 shadow-lg'
									style={{
										background: "var(--royal-blue)",
										boxShadow: "0 0 0 8px rgba(27,58,107,0.15)",
									}}>
									<svg width='26' height='26' viewBox='0 0 26 26' fill='none' aria-hidden='true'>
										<path
											d='M13 2C9.13 2 6 5.13 6 9c0 5.25 7 14 7 14s7-8.75 7-14c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 110-5 2.5 2.5 0 010 5z'
											fill='white'
										/>
									</svg>
								</div>
								<p
									className='text-center px-4'
									style={{
										fontFamily: "var(--font-display)",
										fontSize: "1.1rem",
										fontWeight: 600,
										color: "var(--royal-blue-deep)",
									}}>
									Nissi Academy International
								</p>
								<p className='text-xs mt-1' style={{ color: "var(--muted)", fontFamily: "var(--font-body)" }}>
									Lapu-Lapu City, Cebu
								</p>
							</div>

							{/* "View on Map" overlay */}
							<a
								href='https://maps.google.com/?q=Nissi+Academy+International+Lapu-Lapu+City+Cebu'
								target='_blank'
								rel='noopener noreferrer'
								className='absolute bottom-4 right-4 text-xs px-4 py-2 rounded-full transition-all duration-200 hover:opacity-80'
								style={{
									background: "white",
									color: "var(--royal-blue)",
									fontFamily: "var(--font-body)",
									fontWeight: 600,
									boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
									border: "1px solid var(--border)",
								}}>
								View on Google Maps →
							</a>
						</div>

						{/* Info card */}
						<div
							className='rounded-xl p-5'
							style={{
								background: "white",
								border: "1px solid var(--border)",
							}}>
							<div className='flex items-start gap-3'>
								<div
									className='w-9 h-9 rounded-lg shrink-0 flex items-center justify-center'
									style={{ background: "var(--royal-blue-mist)", color: "var(--royal-blue)" }}>
									<svg width='18' height='18' viewBox='0 0 18 18' fill='none' aria-hidden='true'>
										<circle cx='9' cy='9' r='7' stroke='currentColor' strokeWidth='1.5' />
										<path d='M9 6v4l2.5 2.5' stroke='currentColor' strokeWidth='1.5' strokeLinecap='round' />
									</svg>
								</div>
								<div>
									<p className='text-sm font-medium mb-1' style={{ color: "var(--charcoal)", fontFamily: "var(--font-body)" }}>
										Registration starts at 9:00 AM
									</p>
									<p className='text-xs leading-relaxed' style={{ color: "var(--muted)", fontFamily: "var(--font-body)" }}>
										Delegates are encouraged to arrive early for registration and to prepare for the opening program at 10:00 AM.
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
