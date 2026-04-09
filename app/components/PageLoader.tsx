"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";

interface PageLoaderProps {
	onComplete: () => void;
}

export default function PageLoader({ onComplete }: PageLoaderProps) {
	const loaderRef = useRef<HTMLDivElement>(null);
	const titleRef = useRef<HTMLDivElement>(null);
	const subtitleRef = useRef<HTMLDivElement>(null);
	const ornamentRef = useRef<HTMLDivElement>(null);
	const barRef = useRef<HTMLDivElement>(null);
	const overlayRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const loader = loaderRef.current;
		const title = titleRef.current;
		const subtitle = subtitleRef.current;
		const ornament = ornamentRef.current;
		const bar = barRef.current;
		const overlay = overlayRef.current;

		if (!loader || !title || !subtitle || !ornament || !bar || !overlay) return;

		document.body.classList.add("loading");

		// Split chars in title for stagger
		const chars = title.querySelectorAll(".char");

		const tl = gsap.timeline({
			onComplete: () => {
				document.body.classList.remove("loading");
				onComplete();
			},
		});

		// Set initial states
		gsap.set(chars, { opacity: 0, y: 30 });
		gsap.set([subtitle, ornament], { opacity: 0, y: 20 });
		gsap.set(bar, { scaleX: 0, transformOrigin: "left center" });

		tl
			.to(chars, {
				opacity: 1,
				y: 0,
				duration: 0.7,
				stagger: 0.04,
				ease: "power3.out",
				delay: 0.3,
			})
			.to(ornament, { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }, "-=0.3")
			.to(subtitle, { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }, "-=0.4")
			.to(bar, { scaleX: 1, duration: 0.9, ease: "power3.inOut" }, "-=0.2")
			.to([loader, overlay], {
				yPercent: -100,
				duration: 0.9,
				ease: "power3.inOut",
				delay: 0.3,
			});

		return () => {
			tl.kill();
			document.body.classList.remove("loading");
		};
	}, [onComplete]);

	const titleChars = "Pastors' Summit".split("").map((char, i) => (
		<span key={i} className='char inline-block' style={{ whiteSpace: char === " " ? "pre" : "normal" }}>
			{char}
		</span>
	));

	return (
		<>
			{/* Fade overlay that sits on top of content */}
			<div
				ref={overlayRef}
				className='fixed inset-0 z-[9998] pointer-events-none'
				style={{ background: "var(--royal-blue-deep)" }}
			/>
			{/* Main loader panel */}
			<div
				ref={loaderRef}
				className='fixed inset-0 z-[9999] flex flex-col items-center justify-center'
				style={{ background: "var(--ivory)" }}>
				{/* Subtle mesh */}
				<div
					className='absolute inset-0 pointer-events-none'
					style={{
						background:
							"radial-gradient(ellipse 70% 60% at 30% 40%, rgba(201,168,76,0.12) 0%, transparent 60%), radial-gradient(ellipse 50% 50% at 70% 60%, rgba(27,58,107,0.05) 0%, transparent 55%)",
					}}
				/>

				<div className='relative flex flex-col items-center gap-5 px-8 text-center'>
					{/* Year pill */}
					<div
						className='rounded-full border px-4 py-1 text-xs tracking-[0.3em] uppercase mb-2'
						style={{
							borderColor: "rgba(201,168,76,0.6)",
							color: "var(--gold-warm)",
							fontFamily: "var(--font-body)",
						}}>
						2026
					</div>

					{/* Main title */}
					<div
						ref={titleRef}
						className='overflow-visible'
						style={{
							fontFamily: "var(--font-display)",
							fontSize: "clamp(2.8rem, 8vw, 5.5rem)",
							fontWeight: 600,
							lineHeight: 1,
							color: "var(--royal-blue-deep)",
							letterSpacing: "-0.01em",
						}}>
						{titleChars}
					</div>

					{/* Ornament */}
					<div ref={ornamentRef} className='flex items-center gap-4 my-1'>
						<div className='h-px w-12' style={{ background: "var(--gold)", opacity: 0.7 }} />
						<div className='w-1.5 h-1.5 rounded-full' style={{ background: "var(--gold)" }} />
						<div className='h-px w-12' style={{ background: "var(--gold)", opacity: 0.7 }} />
					</div>

					{/* Subtitle */}
					<p
						ref={subtitleRef}
						className='text-sm tracking-[0.25em] uppercase'
						style={{
							color: "var(--royal-blue)",
							opacity: 0.7,
							fontFamily: "var(--font-body)",
						}}>
						Cebu Pastoral &amp; Ministerial Association
					</p>
				</div>

				{/* Progress bar */}
				<div
					ref={barRef}
					className='absolute bottom-0 left-0 right-0 h-[2px]'
					style={{ background: "var(--gold)", transformOrigin: "left center" }}
				/>
			</div>
		</>
	);
}
