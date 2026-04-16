"use client";

import { Suspense, useCallback, useEffect, useRef } from "react";
import BarcodeScannerComponent from "react-qr-barcode-scanner";
import { Loader2, QrCode } from "lucide-react";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { useScanQrCheckIn } from "@/hooks/useEventCheckInMutation";

const SCAN_COOLDOWN_MS = 2400;

export default function PublicQrScanPage() {
	return (
		<Suspense fallback={<ScanPageFallback />}>
			<ScanPageContent />
		</Suspense>
	);
}

function ScanPageContent() {
	const lastScanRef = useRef<number>(0);
	const lastTokenRef = useRef<string>("");
	const { mutate, isPending } = useScanQrCheckIn();

	useEffect(() => {
		lastScanRef.current = 0;
		lastTokenRef.current = "";
	}, []);

	useEffect(() => {
		document.title = `Scan Event Pastrol Summit 2026`;
	}, []);

	const handleScan = useCallback(
		(_error: unknown, result: { getText(): string } | null | undefined) => {
			if (!result) return;

			const token = result.getText().trim();
			if (!token) return;

			const now = Date.now();
			if (now - lastScanRef.current < SCAN_COOLDOWN_MS) return;
			if (isPending) return;
			if (lastTokenRef.current === token) return;

			lastScanRef.current = now;
			lastTokenRef.current = token;

			mutate(token, {
				onSuccess: (data) => {
					toast.success(`${data.user?.first_name} checked in successfully!`);
				},
				onError: (error: unknown) => {
					const message = error instanceof Error ? error.message : "An error occurred while scanning.";
					toast.error(message);
				},
			});
		},
		[isPending, mutate]
	);

	return (
		<main className='min-h-screen bg-background px-4 py-8 text-foreground sm:px-6 lg:px-8'>
			<div className='mx-auto flex w-full max-w-3xl flex-col gap-6'>
				<Card>
					<CardHeader>
						<CardTitle className='flex items-center gap-2 text-xl'>
							<QrCode className='h-5 w-5' />
							Scanner feed
						</CardTitle>
						<CardDescription>Scanning for event Pastrol Summit 2026.</CardDescription>
					</CardHeader>
					<CardContent>
						<div className='relative overflow-hidden rounded-lg border border-border bg-black aspect-square'>
							<div className='absolute inset-0 [&>section]:w-full! [&>section]:h-full! [&_video]:w-full [&_video]:h-full [&_video]:object-cover'>
								<BarcodeScannerComponent width='100%' height='100%' onUpdate={handleScan} />
							</div>
							<div className='pointer-events-none absolute inset-0 flex items-center justify-center'>
								<div className='w-52 h-52 relative'>
									<span className='absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-white/80 rounded-tl' />
									<span className='absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-white/80 rounded-tr' />
									<span className='absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-white/80 rounded-bl' />
									<span className='absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-white/80 rounded-br' />
								</div>
							</div>
							{isPending && (
								<div className='absolute inset-0 bg-black/50 flex items-center justify-center'>
									<Loader2 className='w-8 h-8 text-white animate-spin' />
								</div>
							)}
						</div>
					</CardContent>
				</Card>
			</div>
		</main>
	);
}

function ScanPageFallback() {
	return (
		<main className='min-h-screen bg-background px-4 py-8 text-foreground sm:px-6 lg:px-8'>
			<div className='mx-auto flex w-full max-w-3xl flex-col gap-6'>
				<Card>
					<CardHeader>
						<CardTitle className='text-2xl'>Public QR Scanner</CardTitle>
						<CardDescription>Loading scanner…</CardDescription>
					</CardHeader>
					<CardContent>
						<div className='flex h-11 items-center text-sm text-muted-foreground'>Preparing page…</div>
					</CardContent>
				</Card>
			</div>
		</main>
	);
}
