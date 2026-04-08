interface SectionDividerProps {
	variant?: "gold" | "light" | "dark";
}

export default function SectionDivider({ variant = "gold" }: SectionDividerProps) {
	const color = variant === "gold" ? "var(--gold)" : variant === "light" ? "rgba(255,255,255,0.12)" : "var(--border)";

	return (
		<div className='flex items-center justify-center py-2 px-6 max-w-5xl mx-auto w-full'>
			<div className='flex items-center gap-4 w-full max-w-xs'>
				<div className='flex-1 h-px' style={{ background: `linear-gradient(to right, transparent, ${color})` }} />
				{/* Diamond ornament */}
				<svg width='8' height='8' viewBox='0 0 8 8' fill='none' aria-hidden='true'>
					<rect x='1' y='1' width='6' height='6' transform='rotate(45 4 4)' fill={color} opacity='0.8' />
				</svg>
				<div className='flex-1 h-px' style={{ background: `linear-gradient(to left, transparent, ${color})` }} />
			</div>
		</div>
	);
}
