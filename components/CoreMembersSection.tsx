"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface CoreMember {
	name: string;
	position: string;
}

const members: CoreMember[] = [
	{ name: "BP Noel S. Centino", position: "Chairman" },
	{ name: "Ptr. Paul Mongas", position: "V. Chairman" },
	{ name: "BP Edgar Bantigue", position: "Ex officio" },
	{ name: "Ptr. Diovanni Emperio", position: "Secretary" },
	{ name: "Ptr. Elias Subelario", position: "Treasurer" },
	{ name: "Ptr. Jaime Luyao", position: "Auditor" },
	{ name: "Ptr. Richard Cabaluna", position: "PIO" },
	{ name: "Ptr. Vic Noquiao", position: "PIO" },
];

export default function CoreMembersSection() {
	const sectionRef = useRef<HTMLElement>(null);
	const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
	const headingRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const ctx = gsap.context(() => {
			const mm = gsap.matchMedia();

			mm.add("(prefers-reduced-motion: no-preference)", () => {
				// Heading reveal
				gsap.from(headingRef.current?.children ?? [], {
					opacity: 0,
					y: 30,
					stagger: 0.1,
					duration: 0.8,
					ease: "power3.out",
					scrollTrigger: {
						trigger: headingRef.current,
						start: "top 80%",
					},
				});

				// Cards stagger reveal
				gsap.from(cardsRef.current, {
					opacity: 0,
					y: 60,
					rotateX: 8,
					stagger: 0.07,
					duration: 0.75,
					ease: "power3.out",
					scrollTrigger: {
						trigger: cardsRef.current[0],
						start: "top 82%",
					},
				});

				// Magnetic tilt hover for each card
				cardsRef.current.forEach((card) => {
					if (!card) return;
					const inner = card.querySelector<HTMLElement>(".card-inner");
					const shine = card.querySelector<HTMLElement>(".card-shine");

					const handleMove = (e: MouseEvent) => {
						const rect = card.getBoundingClientRect();
						const cx = rect.left + rect.width / 2;
						const cy = rect.top + rect.height / 2;
						const dx = (e.clientX - cx) / (rect.width / 2);
						const dy = (e.clientY - cy) / (rect.height / 2);

						gsap.to(inner, {
							rotateY: dx * 8,
							rotateX: -dy * 8,
							duration: 0.4,
							ease: "power2.out",
						});
						gsap.to(shine, {
							opacity: 0.06 + Math.abs(dx) * 0.06,
							x: `${dx * 30}%`,
							y: `${dy * 30}%`,
							duration: 0.4,
							ease: "power2.out",
						});
					};

					const handleEnter = () => {
						gsap.to(inner, { scale: 1.03, duration: 0.35, ease: "power2.out" });
					};

					const handleLeave = () => {
						gsap.to(inner, {
							rotateY: 0,
							rotateX: 0,
							scale: 1,
							duration: 0.55,
							ease: "elastic.out(1, 0.6)",
						});
						gsap.to(shine, { opacity: 0, duration: 0.4, ease: "power2.out" });
					};

					card.addEventListener("mousemove", handleMove);
					card.addEventListener("mouseenter", handleEnter);
					card.addEventListener("mouseleave", handleLeave);
				});
			});
		}, sectionRef);

		return () => ctx.revert();
	}, []);

	return (
		<section
			ref={sectionRef}
			id='core-members'
			className='py-28 md:py-40 relative overflow-hidden'
			style={{ background: "var(--royal-blue-deep)" }}>

			{/* ── Background — warm cathedral light ambience ── */}
			{/* Primary warm glow: top-left like a high window catching morning light */}
			<div
				className='absolute inset-0 pointer-events-none'
				style={{
					background: `
						radial-gradient(ellipse 65% 55% at 8% 10%, rgba(201,168,76,0.11) 0%, transparent 90%),
						radial-gradient(ellipse 50% 50% at 92% 90%, rgba(201,168,76,0.07) 0%, transparent 60%),
						radial-gradient(ellipse 80% 60% at 50% 50%, rgba(27,58,107,0.6) 0%, transparent 80%)
					`,
				}}
			/>
			{/* Soft vignette — deepens the edges for a reverent, focused feel */}
			<div
				className='absolute inset-0 pointer-events-none'
				style={{
					background: `radial-gradient(ellipse 100% 100% at 50% 50%, transparent 40%, rgba(5,14,35,0.55) 100%)`,
				}}
			/>

			<div className='max-w-6xl mx-auto px-6 relative'>

				{/* ── Section Header ── */}
				<div ref={headingRef} className='mb-20'>
					<div className='flex items-center gap-4 mb-5'>
						<div style={{ width: "2rem", height: "1px", background: "var(--gold)" }} />
						<span
							style={{
								fontFamily: "var(--font-body)",
								fontSize: "0.65rem",
								letterSpacing: "0.35em",
								textTransform: "uppercase",
								color: "var(--gold)",
								opacity: 0.8,
							}}>
							Leadership
						</span>
					</div>
					<h2
						style={{
							fontFamily: "var(--font-display)",
							fontSize: "clamp(2.6rem, 5.5vw, 4rem)",
							fontWeight: 600,
							color: "white",
							lineHeight: 1.05,
							letterSpacing: "-0.02em",
							marginBottom: "1.25rem",
						}}>
						CPMA Core Members
					</h2>
					<p
						style={{
							fontFamily: "var(--font-body)",
							fontSize: "1.0625rem",
							color: "rgba(255,255,255,0.45)",
							maxWidth: "36rem",
							lineHeight: 1.75,
						}}>
						Dedicated leaders steering our organization toward excellence and
						spiritual growth.
					</p>
				</div>

				{/* ── Members Grid ── */}
				<div
					style={{
						display: "grid",
						gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
						gap: "1.25rem",
					}}>
					{members.map((member, index) => (
						<div
							key={index}
							ref={(el) => { cardsRef.current[index] = el; }}
							style={{ perspective: "800px", cursor: "default" }}>

							{/* Card inner — tilt target */}
							<div
								className='card-inner'
								style={{
									position: "relative",
									transformStyle: "preserve-3d",
									borderRadius: "14px",
									overflow: "hidden",
									background:
										"linear-gradient(145deg, rgba(255,255,255,0.065) 0%, rgba(255,255,255,0.025) 100%)",
									border: "1px solid rgba(201,168,76,0.18)",
									backdropFilter: "blur(12px)",
									padding: "2rem 1.75rem 1.75rem",
									minHeight: "180px",
									display: "flex",
									flexDirection: "column",
									justifyContent: "space-between",
									boxShadow:
										"0 0 0 1px rgba(255,255,255,0.04) inset, 0 20px 60px rgba(0,0,0,0.35)",
								}}>

								{/* Shine layer */}
								<div
									className='card-shine'
									style={{
										position: "absolute",
										inset: 0,
										background:
											"radial-gradient(circle at 50% 50%, rgba(201,168,76,0.25), transparent 70%)",
										opacity: 0,
										pointerEvents: "none",
										borderRadius: "inherit",
									}}
								/>

								{/* Large index number — editorial anchor */}
								<span
									aria-hidden='true'
									style={{
										position: "absolute",
										top: "-0.15em",
										right: "1rem",
										fontFamily: "var(--font-display)",
										fontSize: "5.5rem",
										fontWeight: 700,
										lineHeight: 1,
										color: "rgba(201,168,76,0.07)",
										letterSpacing: "-0.04em",
										userSelect: "none",
										pointerEvents: "none",
									}}>
									{String(index + 1).padStart(2, "0")}
								</span>

								{/* Top: gold slash + position */}
								<div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "0.5rem" }}>
									<div
										style={{
											width: "18px",
											height: "2px",
											background: "var(--gold)",
											flexShrink: 0,
										}}
									/>
									<span
										style={{
											fontFamily: "var(--font-body)",
											fontSize: "0.6rem",
											letterSpacing: "0.28em",
											textTransform: "uppercase",
											color: "var(--gold-light)",
											opacity: 0.9,
										}}>
										{member.position}
									</span>
								</div>

								{/* Name */}
								<div style={{ flex: 1, display: "flex", alignItems: "flex-end" }}>
									<h3
										style={{
											fontFamily: "var(--font-display)",
											fontSize: "clamp(1.05rem, 2vw, 1.25rem)",
											fontWeight: 600,
											color: "rgba(255,255,255,0.92)",
											letterSpacing: "-0.01em",
											lineHeight: 1.25,
											margin: 0,
										}}>
										{member.name}
									</h3>
								</div>

								{/* Bottom rule */}
								<div
									style={{
										marginTop: "1.25rem",
										height: "1px",
										background:
											"linear-gradient(to right, rgba(201,168,76,0.5), transparent)",
									}}
								/>
							</div>
						</div>
					))}
				</div>

				{/* ── Footer ornament ── */}
				<div
					style={{
						marginTop: "5rem",
						display: "flex",
						alignItems: "center",
						gap: "1.5rem",
					}}>
					<div style={{ flex: 1, height: "1px", background: "linear-gradient(to right, transparent, rgba(201,168,76,0.3))" }} />
					<span
						style={{
							fontFamily: "var(--font-body)",
							fontSize: "0.6rem",
							letterSpacing: "0.3em",
							textTransform: "uppercase",
							color: "rgba(201,168,76,0.4)",
						}}>
						CPMA · 2026
					</span>
					<div style={{ flex: 1, height: "1px", background: "linear-gradient(to left, transparent, rgba(201,168,76,0.3))" }} />
				</div>
			</div>
		</section>
	);
}
