"use client";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

const navLinks = [
	{ label: "About", href: "#about" },
	{ label: "Details", href: "#details" },
	{ label: "Program", href: "#program" },
	{ label: "Speaker", href: "#speaker" },
	{ label: "Venue", href: "#venue" },
	{ label: "Contact", href: "#contact" },
];

interface NavigationProps {
	loaded: boolean;
}

export default function Navigation({ loaded }: NavigationProps) {
	const navRef = useRef<HTMLElement>(null);
	const [scrolled, setScrolled] = useState(false);
	const [menuOpen, setMenuOpen] = useState(false);
	const mobileMenuRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const onScroll = () => setScrolled(window.scrollY > 60);
		window.addEventListener("scroll", onScroll, { passive: true });
		return () => window.removeEventListener("scroll", onScroll);
	}, []);

	useEffect(() => {
		if (!loaded) return;
		gsap.set(navRef.current, { opacity: 1 });
		const nav = navRef.current;
		if (!nav) return;
		gsap.from(nav, { y: -100, opacity: 0, duration: 0.8, ease: "power2.in" });
	}, [loaded]);

	useEffect(() => {
		const menu = mobileMenuRef.current;
		if (!menu) return;
		if (menuOpen) {
			gsap.fromTo(menu, { opacity: 0, y: -12 }, { opacity: 1, y: 0, duration: 0.35, ease: "power2.out" });
		} else {
			gsap.to(menu, { opacity: 0, y: -8, duration: 0.25, ease: "power2.in" });
		}
	}, [menuOpen]);

	const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
		e.preventDefault();
		setMenuOpen(false);
		const target = document.querySelector(href);
		if (target) {
			target.scrollIntoView({ behavior: "smooth", block: "start" });
		}
	};

	return (
		<nav
			ref={navRef}
			className='fixed top-0 left-0 right-0 z-50 transition-all duration-500'
			style={{
				opacity: 0,
				background: scrolled ? "rgba(255,255,255,0.92)" : "transparent",
				backdropFilter: scrolled ? "blur(12px)" : "none",
				borderBottom: scrolled ? "1px solid var(--border)" : "1px solid transparent",
				boxShadow: scrolled ? "0 2px 20px rgba(27,58,107,0.08)" : "none",
			}}>
			<div className='max-w-6xl mx-auto px-6 py-4 flex items-center justify-between'>
				{/* Logo / wordmark */}
				<a
					href='#hero'
					onClick={(e) => handleNavClick(e, "#hero")}
					className='flex flex-col leading-none transition-opacity hover:opacity-70'>
					<span
						className='block text-xs tracking-[0.25em] uppercase'
						style={{
							color: scrolled ? "var(--gold-warm)" : "rgba(255,255,255,0.7)",
							fontFamily: "var(--font-body)",
						}}>
						CPMA
					</span>
					<span
						className='block'
						style={{
							fontFamily: "var(--font-display)",
							fontWeight: 600,
							fontSize: "1.1rem",
							color: scrolled ? "var(--royal-blue)" : "white",
							letterSpacing: "-0.01em",
						}}>
						Pastors&apos; Summit
						<span style={{ color: "var(--gold)" }}> 2026</span>
					</span>
				</a>

				{/* Desktop links */}
				<ul className='hidden md:flex items-center gap-8'>
					{navLinks.map((link) => (
						<li key={link.href}>
							<a
								href={link.href}
								onClick={(e) => handleNavClick(e, link.href)}
								className='text-sm tracking-wide transition-colors duration-200 hover:opacity-70 relative group'
								style={{
									color: scrolled ? "var(--slate)" : "rgba(255,255,255,0.8)",
									fontFamily: "var(--font-body)",
									fontWeight: 500,
								}}>
								{link.label}
								<span
									className='absolute -bottom-0.5 left-0 right-0 h-px scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left'
									style={{ background: "var(--gold)" }}
								/>
							</a>
						</li>
					))}
				</ul>

				{/* CTA */}
				<a
					href='#cta'
					onClick={(e) => handleNavClick(e, "#cta")}
					className='hidden md:inline-flex items-center gap-2 text-sm px-5 py-2.5 rounded-full transition-all duration-300'
					style={{
						background: scrolled ? "var(--royal-blue)" : "rgba(255,255,255,0.15)",
						border: "1px solid",
						borderColor: scrolled ? "var(--royal-blue)" : "rgba(255,255,255,0.4)",
						color: "white",
						fontFamily: "var(--font-body)",
						fontWeight: 500,
						backdropFilter: scrolled ? "none" : "blur(8px)",
					}}>
					<span>Register Now</span>
					<svg width='14' height='14' viewBox='0 0 14 14' fill='none' aria-hidden='true'>
						<path d='M2 7h10M7 2l5 5-5 5' stroke='currentColor' strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round' />
					</svg>
				</a>

				{/* Mobile hamburger */}
				<button className='md:hidden flex flex-col gap-1.5 p-2' onClick={() => setMenuOpen((p) => !p)} aria-label='Toggle menu'>
					{[0, 1, 2].map((i) => (
						<span
							key={i}
							className='block h-px w-6 transition-all duration-300'
							style={{ background: scrolled ? "var(--charcoal)" : "white" }}
						/>
					))}
				</button>
			</div>

			{/* Mobile menu */}
			<div
				ref={mobileMenuRef}
				className='md:hidden overflow-hidden'
				style={{
					display: menuOpen ? "block" : "none",
					background: "rgba(255,255,255,0.97)",
					borderTop: "1px solid var(--border)",
				}}>
				<ul className='max-w-6xl mx-auto px-6 py-4 flex flex-col gap-1'>
					{navLinks.map((link) => (
						<li key={link.href}>
							<a
								href={link.href}
								onClick={(e) => handleNavClick(e, link.href)}
								className='block py-3 text-sm border-b transition-colors hover:opacity-70'
								style={{
									color: "var(--slate)",
									fontFamily: "var(--font-body)",
									borderColor: "var(--border)",
								}}>
								{link.label}
							</a>
						</li>
					))}
					<li className='pt-3'>
						<a
							href='#cta'
							onClick={(e) => handleNavClick(e, "#cta")}
							className='inline-flex items-center gap-2 text-sm px-5 py-2.5 rounded-full'
							style={{
								background: "var(--royal-blue)",
								color: "white",
								fontFamily: "var(--font-body)",
								fontWeight: 500,
							}}>
							Register Now
						</a>
					</li>
				</ul>
			</div>
		</nav>
	);
}
