export default function Footer() {
	const currentYear = new Date().getFullYear();

	return (
		<footer
			className='py-12'
			style={{
				background: "var(--royal-blue-deep)",
				borderTop: "1px solid rgba(255,255,255,0.06)",
			}}>
			<div className='max-w-5xl mx-auto px-6'>
				<div className='flex flex-col md:flex-row items-center justify-between gap-6'>
					{/* Left: branding */}
					<div className='text-center md:text-left'>
						<div
							className='text-xs tracking-[0.25em] uppercase mb-1'
							style={{ color: "var(--gold-light)", fontFamily: "var(--font-body)", opacity: 0.6 }}>
							CPMA &mdash; Cebu Pastoral &amp; Ministerial Association
						</div>
						<div
							style={{
								fontFamily: "var(--font-display)",
								fontSize: "1.1rem",
								fontWeight: 500,
								color: "rgba(255,255,255,0.6)",
							}}>
							Pastors&apos; Summit <span style={{ color: "var(--gold)", opacity: 0.8 }}>2026</span>
						</div>
					</div>

					{/* Center: ornament */}
					<div className='flex items-center gap-3 opacity-30'>
						<div className='h-px w-10' style={{ background: "var(--gold)" }} />
						<div className='w-1 h-1 rounded-full' style={{ background: "var(--gold)" }} />
						<div className='h-px w-10' style={{ background: "var(--gold)" }} />
					</div>

					{/* Right: meta */}
					<div className='text-center md:text-right'>
						<p className='text-xs' style={{ color: "rgba(255,255,255,0.3)", fontFamily: "var(--font-body)" }}>
							April 17, 2026 &middot; Lapu-Lapu City, Cebu
						</p>
						<p className='text-xs mt-0.5' style={{ color: "rgba(255,255,255,0.2)", fontFamily: "var(--font-body)" }}>
							Nissi Academy International &middot; Christ Faith Fellowship
						</p>
					</div>
				</div>

				{/* Bottom bar */}
				<div className='mt-8 pt-6 text-center' style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
					<p className='text-xs' style={{ color: "rgba(255,255,255,0.2)", fontFamily: "var(--font-body)" }}>
						&copy; {currentYear} Cebu Pastoral &amp; Ministerial Association. All rights reserved.
					</p>
				</div>
			</div>
		</footer>
	);
}
