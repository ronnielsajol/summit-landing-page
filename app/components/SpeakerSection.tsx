"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function SpeakerSection() {
	const sectionRef = useRef<HTMLElement>(null);
	const contentRef = useRef<HTMLDivElement>(null);
	const portraitRef = useRef<HTMLDivElement>(null);
	const textRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const ctx = gsap.context(() => {
			const mm = gsap.matchMedia();
			mm.add("(prefers-reduced-motion: no-preference)", () => {
				const tl = gsap.timeline({
					scrollTrigger: {
						trigger: sectionRef.current,
						start: "top 72%",
					},
					defaults: { ease: "power3.out" },
				});

				mm.add("(min-width: 768px)", () => {
					tl.from(portraitRef.current, { opacity: 0, x: -50, duration: 0.9 }).from(
						textRef.current?.children ?? [],
						{
							opacity: 0,
							x: 30,
							stagger: 0.12,
							duration: 0.7,
						},
						"-=0.5"
					);
				});

				mm.add("(max-width: 767px)", () => {
					tl.from([portraitRef.current, ...(textRef.current?.children ?? [])], {
						opacity: 0,
						y: 35,
						stagger: 0.1,
						duration: 0.7,
					});
				});
			});
		}, sectionRef);
		return () => ctx.revert();
	}, []);

	return (
		<section
			ref={sectionRef}
			id='speaker'
			className='py-28 md:py-36 relative overflow-hidden'
			style={{ background: "var(--ivory)" }}>
			{/* Decorative background shape */}
			<div
				className='absolute right-0 top-0 bottom-0 w-1/2 pointer-events-none'
				style={{
					background: "linear-gradient(to left, var(--royal-blue-mist) 0%, transparent 80%)",
					opacity: 0.5,
				}}
			/>
			<div
				className='absolute pointer-events-none'
				style={{
					right: "-80px",
					top: "50%",
					transform: "translateY(-50%)",
					width: "400px",
					height: "400px",
					borderRadius: "50%",
					background: "radial-gradient(circle, rgba(201,168,76,0.06) 0%, transparent 70%)",
				}}
			/>

			<div ref={contentRef} className='max-w-5xl mx-auto px-6 relative'>
				{/* Section label */}
				<div className='flex items-center gap-4 mb-12'>
					<div className='h-px w-10' style={{ background: "var(--gold)" }} />
					<span
						className='text-xs tracking-[0.3em] uppercase'
						style={{ color: "var(--gold-warm)", fontFamily: "var(--font-body)" }}>
						Guest of Honor
					</span>
				</div>

				<div className='grid md:grid-cols-2 gap-12 lg:gap-20 items-center'>
					{/* Portrait placeholder */}
					<div ref={portraitRef} className='relative'>
						<div
							className='relative rounded-2xl overflow-hidden aspect-3/4 max-w-sm mx-auto md:mx-0'
							style={{
								background: "linear-gradient(160deg, var(--royal-blue) 0%, var(--royal-blue-deep) 100%)",
								border: "1px solid var(--border)",
							}}>
							{/* Decorative border */}
							<div
								className='absolute inset-0 rounded-2xl'
								style={{
									border: "1px solid rgba(201,168,76,0.3)",
									margin: "8px",
								}}
							/>

							{/* Placeholder silhouette area */}
							<div className='absolute inset-0 flex flex-col items-center justify-end pb-10 px-8'>
								{/* Abstract "figure" */}
								<div className='text-center'>
									<div
										className='w-20 h-20 rounded-full mx-auto mb-4'
										style={{
											background: "rgba(201,168,76,0.25)",
											border: "2px solid rgba(201,168,76,0.4)",
										}}>
										<div className='w-full h-full flex items-center justify-center'>
											<svg width='40' height='40' viewBox='0 0 40 40' fill='none' aria-hidden='true'>
												<circle cx='20' cy='14' r='7' stroke='rgba(201,168,76,0.7)' strokeWidth='1.5' />
												<path
													d='M6 38c0-7.73 6.27-14 14-14s14 6.27 14 14'
													stroke='rgba(201,168,76,0.7)'
													strokeWidth='1.5'
													strokeLinecap='round'
												/>
											</svg>
										</div>
									</div>
									<p
										className='text-xs tracking-widest uppercase'
										style={{ color: "rgba(201,168,76,0.6)", fontFamily: "var(--font-body)" }}>
										Photo Placeholder
									</p>
								</div>
							</div>

							{/* Gold corner ornament */}
							<div
								className='absolute top-4 left-4 w-12 h-12'
								style={{
									borderTop: "2px solid rgba(201,168,76,0.5)",
									borderLeft: "2px solid rgba(201,168,76,0.5)",
									borderRadius: "4px 0 0 0",
								}}
							/>
							<div
								className='absolute bottom-4 right-4 w-12 h-12'
								style={{
									borderBottom: "2px solid rgba(201,168,76,0.5)",
									borderRight: "2px solid rgba(201,168,76,0.5)",
									borderRadius: "0 0 4px 0",
								}}
							/>
						</div>

						{/* Floating badge */}
						<div
							className='absolute -bottom-4 right-4 md:-right-4 rounded-xl shadow-xl px-5 py-3'
							style={{
								background: "white",
								border: "1px solid var(--border)",
								boxShadow: "0 8px 32px rgba(27,58,107,0.12)",
							}}>
							<div
								className='text-xs tracking-[0.2em] uppercase mb-0.5'
								style={{ color: "var(--gold-warm)", fontFamily: "var(--font-body)" }}>
								Role
							</div>
							<div
								style={{
									fontFamily: "var(--font-display)",
									fontSize: "0.95rem",
									fontWeight: 600,
									color: "var(--royal-blue-deep)",
								}}>
								Guest of Honor &amp; Speaker
							</div>
						</div>
					</div>

					{/* Text content */}
					<div ref={textRef}>
						<div
							className='text-xs tracking-[0.25em] uppercase mb-4'
							style={{ color: "var(--gold-warm)", fontFamily: "var(--font-body)" }}>
							Featured Speaker
						</div>

						<h3 className='mb-2 text-3xl font-display font-medium'>Senator Brother</h3>
						<h2
							className='mb-2'
							style={{
								fontFamily: "var(--font-display)",
								fontSize: "clamp(3rem, 6vw, 4.5rem)",
								fontWeight: 600,
								lineHeight: 1,
								color: "var(--royal-blue-deep)",
								letterSpacing: "-0.02em",
							}}>
							Alan Peter S. Cayetano
						</h2>

						<div className='flex items-center gap-3 mb-6' style={{ color: "var(--muted)" }}>
							<div className='h-px w-8' style={{ background: "var(--gold)" }} />
							<span className='text-sm' style={{ fontFamily: "var(--font-body)" }}>
								Keynote Address · 1:00 PM
							</span>
						</div>

						<p
							className='mb-6'
							style={{
								fontFamily: "var(--font-body)",
								fontSize: "1.0625rem",
								color: "var(--slate)",
								lineHeight: 1.8,
							}}>
							Sen. Alan joins the Pastors&apos; Summit 2026 as Guest of Honor and Speaker — a distinguished presence whose
							participation marks this gathering as a significant and historic occasion for pastoral leadership in Cebu.
						</p>

						<p
							className='mb-8'
							style={{
								fontFamily: "var(--font-body)",
								fontSize: "1rem",
								color: "var(--muted)",
								lineHeight: 1.8,
							}}>
							The keynote address at 1:00 PM will be a defining moment of the summit — a message delivered to over 1,000 pastors and
							ministry leaders gathered together in purpose and faith.
						</p>

						{/* Stats row */}
						<div className='flex flex-wrap gap-6 mb-8 pt-6' style={{ borderTop: "1px solid var(--border)" }}>
							{[
								{ num: "1,000+", label: "Leaders Present" },
								{ num: "1:00 PM", label: "Keynote Time" },
								{ num: "Apr 17", label: "Summit Date" },
							].map((s) => (
								<div key={s.label}>
									<div
										style={{
											fontFamily: "var(--font-display)",
											fontSize: "1.5rem",
											fontWeight: 600,
											color: "var(--royal-blue)",
										}}>
										{s.num}
									</div>
									<div className='text-xs' style={{ color: "var(--muted)", fontFamily: "var(--font-body)" }}>
										{s.label}
									</div>
								</div>
							))}
						</div>

						<a
							href='#program'
							onClick={(e) => {
								e.preventDefault();
								document.querySelector("#program")?.scrollIntoView({ behavior: "smooth" });
							}}
							className='inline-flex items-center gap-2 text-sm transition-all duration-300 hover:gap-3'
							style={{
								color: "var(--royal-blue)",
								fontFamily: "var(--font-body)",
								fontWeight: 500,
							}}>
							View Full Program
							<svg width='16' height='16' viewBox='0 0 16 16' fill='none' aria-hidden='true'>
								<path d='M3 8h10M8 3l5 5-5 5' stroke='currentColor' strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round' />
							</svg>
						</a>
					</div>
				</div>
			</div>
		</section>
	);
}
