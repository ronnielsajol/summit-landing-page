"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { CalendarDays, Clock, MapPin } from "lucide-react";

import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface HeroSectionProps {
	loaded: boolean;
}

export default function HeroSection({ loaded }: HeroSectionProps) {
	const sectionRef = useRef<HTMLElement>(null);
	const contentRef = useRef<HTMLDivElement>(null);
	const bgRef = useRef<HTMLDivElement>(null);
	const taglineRef = useRef<HTMLDivElement>(null);
	const titleRef = useRef<HTMLHeadingElement>(null);
	const dividerRef = useRef<HTMLDivElement>(null);
	const subtitleRef = useRef<HTMLParagraphElement>(null);
	const metaRef = useRef<HTMLDivElement>(null);
	const ctaRef = useRef<HTMLDivElement>(null);
	const scrollHintRef = useRef<HTMLDivElement>(null);
	const tlRef = useRef<gsap.core.Timeline | null>(null);

	// Build the timeline on mount — paused so elements start at opacity:0
	// while the loader is still visible
	useEffect(() => {
		const ctx = gsap.context(() => {
			const mm = gsap.matchMedia();

			mm.add("(prefers-reduced-motion: no-preference)", () => {
				// Pre-hide so they never flash before their tween runs
				gsap.set(ctaRef.current, { autoAlpha: 0, y: 24 });

				const tl = gsap.timeline({ paused: true, defaults: { ease: "power3.out" } });
				tlRef.current = tl;

				tl
					.from(taglineRef.current, { opacity: 0, y: 20, duration: 0.7 })
					.from(titleRef.current, { opacity: 0, y: 50, duration: 1, ease: "power4.out" }, "-=0.3")
					.from(
						dividerRef.current,
						{ opacity: 0, scaleX: 0, transformOrigin: "center", duration: 0.8, ease: "power2.inOut" },
						"-=0.5"
					)
					.from(subtitleRef.current, { opacity: 0, y: 20, duration: 0.7 }, "-=0.4")
					.from(metaRef.current?.children ?? [], { opacity: 0, y: 20, stagger: 0.1, duration: 0.6 }, "-=0.4")
					.to(ctaRef.current, { autoAlpha: 1, y: 0, duration: 0.7, ease: "power2.out" }, "-=0.3")
					.from(scrollHintRef.current, { opacity: 0, duration: 0.8 }, "-=0.2");

				// Subtle background parallax
				mm.add("(min-width: 768px)", () => {
					gsap.to(contentRef.current, {
						yPercent: 5,
						ease: "none",
						scrollTrigger: {
							trigger: sectionRef.current,
							start: "top top",
							end: "bottom top",
							scrub: true,
						},
					});
				});

				// Scroll hint fade
				ScrollTrigger.create({
					trigger: sectionRef.current,
					start: "10% top",
					onEnter: () => gsap.to(scrollHintRef.current, { opacity: 0, y: -10, duration: 0.4 }),
					onLeaveBack: () => gsap.to(scrollHintRef.current, { opacity: 1, y: 0, duration: 0.4 }),
				});
			});
		}, sectionRef);

		return () => ctx.revert();
	}, []);

	// Reveal + play once loader is done
	useEffect(() => {
		if (!loaded) return;
		gsap.set(contentRef.current, { opacity: 1 });
		tlRef.current?.play();
	}, [loaded]);

	return (
		<section
			ref={sectionRef}
			id='hero'
			className='relative min-h-screen flex flex-col items-center justify-center overflow-hidden'>
			{/* Layered background */}
			<div
				ref={bgRef}
				className='absolute inset-x-0 -top-[15%] -bottom-[15%]'
				style={{
					background: "linear-gradient(160deg, var(--royal-blue-deep) 0%, var(--royal-blue) 50%, #1d4a7a 100%)",
				}}>
				{/* Mesh overlays */}
				<div
					className='absolute inset-0'
					style={{
						background:
							"radial-gradient(ellipse 70% 80% at 15% 25%, rgba(201,168,76,0.12) 0%, transparent 55%), radial-gradient(ellipse 60% 60% at 85% 75%, rgba(255,255,255,0.06) 0%, transparent 50%)",
					}}
				/>
				{/* Fine grain texture */}
				<div
					className='absolute inset-0 opacity-[0.025]'
					style={{
						backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
					}}
				/>
				{/* Bottom fade into page */}
				<div
					className='absolute bottom-0 left-0 right-0 h-40'
					style={{
						background: "linear-gradient(to bottom, transparent, rgba(15,36,71,0.4))",
					}}
				/>
			</div>

			{/* Decorative arc lines */}
			<div className='absolute inset-0 pointer-events-none overflow-hidden'>
				<svg
					className='absolute top-0 right-0 opacity-[0.4]'
					width='600'
					height='600'
					viewBox='0 0 600 600'
					fill='none'
					aria-hidden='true'>
					<circle cx='500' cy='100' r='250' stroke='#C9A84C' strokeWidth='1' />
					<circle cx='500' cy='100' r='350' stroke='#C9A84C' strokeWidth='0.5' />
					<circle cx='500' cy='100' r='450' stroke='#C9A84C' strokeWidth='0.3' />
				</svg>
				<svg
					className='absolute bottom-0 left-0 opacity-[0.1]'
					width='400'
					height='400'
					viewBox='0 0 400 400'
					fill='none'
					aria-hidden='true'>
					<circle cx='50' cy='350' r='200' stroke='white' strokeWidth='1' />
					<circle cx='50' cy='350' r='300' stroke='white' strokeWidth='0.5' />
				</svg>
			</div>

			{/* Content */}
			<div
				ref={contentRef}
				className='relative z-10 flex flex-col items-center text-center px-6 max-w-4xl mx-auto pt-24 pb-12 '
				style={{ opacity: 0 }}>
				{/* Tagline */}
				<div ref={taglineRef} className='flex items-center gap-3 mb-8'>
					<div className='h-px w-8 opacity-50' style={{ background: "var(--gold)" }} />
					<span
						className='text-xs tracking-[0.35em] uppercase'
						style={{
							color: "var(--gold-light)",
							fontFamily: "var(--font-body)",
						}}>
						Cebu Pastoral &amp; Ministerial Association
					</span>
					<div className='h-px w-8 opacity-50' style={{ background: "var(--gold)" }} />
				</div>

				{/* Main heading */}
				<h1
					ref={titleRef}
					style={{
						fontFamily: "var(--font-display)",
						fontWeight: 600,
						fontSize: "clamp(3.5rem, 10vw, 7rem)",
						lineHeight: 0.95,
						color: "white",
						letterSpacing: "-0.02em",
					}}
					className='mb-6'>
					Pastors&apos;
					<br />
					<em
						style={{
							color: "var(--gold-light)",
							fontStyle: "italic",
							fontWeight: 400,
						}}>
						Summit
					</em>
					<span
						style={{
							color: "rgba(255,255,255,0.35)",
							fontSize: "0.5em",
							fontWeight: 300,
							display: "block",
							letterSpacing: "0.15em",
							fontStyle: "normal",
							marginTop: "0.3em",
						}}>
						2026
					</span>
				</h1>

				{/* Gold divider */}
				<div ref={dividerRef} className='flex items-center gap-3 mb-6'>
					<div className='h-px w-16' style={{ background: "linear-gradient(to right, transparent, var(--gold))" }} />
					<div className='w-1 h-1 rounded-full' style={{ background: "var(--gold)" }} />
					<div className='h-px w-16' style={{ background: "linear-gradient(to left, transparent, var(--gold))" }} />
				</div>

				{/* Subtitle */}
				<p
					ref={subtitleRef}
					className='text-base mb-6 max-w-xl'
					style={{
						color: "rgba(255,255,255,0.65)",
						fontFamily: "var(--font-body)",
						lineHeight: 1.7,
						fontWeight: 300,
					}}>
					A gathering of pastors and ministry leaders — in fellowship, purpose, and unity.
					<br />
					<span style={{ color: "rgba(255,255,255,0.45)", fontSize: "0.9em" }}>Bishop Noel Centino</span>
				</p>

				{/* Meta info */}
				<div ref={metaRef} className='mb-6 w-full'>
					{/* Mobile: stacked icon + text, no pills */}
					<div className='flex sm:hidden items-start justify-center gap-5'>
						{[
							{ icon: <CalendarDays size={18} />, label: "April 17, 2026", sub: "Friday" },
							{ icon: <Clock size={18} />, label: "10:00 AM – 2:00 PM", sub: "Program" },
							{ icon: <MapPin size={18} />, label: "Nissi Academy", sub: "Lapu-Lapu City" },
						].map((item, i, arr) => (
							<div key={item.label} className='flex items-start gap-5'>
								<div className='flex flex-col items-center gap-1.5'>
									<span style={{ color: "var(--gold-light)" }}>{item.icon}</span>
									<span
										className='text-xs font-medium text-center leading-tight'
										style={{ color: "white", fontFamily: "var(--font-body)" }}>
										{item.label}
									</span>
									<span className='text-[10px] text-center' style={{ color: "rgba(255,255,255,0.45)", fontFamily: "var(--font-body)" }}>
										{item.sub}
									</span>
								</div>
								{i < arr.length - 1 && <div className='w-px self-stretch mt-1' style={{ background: "rgba(201,168,76,0.2)" }} />}
							</div>
						))}
					</div>

					{/* Desktop: pills */}
					<div className='hidden sm:flex flex-wrap justify-center gap-3'>
						{[
							{ icon: <CalendarDays className='text-white/70' size={14} />, label: "April 17, 2026", sub: "Friday" },
							{ icon: <Clock className='text-white/70' size={14} />, label: "10:00 AM – 2:00 PM", sub: "Program" },
							{ icon: <MapPin className='text-white/70' size={14} />, label: "Lapu-Lapu City, Cebu", sub: "Nissi Academy" },
						].map((item) => (
							<div
								key={item.label}
								className='flex items-center gap-2.5 rounded-full px-4 py-2.5'
								style={{
									background: "rgba(255,255,255,0.08)",
									border: "1px solid rgba(255,255,255,0.15)",
									backdropFilter: "blur(8px)",
								}}>
								<span className='flex shrink-0'>{item.icon}</span>
								<div className='text-left'>
									<div className='text-sm font-medium leading-none' style={{ color: "white", fontFamily: "var(--font-body)" }}>
										{item.label}
									</div>
									<div className='text-xs mt-0.5' style={{ color: "rgba(255,255,255,0.45)", fontFamily: "var(--font-body)" }}>
										{item.sub}
									</div>
								</div>
							</div>
						))}
					</div>
				</div>

				{/* CTAs */}
				<div ref={ctaRef} className='flex justify-center flex-wrap gap-4'>
					<a
						href='#cta'
						onClick={(e) => {
							e.preventDefault();
							document.querySelector("#cta")?.scrollIntoView({ behavior: "smooth" });
						}}
						className='group relative inline-flex items-center gap-2.5 rounded-full px-8 py-4 text-sm font-medium overflow-hidden transition-transform duration-200 hover:scale-[1.02] active:scale-[0.98]'
						style={{
							background: "var(--gold)",
							color: "var(--royal-blue-deep)",
							fontFamily: "var(--font-body)",
							fontWeight: 600,
							letterSpacing: "0.03em",
							boxShadow: "0 8px 32px rgba(201,168,76,0.35)",
						}}>
						<span>Join the Gathering</span>
						<svg width='16' height='16' viewBox='0 0 16 16' fill='none' aria-hidden='true'>
							<path d='M3 8h10M8 3l5 5-5 5' stroke='currentColor' strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round' />
						</svg>
						<span
							className='absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300'
							style={{ background: "white" }}
						/>
					</a>

					<a
						href='#about'
						onClick={(e) => {
							e.preventDefault();
							document.querySelector("#about")?.scrollIntoView({ behavior: "smooth" });
						}}
						className='inline-flex items-center gap-2 rounded-full px-8 py-4 text-sm transition-all duration-300 hover:bg-white/20'
						style={{
							border: "1px solid rgba(255,255,255,0.4)",
							background: "rgba(255,255,255,0.12)",
							color: "white",
							fontFamily: "var(--font-body)",
							fontWeight: 500,
							backdropFilter: "blur(8px)",
						}}>
						Learn More
					</a>
				</div>

				{/* Scroll hint */}
				<div ref={scrollHintRef} className='mt-10 flex flex-col items-center gap-2'>
					<span
						className='text-xs tracking-[0.2em] uppercase'
						style={{ color: "rgba(255,255,255,0.4)", fontFamily: "var(--font-body)" }}>
						Scroll
					</span>
					<div className='w-px h-10 overflow-hidden' style={{ background: "rgba(255,255,255,0.15)" }}>
						<div
							className='w-full h-1/2'
							style={{
								background: "var(--gold)",
								animation: "scrollDrop 1.6s ease-in-out infinite",
							}}
						/>
					</div>
				</div>
			</div>
		</section>
	);
}
