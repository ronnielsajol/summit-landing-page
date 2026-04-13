"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const schedule = [
	{
		time: "9:00 AM",
		period: "Pre-Program",
		title: "Registration & Welcome",
		description: "Arrival and registration of participants. Delegates are welcomed and seated.",
		highlight: false,
	},
	{
		time: "09:00 AM",
		period: "Opening",
		title: "Program Proper Begins",
		description: "Official opening ceremonies, worship, and opening remarks by Bishop Noel Centino and CPMA leadership.",
		highlight: false,
	},
	{
		time: "11:30 AM",
		period: "Program",
		title: "Mid-Program Break",
		description: "Short intermission for reflection and fellowship among attending pastors and leaders.",
		highlight: false,
	},
	{
		time: "12:00 PM",
		period: "Lunch",
		title: "Lunch Break",
		description: "Packed lunch provided. A time for informal fellowship and meaningful conversations.",
		highlight: false,
		badge: "Packed Lunch",
	},
	{
		time: "1:00 PM",
		period: "Keynote",
		title: "Sen. Alan Peter S. Cayetano Address",
		description: "The guest of honor delivers the keynote message — a defining moment of the summit.",
		highlight: true,
		badge: "Keynote",
	},
	{
		time: "03:00 PM",
		period: "Closing",
		title: "Fellowship & Photo Opportunity",
		description: "Per-ministry group photos and open fellowship time. A fitting celebration of unity and purpose.",
		highlight: false,
	},
];

export default function ProgramSection() {
	const sectionRef = useRef<HTMLElement>(null);
	const headingGroupRef = useRef<HTMLDivElement>(null);
	const timelineRef = useRef<HTMLDivElement>(null);

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

				// Animate each timeline item as it enters view
				const items = timelineRef.current?.querySelectorAll("[data-timeline-item]");
				items?.forEach((item) => {
					gsap.from(item, {
						opacity: 0,
						x: -30,
						duration: 0.7,
						ease: "power3.out",
						scrollTrigger: {
							trigger: item,
							start: "top 82%",
						},
					});
				});

				// Animate the timeline vertical line
				const line = timelineRef.current?.querySelector("[data-timeline-line]");
				if (line) {
					gsap.from(line, {
						scaleY: 0,
						transformOrigin: "top center",
						duration: 1.5,
						ease: "power3.inOut",
						scrollTrigger: {
							trigger: timelineRef.current,
							start: "top 70%",
							end: "bottom 80%",
							scrub: 0.5,
						},
					});
				}
			});
		}, sectionRef);
		return () => ctx.revert();
	}, []);

	return (
		<section ref={sectionRef} id='program' className='py-28 md:py-36' style={{ background: "var(--off-white)" }}>
			<div className='max-w-4xl mx-auto px-6'>
				{/* Heading */}
				<div ref={headingGroupRef} className='mb-16 text-center'>
					<div className='flex items-center justify-center gap-4 mb-6'>
						<div className='h-px w-10' style={{ background: "var(--gold)" }} />
						<span
							className='text-xs tracking-[0.3em] uppercase'
							style={{ color: "var(--gold-warm)", fontFamily: "var(--font-body)" }}>
							Schedule
						</span>
						<div className='h-px w-10' style={{ background: "var(--gold)" }} />
					</div>
					<h2
						style={{
							fontFamily: "var(--font-display)",
							fontSize: "clamp(2.4rem, 5vw, 3.6rem)",
							fontWeight: 600,
							lineHeight: 1.1,
							color: "var(--royal-blue-deep)",
							letterSpacing: "-0.02em",
						}}>
						Program Flow
					</h2>
					<p
						className='mt-4 max-w-xl mx-auto'
						style={{
							fontFamily: "var(--font-body)",
							color: "var(--muted)",
							lineHeight: 1.7,
							fontSize: "1rem",
						}}>
						April 17, 2026 &mdash; Nissi Academy International
					</p>
				</div>

				{/* Timeline */}
				<div ref={timelineRef} className='relative'>
					{/* Vertical connecting line */}
					<div
						data-timeline-line
						className='absolute left-9 top-8 bottom-8 w-px md:left-1/2'
						style={{
							background: "linear-gradient(to bottom, transparent, var(--gold) 8%, var(--gold) 92%, transparent)",
							opacity: 0.4,
						}}
					/>

					<div className='space-y-8'>
						{schedule.map((item, i) => {
							const isRight = i % 2 === 1;
							return (
								<div
									key={i}
									data-timeline-item
									className='relative flex items-start gap-6 md:grid md:gap-0'
									style={{
										gridTemplateColumns: "1fr 5rem 1fr",
										alignItems: "start",
									}}>
									{/* Desktop: Left content (even items) */}
									<div className={`hidden md:flex justify-end ${isRight ? "" : "flex-col items-end text-right pr-8"}`}>
										{!isRight && <TimelineCard item={item} />}
									</div>

									{/* Center dot */}
									<div className='relative shrink-0 flex justify-center pt-1 z-10 md:flex'>
										<div
											className='w-4.5 h-4.5 rounded-full border-2 shrink-0'
											style={{
												background: item.highlight ? "var(--gold)" : "white",
												borderColor: item.highlight ? "var(--gold)" : "var(--border)",
												boxShadow: item.highlight ? "0 0 0 4px rgba(201,168,76,0.2)" : "0 0 0 4px rgba(255,255,255,0.8)",
											}}
										/>
									</div>

									{/* Mobile: always right; Desktop: Right content (odd items) */}
									<div className={`flex-1 md:pl-8 ${isRight ? "md:flex md:flex-col md:items-start" : "md:invisible"}`}>
										<div className='md:hidden'>
											<TimelineCard item={item} />
										</div>
										{isRight && (
											<div className='hidden md:block'>
												<TimelineCard item={item} />
											</div>
										)}
									</div>
								</div>
							);
						})}
					</div>
				</div>
			</div>
		</section>
	);
}

