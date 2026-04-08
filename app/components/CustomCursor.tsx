"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function CustomCursor() {
	const dotRef = useRef<HTMLDivElement>(null);
	const ringRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const dot = dotRef.current;
		const ring = ringRef.current;
		if (!dot || !ring) return;

		// Only show custom cursor on non-touch devices
		if (window.matchMedia("(pointer: coarse)").matches) {
			dot.style.display = "none";
			ring.style.display = "none";
			return;
		}

		gsap.set([dot, ring], { xPercent: -50, yPercent: -50 });

		const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
		const mouse = { x: pos.x, y: pos.y };
		const xSet = gsap.quickSetter(dot, "x", "px");
		const ySet = gsap.quickSetter(dot, "y", "px");
		const xSetRing = gsap.quickSetter(ring, "x", "px");
		const ySetRing = gsap.quickSetter(ring, "y", "px");

		const onMove = (e: MouseEvent) => {
			mouse.x = e.clientX;
			mouse.y = e.clientY;
		};

		window.addEventListener("mousemove", onMove);

		// Ticker for smooth lag on ring
		const ticker = gsap.ticker.add(() => {
			const dt = 1 - Math.pow(1 - 0.13, gsap.ticker.deltaRatio());
			pos.x += (mouse.x - pos.x) * dt;
			pos.y += (mouse.y - pos.y) * dt;
			xSet(mouse.x);
			ySet(mouse.y);
			xSetRing(pos.x);
			ySetRing(pos.y);
		});

		// Scale effect on links/buttons
		const onEnter = () => gsap.to(ring, { scale: 2.2, opacity: 0.3, duration: 0.3, ease: "power2.out" });
		const onLeave = () => gsap.to(ring, { scale: 1, opacity: 0.5, duration: 0.3, ease: "power2.out" });

		const interactables = document.querySelectorAll("a, button, [role='button']");
		interactables.forEach((el) => {
			el.addEventListener("mouseenter", onEnter);
			el.addEventListener("mouseleave", onLeave);
		});

		return () => {
			window.removeEventListener("mousemove", onMove);
			gsap.ticker.remove(ticker);
			interactables.forEach((el) => {
				el.removeEventListener("mouseenter", onEnter);
				el.removeEventListener("mouseleave", onLeave);
			});
		};
	}, []);

	return (
		<>
			<div ref={dotRef} className='custom-cursor' />
			<div ref={ringRef} className='custom-cursor-ring' />
		</>
	);
}
