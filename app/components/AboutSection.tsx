"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function AboutSection() {
	const sectionRef = useRef<HTMLElement>(null);
	const tagRef = useRef<HTMLDivElement>(null);
	const headingRef = useRef<HTMLHeadingElement>(null);
	const bodyRef = useRef<HTMLDivElement>(null);
	const pillarsRef = useRef<HTMLDivElement>(null);
	const verseRef = useRef<HTMLQuoteElement>(null);

	useEffect(() => {
		const ctx = gsap.context(() => {
			const mm = gsap.matchMedia();
			mm.add("(prefers-reduced-motion: no-preference)", () => {
				// Heading + body: tied to section entrance
				const tl = gsap.timeline({
					scrollTrigger: {
						trigger: sectionRef.current,
						start: "top 95%",
						toggleActions: "play none none none",
					},
					defaults: { ease: "power3.out" },
				});

				tl
					.from(tagRef.current, { opacity: 0, y: 20, duration: 0.6 })
					.from(headingRef.current, { opacity: 0, y: 40, duration: 0.8 }, "-=0.3")
					.from(
						bodyRef.current?.children ?? [],
						{
							opacity: 0,
							y: 25,
							stagger: 0.1,
							duration: 0.7,
						},
						"-=0.5"
					);

				// Pillars: each card animates independently when they enter the viewport
				const pillarsChildren = pillarsRef.current ? (Array.from(pillarsRef.current.children) as HTMLElement[]) : [];
				// Suppress CSS transition-transform so GSAP can drive opacity + y simultaneously
				pillarsChildren.forEach((el) => {
					el.style.transition = "none";
				});
				gsap.fromTo(
					pillarsChildren,
					{ opacity: 0, y: 30 },
					{
						opacity: 1,
						y: 0,
						stagger: 0.12,
						duration: 0.8,
						ease: "power3.out",
						clearProps: "y,opacity",
						onComplete: () => {
							pillarsChildren.forEach((el) => {
								el.style.transition = "";
							});
						},
						scrollTrigger: {
							trigger: pillarsRef.current,
							start: "top 85%",
						},
					}
				);

				// Scripture verse
				gsap.from(verseRef.current, {
					opacity: 0,
					y: 20,
					duration: 0.7,
					ease: "power3.out",
					scrollTrigger: {
						trigger: verseRef.current,
						start: "top 92%",
					},
				});
			});
		}, sectionRef);
		return () => ctx.revert();
	}, []);

	const pillars = [
		{
			title: "Fellowship",
			description:
				"Creating space for pastors and ministers across Cebu to connect, share, and encourage one another in their calling.",
			icon: (
				<svg width='22' height='22' viewBox='0 0 22 22' fill='none' aria-hidden='true'>
					<path
						d='M11 2C6.58 2 3 5.58 3 10s3.58 8 8 8 8-3.58 8-8-3.58-8-8-8zm0 14a6 6 0 110-12 6 6 0 010 12z'
						stroke='currentColor'
						strokeWidth='1.4'
					/>
					<circle cx='11' cy='10' r='2.5' stroke='currentColor' strokeWidth='1.4' />
				</svg>
			),
		},
		{
			title: "Leadership",
			description:
				"Equipping church leaders with vision, clarity, and renewed strength to serve their congregations faithfully.",
			icon: (
				<svg width='22' height='22' viewBox='0 0 22 22' fill='none' aria-hidden='true'>
					<path
						d='M11 3l2.5 5 5.5.8-4 3.9.9 5.5L11 15.5 6.1 18.2l.9-5.5-4-3.9 5.5-.8z'
						stroke='currentColor'
						strokeWidth='1.4'
						strokeLinejoin='round'
					/>
				</svg>
			),
		},
		{
			title: "Unity",
			description:
				"Bringing together diverse ministries in a spirit of cooperation and shared purpose for the Kingdom of God.",
			icon: (
				<svg width='22' height='22' viewBox='0 0 22 22' fill='none' aria-hidden='true'>
					<circle cx='8' cy='9' r='3' stroke='currentColor' strokeWidth='1.4' />
					<circle cx='14' cy='9' r='3' stroke='currentColor' strokeWidth='1.4' />
					<path d='M3 19c0-3.31 2.24-6 5-6h6c2.76 0 5 2.69 5 6' stroke='currentColor' strokeWidth='1.4' strokeLinecap='round' />
				</svg>
			),
		},
		{
			title: "Purpose",
			description:
				"Aligning hearts and minds around God's call — to strengthen communities and advance the mission of the Church in Cebu.",
			icon: (
				<svg width='22' height='22' viewBox='0 0 22 22' fill='none' aria-hidden='true'>
					<circle cx='11' cy='11' r='8' stroke='currentColor' strokeWidth='1.4' />
					<circle cx='11' cy='11' r='3' stroke='currentColor' strokeWidth='1.4' />
					<line x1='11' y1='3' x2='11' y2='1' stroke='currentColor' strokeWidth='1.4' strokeLinecap='round' />
					<line x1='11' y1='21' x2='11' y2='19' stroke='currentColor' strokeWidth='1.4' strokeLinecap='round' />
					<line x1='3' y1='11' x2='1' y2='11' stroke='currentColor' strokeWidth='1.4' strokeLinecap='round' />
					<line x1='21' y1='11' x2='19' y2='11' stroke='currentColor' strokeWidth='1.4' strokeLinecap='round' />
				</svg>
			),
		},
	];

	return (
		<section ref={sectionRef} id='about' className='py-28 md:py-36' style={{ background: "var(--ivory)" }}>
			<div className='max-w-5xl mx-auto px-6'>
				{/* Top tag */}
				<div ref={tagRef} className='flex items-center gap-4 mb-8'>
					<div className='h-px w-10' style={{ background: "var(--gold)" }} />
					<span
						className='text-xs tracking-[0.3em] uppercase'
						style={{ color: "var(--gold-warm)", fontFamily: "var(--font-body)" }}>
						The Summit
					</span>
				</div>

				{/* Heading */}
				<h2
					ref={headingRef}
					className='mb-8 max-w-2xl'
					style={{
						fontFamily: "var(--font-display)",
						fontSize: "clamp(2.4rem, 5vw, 3.8rem)",
						fontWeight: 600,
						lineHeight: 1.1,
						color: "var(--royal-blue-deep)",
						letterSpacing: "-0.02em",
					}}>
					A Gathering That
					<br />
					<em style={{ fontStyle: "italic", color: "var(--royal-blue)", fontWeight: 400 }}>Goes Beyond the Meeting</em>
				</h2>

				{/* Body text */}
				<div ref={bodyRef} className='max-w-2xl mb-16 space-y-4'>
					<p
						style={{
							fontFamily: "var(--font-body)",
							fontSize: "1.0625rem",
							color: "var(--slate)",
							lineHeight: 1.8,
						}}>
						Pastors&apos; Summit 2026 is a meaningful convocation of church leaders across the Cebu Pastoral and Ministerial
						Association — a dedicated space for fellowship, inspiration, and shared vision among those who shepherd God&apos;s
						people.
					</p>
					<p
						style={{
							fontFamily: "var(--font-body)",
							fontSize: "1.0625rem",
							color: "var(--slate)",
							lineHeight: 1.8,
						}}>
						This is not simply a program to attend. It is an invitation to be renewed, reconnected, and realigned — together. With
						over 1,000 pastors and ministry leaders expected, this summit represents one of the most significant church gatherings
						in Cebu this year.
					</p>
				</div>

				{/* Four pillars */}
				<div ref={pillarsRef} className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-16'>
					{pillars.map((p) => (
						<div
							key={p.title}
							className='relative cursor-default transition-transform duration-300 hover:-translate-y-1'
							style={{
								filter: "drop-shadow(0 2px 16px rgba(27,58,107,0.07))",
							}}>
							{/* Card with inverted top-left notch */}
							<div
								className='summit-card h-full pt-14 px-5 pb-6'
								style={{
									borderRadius: 0,
									boxShadow: "none",
									clipPath: "path('M 39,0 L 9999,0 L 9999,9999 L 0,9999 L 0,39 A 32,32 0 0 0 39,0 Z')",
								}}>
								<h3
									className='mb-2'
									style={{
										fontFamily: "var(--font-display)",
										fontSize: "1.25rem",
										fontWeight: 600,
										color: "var(--royal-blue-deep)",
									}}>
									{p.title}
								</h3>
								<p className='text-sm leading-relaxed' style={{ color: "var(--muted)", fontFamily: "var(--font-body)" }}>
									{p.description}
								</p>
							</div>

							{/* Icon anchored in the notch void */}
							<div
								className='absolute -top-4 -left-4 w-12 h-12 flex items-center justify-center rounded-full'
								style={{
									backgroundColor: "var(--gold-warm)",
									color: "var(--gold-light)",
								}}>
								{p.icon}
							</div>
						</div>
					))}
				</div>

				{/* Scripture */}
				<blockquote
					ref={verseRef}
					className='border-l-2 pl-6 py-2 max-w-xl mx-auto text-center'
					style={{ borderColor: "var(--gold)" }}>
					<p
						className='italic mb-3'
						style={{
							fontFamily: "var(--font-display)",
							fontSize: "clamp(1.15rem, 2.5vw, 1.35rem)",
							color: "var(--slate)",
							lineHeight: 1.7,
						}}>
						&ldquo;How good and pleasant it is when God&apos;s people live together in unity!&rdquo;
					</p>
					<cite
						style={{
							fontFamily: "var(--font-body)",
							fontSize: "0.8rem",
							color: "var(--gold-warm)",
							letterSpacing: "0.1em",
							textTransform: "uppercase",
							fontStyle: "normal",
						}}>
						Psalm 133:1
					</cite>
				</blockquote>
			</div>
		</section>
	);
}
