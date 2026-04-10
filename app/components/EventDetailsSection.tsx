"use client";
import { Sparkles } from "lucide-react";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function EventDetailsSection() {
	const sectionRef = useRef<HTMLElement>(null);
	const headingGroupRef = useRef<HTMLDivElement>(null);
	const cardsRef = useRef<HTMLDivElement>(null);
	const featuredRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const ctx = gsap.context(() => {
			const mm = gsap.matchMedia();
			mm.add("(prefers-reduced-motion: no-preference)", () => {
				gsap.from(headingGroupRef.current?.children ?? [], {
					opacity: 0,
					y: 30,
					stagger: 0.1,
					duration: 0.7,
					ease: "power3.out",
					scrollTrigger: {
						trigger: headingGroupRef.current,
						start: "top 80%",
					},
				});

				const cardEls = cardsRef.current ? (Array.from(cardsRef.current.children) as HTMLElement[]) : [];
				cardEls.forEach((el) => {
					el.style.transition = "none";
				});
				gsap.fromTo(
					cardEls,
					{ opacity: 0, y: 35 },
					{
						opacity: 1,
						y: 0,
						stagger: 0.1,
						duration: 0.75,
						ease: "power3.out",
						clearProps: "y,opacity",
						onComplete: () => {
							cardEls.forEach((el) => {
								el.style.transition = "";
							});
						},
						scrollTrigger: {
							trigger: cardsRef.current,
							start: "top 78%",
						},
					}
				);

				gsap.from(featuredRef.current, {
					opacity: 0,
					y: 35,
					duration: 0.8,
					ease: "power3.out",
					scrollTrigger: {
						trigger: featuredRef.current,
						start: "top 80%",
					},
				});
			});
		}, sectionRef);
		return () => ctx.revert();
	}, []);

	const details = [
		{
			label: "Date",
			value: "April 17, 2026",
			sub: "Friday",
			icon: (
				<svg width='20' height='20' viewBox='0 0 20 20' fill='none' aria-hidden='true'>
					<rect x='2' y='4' width='16' height='14' rx='2' stroke='currentColor' strokeWidth='1.5' />
					<path d='M2 8h16' stroke='currentColor' strokeWidth='1.5' />
					<path d='M6 2v2M14 2v2' stroke='currentColor' strokeWidth='1.5' strokeLinecap='round' />
				</svg>
			),
		},
		{
			label: "Time",
			value: "10:00 AM – 2:00 PM",
			sub: "4 hours of program",
			icon: (
				<svg width='20' height='20' viewBox='0 0 20 20' fill='none' aria-hidden='true'>
					<circle cx='10' cy='10' r='8' stroke='currentColor' strokeWidth='1.5' />
					<path d='M10 6v4l3 3' stroke='currentColor' strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round' />
				</svg>
			),
		},
		{
			label: "Venue",
			value: "Nissi Academy International",
			sub: "Christ Faith Fellowship, Lapu-Lapu City",
			icon: (
				<svg width='20' height='20' viewBox='0 0 20 20' fill='none' aria-hidden='true'>
					<path
						d='M10 2C6.69 2 4 4.69 4 8c0 4.5 6 10 6 10s6-5.5 6-10c0-3.31-2.69-6-6-6z'
						stroke='currentColor'
						strokeWidth='1.5'
					/>
					<circle cx='10' cy='8' r='2' stroke='currentColor' strokeWidth='1.5' />
				</svg>
			),
		},
		{
			label: "City",
			value: "Lapu-Lapu City, Cebu",
			sub: "Philippines",
			icon: (
				<svg width='20' height='20' viewBox='0 0 20 20' fill='none' aria-hidden='true'>
					<circle cx='10' cy='10' r='8' stroke='currentColor' strokeWidth='1.5' />
					<path d='M2 10h16M10 2c-2 3-3 5-3 8s1 5 3 8M10 2c2 3 3 5 3 8s-1 5-3 8' stroke='currentColor' strokeWidth='1.2' />
				</svg>
			),
		},
		{
			label: "Attendees",
			value: "1,000+",
			sub: "Estimated participants",
			icon: (
				<svg width='20' height='20' viewBox='0 0 20 20' fill='none' aria-hidden='true'>
					<circle cx='7' cy='7' r='3' stroke='currentColor' strokeWidth='1.5' />
					<circle cx='14' cy='7' r='2.5' stroke='currentColor' strokeWidth='1.5' />
					<path d='M1 17c0-3 2.69-5 6-5h2c3.31 0 6 2 6 5' stroke='currentColor' strokeWidth='1.5' strokeLinecap='round' />
					<path d='M14 12c2 0 4 1.5 4 4' stroke='currentColor' strokeWidth='1.5' strokeLinecap='round' />
				</svg>
			),
		},
		{
			label: "Audience",
			value: "CPMA Members",
			sub: "Pastors & ministry leaders",
			icon: (
				<svg width='20' height='20' viewBox='0 0 20 20' fill='none' aria-hidden='true'>
					<path
						d='M10 2l1.5 4.5H16l-3.75 2.73 1.42 4.4L10 11.27 6.33 13.63l1.42-4.4L4 6.5h4.5L10 2z'
						stroke='currentColor'
						strokeWidth='1.4'
						strokeLinejoin='round'
					/>
				</svg>
			),
		},
	];

	return (
		<section ref={sectionRef} id='details' className='py-28 md:py-36' style={{ background: "var(--royal-blue-deep)" }}>
			{/* Background texture */}
			<div
				className='absolute pointer-events-none'
				style={{
					inset: 0,
					background:
						"radial-gradient(ellipse 60% 70% at 80% 30%, rgba(201,168,76,0.08) 0%, transparent 60%), radial-gradient(ellipse 50% 60% at 10% 80%, rgba(255,255,255,0.03) 0%, transparent 55%)",
					position: "absolute",
				}}
			/>

			<div className='max-w-5xl mx-auto px-6 relative'>
				{/* Heading */}
				<div ref={headingGroupRef} className='mb-14'>
					<div className='flex items-center gap-4 mb-6'>
						<div className='h-px w-10' style={{ background: "var(--gold)" }} />
						<span
							className='text-xs tracking-[0.3em] uppercase'
							style={{ color: "var(--gold-light)", fontFamily: "var(--font-body)" }}>
							Event Details
						</span>
					</div>
					<h2
						style={{
							fontFamily: "var(--font-display)",
							fontSize: "clamp(2.4rem, 5vw, 3.6rem)",
							fontWeight: 600,
							lineHeight: 1.1,
							color: "white",
							letterSpacing: "-0.02em",
						}}>
						Everything You Need
						<br />
						<em style={{ color: "var(--gold-light)", fontWeight: 400, fontStyle: "italic" }}>to Know</em>
					</h2>
				</div>

				{/* Detail cards grid */}
				<div ref={cardsRef} className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-12'>
					{details.map((d) => (
						<div
							key={d.label}
							className='group rounded-xl p-6 transition-all duration-300 hover:-translate-y-1'
							style={{
								background: "rgba(255,255,255,0.05)",
								border: "1px solid rgba(255,255,255,0.1)",
								backdropFilter: "blur(8px)",
							}}>
							<div
								className='w-9 h-9 rounded-lg flex items-center justify-center mb-4'
								style={{ background: "rgba(201,168,76,0.15)", color: "var(--gold-light)" }}>
								{d.icon}
							</div>
							<div
								className='text-xs tracking-[0.2em] uppercase mb-1'
								style={{ color: "rgba(255,255,255,0.4)", fontFamily: "var(--font-body)" }}>
								{d.label}
							</div>
							<div
								className='text-lg font-medium mb-1'
								style={{
									color: "white",
									fontFamily: "var(--font-display)",
									lineHeight: 1.3,
								}}>
								{d.value}
							</div>
							<div className='text-xs' style={{ color: "rgba(255,255,255,0.45)", fontFamily: "var(--font-body)" }}>
								{d.sub}
							</div>
						</div>
					))}
				</div>

				{/* Featured highlight: Guest of Honor */}
				<div
					ref={featuredRef}
					className='rounded-2xl overflow-hidden'
					style={{
						background: "linear-gradient(135deg, var(--gold-warm) 0%, var(--gold) 50%, var(--gold-light) 100%)",
						padding: "2px",
					}}>
					<div
						className='rounded-[14px] p-8 md:p-10 flex flex-col md:flex-row items-start md:items-center gap-6'
						style={{ background: "var(--royal-blue-deep)" }}>
						<div
							className='w-14 h-14 rounded-full shrink-0 flex items-center justify-center'
							style={{ background: "rgba(201,168,76,0.15)", color: "var(--gold-light)" }}>
							<Sparkles size={24} />
						</div>
						<div className='flex-1'>
							<div
								className='text-xs tracking-[0.25em] uppercase mb-2'
								style={{ color: "var(--gold-light)", fontFamily: "var(--font-body)" }}>
								Guest of Honor &amp; Speaker
							</div>
							<h3
								className='mb-1'
								style={{
									fontFamily: "var(--font-display)",
									fontSize: "clamp(1.5rem, 3vw, 2rem)",
									fontWeight: 600,
									color: "white",
									letterSpacing: "-0.01em",
								}}>
								ASC
							</h3>
							<p className='text-sm' style={{ color: "rgba(255,255,255,0.55)", fontFamily: "var(--font-body)", lineHeight: 1.6 }}>
								Joining the pastors and ministry leaders of CPMA as the honored guest and keynote speaker — a special presence at this
								historic gathering.
							</p>
						</div>
						<a
							href='#speaker'
							onClick={(e) => {
								e.preventDefault();
								document.querySelector("#speaker")?.scrollIntoView({ behavior: "smooth" });
							}}
							className='shrink-0 text-sm px-5 py-2.5 rounded-full transition-all duration-300 hover:opacity-80'
							style={{
								background: "var(--gold)",
								color: "var(--royal-blue-deep)",
								fontFamily: "var(--font-body)",
								fontWeight: 600,
							}}>
							View Profile →
						</a>
					</div>
				</div>
			</div>
		</section>
	);
}
