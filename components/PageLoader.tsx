"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(SplitText);

interface PageLoaderProps {
	onComplete: () => void;
}

export default function PageLoader({ onComplete }: PageLoaderProps) {
	const loaderRef = useRef<HTMLDivElement>(null);
	const titleRef = useRef<HTMLDivElement>(null);
	const barRef = useRef<HTMLDivElement>(null);
	const overlayRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const loader = loaderRef.current;
		const title = titleRef.current;
		const bar = barRef.current;
		const overlay = overlayRef.current;

		if (!loader || !title || !bar || !overlay) return;

		document.body.classList.add("loading");

		const split = new SplitText(title, { type: "chars" });

		const tl = gsap.timeline({
			onComplete: () => {
				split.revert();
				document.body.classList.remove("loading");
				onComplete();
			},
		});

		gsap.set(split.chars, { y: 150 });
		gsap.set(bar, { scaleX: 0, transformOrigin: "left center" });

		tl
			.to(split.chars, {
				y: 0,
				duration: 0.7,
				stagger: 0.1,
				ease: "power3.out",
				delay: 0.3,
			})
			.to(bar, { scaleX: 1, duration: 0.9, ease: "power3.inOut" }, "-=0.2")
			.to(split.chars, {
				y: -150,
				duration: 0.7,
				stagger: 0.1,
				ease: "power3.in",
			})
			.to([loader, overlay], {
				yPercent: -100,
				duration: 0.9,
				ease: "power3.inOut",
				delay: 0.3,
			});

		return () => {
			tl.kill();
			split.revert();
			document.body.classList.remove("loading");
		};
	}, [onComplete]);

	return (
		<>
			{/* Fade overlay that sits on top of content */}
			<div
				ref={overlayRef}
				className='fixed inset-0 z-9998 pointer-events-none'
				style={{ background: "var(--royal-blue-deep)" }}
			/>
			{/* Main loader panel */}
			<div
				ref={loaderRef}
				className='fixed inset-0 z-9999 flex flex-col items-center justify-center overflow-hidden'
				style={{ background: "var(--ivory)" }}>
				{/* Subtle mesh */}
				<div
					className='absolute inset-0 pointer-events-none'
					style={{
						background:
							"radial-gradient(ellipse 70% 60% at 30% 40%, rgba(201,168,76,0.12) 0%, transparent 60%), radial-gradient(ellipse 50% 50% at 70% 60%, rgba(27,58,107,0.05) 0%, transparent 55%)",
					}}
				/>

				{/* CPMA letters */}
				<div
					ref={titleRef}
					className='relative overflow-hidden'
					style={{
						fontFamily: "var(--font-display)",
						fontSize: "clamp(4rem, 16vw, 9rem)",
						fontWeight: 700,
						lineHeight: 1,
						color: "var(--royal-blue-deep)",
						letterSpacing: "0.15em",
					}}>
					CPMA
				</div>

				{/* Progress bar */}
				<div
					ref={barRef}
					className='absolute bottom-0 left-0 right-0 h-1'
					style={{ background: "var(--gold)", transformOrigin: "left center" }}
				/>
			</div>
		</>
	);
}