function TimelineCard({ item }: { item: (typeof schedule)[number] }) {
	return (
		<div
			className={`rounded-xl p-5 transition-all duration-300 hover:-translate-y-0.5 ${item.highlight ? "" : ""}`}
			style={{
				background: item.highlight ? "linear-gradient(135deg, var(--royal-blue-deep) 0%, var(--royal-blue) 100%)" : "white",
				border: item.highlight ? "1px solid var(--gold)" : "1px solid var(--border)",
				boxShadow: item.highlight ? "0 8px 32px rgba(27,58,107,0.2)" : "0 2px 12px rgba(0,0,0,0.04)",
			}}>
			<div className='flex items-center gap-2 mb-2'>
				<span
					className='text-xs font-semibold tracking-wide'
					style={{
						color: item.highlight ? "var(--gold-light)" : "var(--gold-warm)",
						fontFamily: "var(--font-body)",
					}}>
					{item.time}
				</span>
				{item.badge && (
					<span
						className='text-xs px-2 py-0.5 rounded-full'
						style={{
							background: item.highlight ? "rgba(201,168,76,0.2)" : "var(--royal-blue-mist)",
							color: item.highlight ? "var(--gold-light)" : "var(--royal-blue)",
							fontFamily: "var(--font-body)",
						}}>
						{item.badge}
					</span>
				)}
			</div>
			<h3
				className='mb-1.5'
				style={{
					fontFamily: "var(--font-display)",
					fontSize: "1.125rem",
					fontWeight: 600,
					color: item.highlight ? "white" : "var(--royal-blue-deep)",
					lineHeight: 1.3,
				}}>
				{item.title}
			</h3>
			<p
				className='text-sm'
				style={{
					color: item.highlight ? "rgba(255,255,255,0.6)" : "var(--muted)",
					fontFamily: "var(--font-body)",
					lineHeight: 1.6,
				}}>
				{item.description}
			</p>
		</div>
	);
}
